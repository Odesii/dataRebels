//functions for the combat logic so we can call on it when we do the order of events
const attackButton=document.querySelector('#attack');
//PUT hp, ap, enemy hp enemy, ap, turn
const nextTurnButton=document.querySelector('#nextTurn')
//GOAL get attack to register in front end and log numbers

// COMBAT starting ap pool once action per turn, defend takes ap and atack takes none. next turn button to submit choices and initiate battle go next turn
async function fetchCharacter(characterId) {
    const response = await fetch(`/api/character/${characterId}`);
    const characterData = await response.json();
    return characterData;
}



async function fetchEnemy(enemyId){
    const response=await fetch(`/api/enemy/${enemyId}`);
    return response.json();
}

async function fetchGame(gameId) {
    const response = await fetch(`/api/games/${gameId}`);
    const gameData = await response.json();
    console.log('this is the fetch game',gameData)
    return gameData;
}
//  update character data in the database
async function updateGame(gameId, updates) {
    console.log('before the fetch')

    const response=await fetch(`/api/games/${gameId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    console.log('after the fetch')
    console.log(response)
    return fetchGame(gameId); // Fetch updated data
}


async function playerAttack(gameId) {
    const game = await fetchGame(gameId);
console.log('this is supposed to be game data',game)
    if (game.action_taken) {
        console.log("An action has already been taken this turn.");
        return;
    }

    const character = await fetchCharacter(game.user_id);
    const critChance = Math.random();
    const baseDamage = Math.round(character.attack + (character.attack * Math.random()));
    const isCriticalHit = critChance > 0.75;
    const actualDamage = isCriticalHit ? baseDamage * 3 : baseDamage;
    const damage = Math.max(actualDamage - game.enemy_defense, 0);
    const newEnemyHp = Math.max(game.enemy_hp - damage, 0);

    await updateGame(gameId, {
        enemy_hp: newEnemyHp,
        action_taken: true  
    });
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
console.log('this is supposed to be enemy ',game)
    if (game.action_taken) {
        console.log("An action has already been taken this turn.");
        return;
    }

    const enemy = await fetchCharacter(game.enemy_id);
    const critChance = Math.random();
    const baseDamage = Math.round(enemy.attack + (enemy.attack * Math.random()));
    const isCriticalHit = critChance > 0.75;
    const actualDamage = isCriticalHit ? baseDamage * 3 : baseDamage;
    const damage = Math.max(actualDamage - game.enemy_defense, 0);
    const newUserHp = Math.max(game.user_hp - damage, 0);

    await updateGame(gameId, {
        user_hp: newUserHp
    });
    endGame(gameId);
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

    if (game.user_ap < 2) {
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

    const newDefense = game.enemy_defense * 2;

    await updateGame(gameId, {
        enemy_defense: newDefense,
        enemy_ap: game.enemy_ap - 2
    });

    return newDefense;
}

nextTurnButton.addEventListener('click', async()=>{
    const gameId=2;
    const next=await nextTurn(gameId);
    console.log("this is",next)
});
async function nextTurn(gameId) {
    const game = await fetchGame(gameId);
    console.log("this is the next turn fx",game)
    await updateGame(gameId, {
        action_taken: false, // reset the game boolean
        turn: game.turn + 1
    });

    console.log("Next Turn");
    return game.turn + 1; //to be logged or not
}

async function resetUserDefend(gameId){
    const game=fetchGame(gameId);

    const character = await fetchCharacter(game.user_id);
    await updateGame(gameId,{
        user_defense:character.defense
    });
    return console.log(`user defense reset`)
}

async function resetEnemyDefend(gameId){
    const game=fetchGame(gameId);

    const enemy = await fetchEnemy(game.enemy_id);
    await updateGame(gameId,{
        enemy_defense:enemy.defense
    });
    return console.log(`enemy defense reset`)
}

attackButton.addEventListener('click', async()=>{
    const gameId=2;
    const battle=await playerAttack(gameId);
    console.log("this is",battle)
});

const defendButton=document.querySelector('#defend');

defendButton.addEventListener('click', async()=>{
    const gameId=2;
    const battle=await playerDefend(gameId);
    console.log("this is",battle)
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