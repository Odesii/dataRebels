import { enemyHit, enemyDGlow } from "./render.js";
import { displayText, printLine } from "./extra/textDisplay.js";

const attackButton = document.querySelector("#attack");
const actionTaken = document.querySelector("#actionTaken");

const nextTurnButton = document.querySelector("#nextTurn");

function renderBandwith(userAp) {
  switch (userAp) {
    case 15:
      return "/imgs/UI/ap/ap15.png";
    case 14:
      return "/imgs/UI/ap/ap14.png";
    case 13:
      return "/imgs/UI/ap/ap13.png";
    case 12:
      return "/imgs/UI/ap/ap12.png";
    case 11:
      return "/imgs/UI/ap/ap11.png";
    case 10:
      return "/imgs/UI/ap/ap10.png";
    case 9:
      return "/imgs/UI/ap/ap9.png";
    case 8:
      return "/imgs/UI/ap/ap8.png";
    case 7:
      return "/imgs/UI/ap/ap7.png";
    case 6:
      return "/imgs/UI/ap/ap6.png";
    case 5:
      return "/imgs/UI/ap/ap5.png";
    case 4:
      return "/imgs/UI/ap/ap4.png";
    case 3:
      return "/imgs/UI/ap/ap3.png";
    case 2:
      return "/imgs/UI/ap/ap2.png";
    case 1:
      return "/imgs/UI/ap/ap1.png";
    case 0:
      return "/imgs/UI/ap/ap0.png";
    default:
      return "/imgs/UI/ap/ap15.png";
  }
}

// terminal combat log
async function fetchCharacter(characterId) {
  //GETs character data based on the character ID
  const response = await fetch(`/api/character/${characterId}`);
  const characterData = await response.json();
  return characterData;
}

async function fetchEnemy(enemyId) {
  //GETs enemy data based on enemyID
  const response = await fetch(`/api/enemy/${enemyId}`);
  const enemyData = await response.json();
  return enemyData;
}

