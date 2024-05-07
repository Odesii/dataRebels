//functions for the combat logic so we can call on it when we do the order of events

import { any } from "three/examples/jsm/nodes/Nodes.js";

//PUT hp, ap, enemy hp enemy, ap, turn

//GOAL get attack to register in front end and log numbers

// COMBAT starting ap pool once action per turn, defend takes ap and atack takes none. next turn button to submit choices and initiate battle go next turn
async function fetchCharacter(characterId) {
    const response = await fetch(`/api/character/${characterId}`);
    const characterData = await response.json();
    return characterData;
}

async function fetchGameData(gameId) {
    const response = await fetch(`/api/game/${gameId}`);
    return response.json();  // Parses the JSON response into JavaScript objects.
}

async function fetchEnemy(enemyId){
    const response=await fetch(`/api/enemy/${enemyId}`);
    return response.json();
}

async function fetchGame(gameId) {
    const response = await fetch(`/api/game/${gameId}`);
    const gameData = await response.json();
    return gameData;
}
//  update character data in the database
async function updateGame(gameId, updates) {
    await fetch(`/api/game/${gameId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    return fetchGame(gameId); // Fetch updated data
}

async function playerAttack(gameId) {
    const game = await fetchGameData(gameId);

    if (game.action_taken) {
        console.log("An action has already been taken this turn.");
        return;
    }

    const character = await fetchCharacter(game.character_id);
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

    return {
        damage: damage,
        isCriticalHit: isCriticalHit,
        newEnemyHp: newEnemyHp
    };
}



async function playerDefend(gameId) {
    const game = await fetchGameData(gameId);

    if (game.action_taken) {
        console.log("An action has already been taken this turn.");
        return;
    }

    if (game.user_ap < 2) {
        console.log("Not enough AP to defend.");
        return;
    }

    const newDefense = game.character_defense * 2;

    await updateGame(gameId, {
        character_defense: newDefense,
        user_ap: game.user_ap - 2,
        action_taken: true // true means action has been taken
    });

    return newDefense;
}


async function nextTurn(gameId) {
    const game = await fetchGameData(gameId);

    const character = await fetchCharacter(game.character_id);
    const enemy = await fetchEnemy(game.enemy_id);

    await updateGame(gameId, {
        action_taken: false, // reset the game boolean
        character_defense: character.defense, // reset char def
        enemy_defense: enemy.defense, // Reset enemy def
        turn: game.turn + 1
    });

    console.log("Next Turn");
    return game.turn += 1; //to be logged or not
}

