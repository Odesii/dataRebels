//functions for the combat logic so we can call on it when we do the order of events

async function fetchCharacter(id){
    const response= await fetch(`/api/character/${id}`);
    return response.json();
}

async function fetchEnemy(id){
    const response=await fetch(`/api/enemy/${id}`);
    return response.json();
}

async function attack(attacker, defender){
    const crit=attacker.attack *1.5;
    const damageRange=Math.round(attacker.attack+(attacker.attack* Math.random()))
    const damage=damageRange-defender.def;
    let damageDone;
    
}