async function fetchGame(gameId) {
  //GETs game data based on the game ID
  const response = await fetch(`/api/games/${gameId}`);
  const gameData = await response.json();
  return gameData;
}
//  update character data in the database
async function updateGame(gameId, updates) {
  //PUT route that we use to update the game table with our dynamic values which takes in the game ID and spits out the updates to the DB
  const response = await fetch(`/api/games/${gameId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  return fetchGame(gameId); // Fetch updated data
}

async function playerAttack(gameId) {
  const game = await fetchGame(gameId); //GET game data by taking in the specific game ID
  if (game.action_taken) {
    actionTaken.innerHTML = "";
    actionTaken.innerHTML = `An action has already been taken this turn. <span id="color1">END TURN</span>`;
    return;
  }

  const character = await fetchCharacter(game.user_id);
  const critChance = Math.random(); // decimal number between 0 and 1
  const baseDamage = Math.round(
    game.user_attack + game.user_attack * Math.random()
  ); // character base attack + (base attack multiplied by a decimal between 0 and 1) so that theres no getting stuck
  const isCriticalHit = critChance > 0.75; //25% critical strike chance that multiplies base damage by 3
  const actualDamage = isCriticalHit ? baseDamage * 3 : baseDamage; //damage after calculating crit or the base damage calculation
  const damage = Math.max(actualDamage - game.enemy_defense, 0); // math.max gives the highest number value after the calculation, 0 is there so that the number cannot return negative
  const newEnemyHp = Math.max(game.enemy_hp - damage, 0); //enemy hp value after taking the enemy defense into account

  await updateGame(gameId, {
    enemy_hp: newEnemyHp,
    action_taken: true,
  });

  const enemy = await fetchEnemy(game.enemy_id);
  const baseHp = enemy.hp;
  await enemyTakeDamage(baseHp, newEnemyHp);

  const updateHp = document.getElementById("enemy-hp");
  updateHp.innerHTML = "";
  updateHp.innerHTML = `${newEnemyHp}/${enemy.hp}`;

  await endGame(gameId);
  displayText(`#userMsg`, `Hack sent ... Target took ${damage} damage`);
  return {
    damage: damage,
    isCriticalHit: isCriticalHit,
    newEnemyHp: newEnemyHp,
  };
}

async function enemyAttack(gameId) {
  const game = await fetchGame(gameId);
  const enemy = await fetchEnemy(game.enemy_id);
  const critChance = Math.random();
  const baseDamage = Math.round(enemy.attack + enemy.attack * Math.random());
  const isCriticalHit = critChance > 0.75;
  const actualDamage = isCriticalHit ? baseDamage * 3 : baseDamage;
  const damage = Math.max(actualDamage - game.user_defense, 0);
  const newUserHp = Math.max(game.user_hp - damage, 0);
  enemyHit();
  displayText(`#enemyMsg`, `Hack received ... You took ${damage} damage`);
  await updateGame(gameId, {
    user_hp: newUserHp,
  });

  const character = await fetchCharacter(game.user_id);
  const baseHp = character.hp;
  await playerTakeDamage(baseHp, newUserHp);

  const updateHp = document.getElementById("user-hp");
  updateHp.innerHTML = "";
  updateHp.innerHTML = `${newUserHp}/${character.hp}`;

  await endGame(gameId);

  return {
    damage: damage,
    isCriticalHit: isCriticalHit,
    user_hp: newUserHp,
  };
}

async function playerDefend(gameId) {
  const game = await fetchGame(gameId);

  if (game.action_taken) {
    actionTaken.innerHTML = "";
    actionTaken.innerHTML = `An action has already been taken this turn. <span id="color1">END TURN</span>`;
    return;
  }

  if (game.user_ap < 2) {
    //AP cost for defend is 2 so if theres not enough ap you cant defend
    actionTaken.innerHTML = "";
    actionTaken.innerHTML = "NOT ENOUGH BANDWIDTH";
    return;
  }

  const newDefense = game.user_defense * 2;

  const newAp = await updateGame(gameId, {
    user_defense: newDefense,
    user_ap: game.user_ap - 2,
    action_taken: true, // true means action has been taken
  });

  const imgPath = renderBandwith(newAp.user_ap);
  console.log("PASSING AP IMG", imgPath);
  document.getElementById("bandwidth").setAttribute("src", imgPath);

  displayText(`#userMsg`, `Encryption Engaged`);

  return newDefense;
}

async function enemyDefend(gameId) {
  const game = await fetchGame(gameId);

  if (game.enemy_ap < 2) {
    await enemyAttack(gameId);
    return;
  }

  const newDefense = game.enemy_defense * 2; //if the enemy is defending it increases their attack by 2x base value
  
  await updateGame(gameId, {
      enemy_defense: newDefense,
      enemy_ap: game.enemy_ap - 2,
    });
    enemyDGlow();
  displayText(`#enemyMsg`, `Encryption Engaged`);
  return newDefense;
}
nextTurnButton.addEventListener("click", async () => {
    const gameId = document.getElementById("game-state").getAttribute("data-id");
  await nextTurn(gameId);
});

async function nextTurn(gameId) {
  const game = await fetchGame(gameId);
  const enemyRandom = Math.floor(Math.random() * 2); //50/50 chance of the enemy attacking or defending
  await resetEnemyDefend(gameId); //resets the enemy defense after the users turn
  actionTaken.innerHTML = "";
  if (enemyRandom === 0) {
    await enemyAttack(gameId); //the random gives a number thats either 0 or 1 so if its 0 the enemy will attack

  } else {
    await enemyDefend(gameId); //resets the enemy defense

  }
  await resetUserDefend(gameId); //resets the users defense after the enemy attacks

  await updateGame(gameId, {
    action_taken: false, // reset the game boolean
    turn: game.turn + 1,
  });

  const turnCount = document.getElementById("turn-counter");
  turnCount.innerHTML = "";
  turnCount.innerHTML = game.turn + 1;
  console.log("Next Turn");

  return game.turn + 1; //to be logged or not
}

async function resetUserDefend(gameId) {
  const game = await fetchGame(gameId);

  const character = await fetchCharacter(game.user_id);
  await updateGame(gameId, {
    user_defense: character.defense, //resets the character defense value to the base value on the characters table
  });
  return console.log(`user defense reset`);
}

async function resetEnemyDefend(gameId) {
  const game = await fetchGame(gameId);

  const enemy = await fetchEnemy(game.enemy_id);
  await updateGame(gameId, {
    enemy_defense: enemy.defense,
  });
  return console.log(`enemy defense reset`);
}

attackButton.addEventListener("click", async () => {
  const gameId = document.getElementById("game-state").getAttribute("data-id"); //coded in for testing purposes******
  await playerAttack(gameId);
});

const defendButton = document.querySelector("#defend");

defendButton.addEventListener("click", async () => {
  const gameId = document.getElementById("game-state").getAttribute("data-id");
  await playerDefend(gameId);
});

function enemyTakeDamage(baseHp, enemyHp) {
  //damage-health
  const healthBar = document.getElementById("e-health-bar");

  if (enemyHp / baseHp === 1) {
    return;
  }

  if (enemyHp < 0) {
    enemyHp = 0;
  }

  healthBar.innerHTML = "";

  for (let i = 0; i < Math.floor(enemyHp / (baseHp / 50)); i++) {
    healthBar.innerHTML += "▓"; // current health point total
  }

  healthBar.innerHTML += "▒"; //  current health point position

  for (let i = 0; i < Math.floor((baseHp - enemyHp) / (baseHp / 50)); i++) {
    healthBar.innerHTML += "░"; // lost health points
  }
}

function playerTakeDamage(baseHp, playerHp) {
  //damage-health
  const healthBar = document.getElementById("health-bar");

  if (playerHp / baseHp === 1) {
    return;
  }

  if (playerHp < 0) {
    playerHp = 0;
  }

  healthBar.innerHTML = "";

  for (let i = 0; i < Math.floor(playerHp / (baseHp / 50)); i++) {
    healthBar.innerHTML += "▓"; // current health point total
  }

  healthBar.innerHTML += "▒"; //  current health point position

  for (let i = 0; i < Math.floor((baseHp - playerHp) / (baseHp / 50)); i++) {
    healthBar.innerHTML += "░"; // lost health points
  }
}

async function updateLevel(enemyId) {
  console.log("update level 1");

  const response = await fetch(`/api/users/level/${enemyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    }
  });

  const gameData = await response.json();
  return gameData;
}

async function deleteGame(gameId) {
    const game = await fetchGame(gameId);
    const enemyId = game.enemy_id;
    await updateLevel(enemyId);

    const response = await fetch(`/api/games/${gameId}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    });

    const gameData = await response.json();
    return gameData;
}

async function endGame(gameId) {
  const game = await fetchGame(gameId);
  if (game.user_hp === 0) {
    document.location.replace("/gameover");
  }

  if (game.enemy_hp === 0) {
    //delete req
    alert("You Live for NOW");
    await deleteGame(gameId); //deleting the game instance if the user wins and redirect the user to the homepage to start level 2

    document.location.replace("/");
    return;
  }
}

// async function renderBandwith(gameId) {
//     const game = await fetchGame(gameId);
//     await updateGame(gameId, {
//         user_ap_img: game.user_ap
//     });

//     setInterval(function() {
//         document.getElementById("bandwidth").src = ""
//         document.getElementById("bandwidth").src = game.user_ap_img
//     }, 0)
// }

async function loadGameState() {
  const gameId = document.getElementById("game-state").getAttribute("data-id");
  const game = await fetchGame(gameId);
  const character = await fetchCharacter(game.user_id);
  const enemy = await fetchEnemy(game.enemy_id);

  await playerTakeDamage(character.hp, game.user_hp);
  await enemyTakeDamage(enemy.hp, game.enemy_hp);
  await renderBandwith(gameId);
}

loadGameState();
