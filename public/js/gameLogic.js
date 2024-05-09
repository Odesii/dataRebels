
const attackButton=document.querySelector('#attack');

const nextTurnButton=document.querySelector('#nextTurn')
//GOAL get attack to register in front end and log numbers CHECK

//GOAL 2 

// COMBAT starting ap pool once action per turn, defend takes ap and atack takes none. next turn button to submit choices and initiate battle go next turn

//TODO:
//attack needs to interact with health bars ::extras hp bars :: enemy and player
//textdisplay js to interact with defend and attack only attacks interact atm 
// optional coins
//
async function fetchCharacter(characterId) { //GETs character data based on the character ID
    const response = await fetch(`/api/character/${characterId}`);
    const characterData = await response.json();
    return characterData;
}



async function fetchEnemy(enemyId){  //GETs enemy data based on enemyID
    const response=await fetch(`/api/enemy/${enemyId}`);
    const enemyData=await response.json()
    return enemyData;
}

async function fetchGame(gameId) { //GETs game data based on the game ID
    const response = await fetch(`/api/games/${gameId}`);
    const gameData = await response.json();
    return gameData;
}
//  update character data in the database
async function updateGame(gameId, updates) { //PUT route that we use to update the game table with our dynamic values which takes in the game ID and spits out the updates to the DB
    const response=await fetch(`/api/games/${gameId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    console.log(response)
    return fetchGame(gameId); // Fetch updated data
}


async function playerAttack(gameId) {
    const game = await fetchGame(gameId); //GET game data by taking in the specific game ID
    if (game.action_taken) {
        return;
    }

    const character = await fetchCharacter(game.user_id);
    const critChance = Math.random(); // decimal number between 0 and 1
    const baseDamage = Math.round(character.attack + (character.attack * Math.random()));// character base attack + (base attack multiplied by a decimal between 0 and 1) so that theres no getting stuck
    const isCriticalHit = critChance > 0.75; //25% critical strike chance that multiplies base damage by 3
    const actualDamage = isCriticalHit ? baseDamage * 3 : baseDamage;//damage after calculating crit or the base damage calculation
    const damage = Math.max(actualDamage - game.enemy_defense, 0); // math.max gives the highest number value after the calculation, 0 is there so that the number cannot return negative
    const newEnemyHp = Math.max(game.enemy_hp - damage, 0); //enemy hp value after taking the enemy defense into account
    await updateGame(gameId, {
        enemy_hp: newEnemyHp,
        action_taken: true  
    });
    enemyTakeDamage(newEnemyHp);
    endGame(gameId);
    console.log(`enemy took ${damage} damage`)
    return {
        damage: damage,
        isCriticalHit: isCriticalHit,
        newEnemyHp: newEnemyHp
    };
}

async function enemyAttack(gameId) {
    const game = await fetchGame(gameId);
    const enemy = await fetchEnemy(game.enemy_id);
    const critChance = Math.random();
    const baseDamage = Math.round(enemy.attack + (enemy.attack * Math.random()));
    const isCriticalHit = critChance > 0.75;
    const actualDamage = isCriticalHit ? baseDamage * 3 : baseDamage;
    const damage = Math.max(actualDamage - game.enemy_defense, 0);
    const newUserHp = Math.max(game.user_hp - damage, 0);
    console.log(`Enemy attacks for ${damage} damage`)
    await updateGame(gameId, {
        user_hp: newUserHp
    });
    endGame(gameId);
    playerTakeDamage(newUserHp);
    console.log(`user took ${damage} damage`)
    return {
        damage: damage,
        isCriticalHit: isCriticalHit,
        user_hp: newUserHp
    };
}

async function playerDefend(gameId) {
    const game = await fetchGame(gameId);

    if (game.action_taken) {
        console.log("An action has already been taken this turn.");
        return;
    }

    if (game.user_ap < 2) { //AP cost for defend is 2 so if theres not enough ap you cant defend
        console.log("Not enough AP to defend.");
        return;
    }

    const newDefense = game.user_defense * 2;

    await updateGame(gameId, {
        user_defense: newDefense,
        user_ap: game.user_ap - 2,
        action_taken: true // true means action has been taken
    });

    return newDefense;
}

async function enemyDefend(gameId) {
    const game = await fetchGame(gameId);

    if (game.user_ap < 2) {
       enemyAttack(gameId);
        return;
    }

    const newDefense = game.enemy_defense * 2; //if the enemy is defending it increases their attack by 2x base value

    await updateGame(gameId, {
        enemy_defense: newDefense,
        enemy_ap: game.enemy_ap - 2
    });
console.log(`Enemy defends`)
    return newDefense;
}

nextTurnButton.addEventListener('click', async()=>{
    const gameId=2;
    await nextTurn(gameId);
});
async function nextTurn(gameId) {
    const game = await fetchGame(gameId);
    const enemyRandom=Math.floor(Math.random()*2); //50/50 chance of the enemy attacking or defending
   await resetEnemyDefend(gameId); //resets the enemy defense after the users turn
    if(enemyRandom===0){
        await enemyAttack(gameId); //the random gives a number thats either 0 or 1 so if its 0 the enemy will attack
    }else{
       await enemyDefend(gameId); //resets the enemy defense
    }
   await resetUserDefend(gameId); //resets the users defense after the enemy attacks

    await updateGame(gameId, {
        action_taken: false, // reset the game boolean
        turn: game.turn + 1,
    });

    console.log("Next Turn");
    return game.turn + 1; //to be logged or not
}

async function resetUserDefend(gameId){
    const game= await fetchGame(gameId);

    const character = await fetchCharacter(game.user_id);
    await updateGame(gameId,{
        user_defense:character.defense //resets the character defense value to the base value on the characters table
    });
    return console.log(`user defense reset`)
}

async function resetEnemyDefend(gameId){
    const game= await fetchGame(gameId);

    const enemy = await fetchEnemy(game.enemy_id);
    await updateGame(gameId,{
        enemy_defense:enemy.defense
    });
    return console.log(`enemy defense reset`)
}

attackButton.addEventListener('click', async()=>{
    const gameId=2;//coded in for testing purposes******
    await playerAttack(gameId);

});

const defendButton=document.querySelector('#defend');

defendButton.addEventListener('click', async()=>{
    const gameId=2;
    await playerDefend(gameId);

});

async function endGame(gameId){
const game=fetchGame(gameId)
if(game.user_hp===0){ 
    return;
}
if(game.enemy_hp===0){ 
    return;
}
}

function enemyTakeDamage(enemyHp) {//damage-health

  const healthBar = document.getElementById("e-health-bar");
    if (enemyHp < 0) {
      enemyHp = 0;
    }
  
      healthBar.innerHTML = "";
      for (let i = 0; i < enemyHp; i++) {
        healthBar.innerHTML += "▓"; // current health point total
      }
      healthBar.innerHTML += "▒"; //  current health point position
      for (let i = 0; i < 100-enemyHp; i++) {
        healthBar.innerHTML += "░"; // lost health points
    }
  }

  function playerTakeDamage(playerHp) {//damage-health
    const healthBar = document.getElementById("health-bar");
      if (playerHp < 0) {
        playerHp = 0;
      }
    
      healthBar.innerHTML = "";
      for (let i = 0; i < playerHp; i++) {
        healthBar.innerHTML += "▓"; // current health point total
      }
      healthBar.innerHTML += "▒"; //  current health point position
      for (let i = 0; i < 100 - playerHp; i++) {
        healthBar.innerHTML += "░"; // lost health points
      }
    }