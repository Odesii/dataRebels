//functions for the combat logic so we can call on it when we do the order of events

//PUT hp, ap, enemy hp enemy, ap, turn

//GOAL get attack to register in front end and log numbers

async function fetchCharacter(id){
    const response= await fetch(`/api/character/${id}`);
    return response.json();
}

async function fetchEnemy(id){
    const response=await fetch(`/api/game/${id}`);
    return response.json();
}

// Utility to update character data in the database
async function updateCharacter(id, updates) {
    await fetch(`/api/characters/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    return fetchCharacter(id); // Fetch updated data
}

async function attack(attacker, defender){
    const crit=attacker.attack * 3;
    const critChance=Math.random();
    const damageRange=Math.round(attacker.attack+(attacker.attack* Math.random()))
    const damage=damageRange-defender.def;
    let damageDone;
    if(critChance>0.75){
        damageDone=defender.hp-crit;
        if(defender.hp<=0){
            defender.hp=0;
        }return crit;
    }
    damageDone=defender.hp-damage;
    defender.hp=damageDone;
    if(defender.hp<=0){
        defender.hp=0;
    }return damage;
}

async function defend(){
    this.def=this.def*2;
    return this.def
}