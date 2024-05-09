let health = 20;

function enemyTakeDamage(damage) {//damage-health
  console.log(damage)
const healthBar = document.getElementById("e-health-bar");
  health -= damage;
  if (health < 0) {
    health = 0;
  }

  healthBar.innerHTML = "";
  for (let i = 0; i < health; i++) {
    healthBar.innerHTML += "▓"; // current health point total
  }
  healthBar.innerHTML += "▒"; //  current health point position
  for (let i = 0; i < 20 - health; i++) {
    healthBar.innerHTML += "░"; // lost health points
  }
}

function playerTakeDamage(damage) {//damage-health
  const healthBar = document.getElementById("health-bar");
    health -= damage;
    if (health < 0) {
      health = 0;
    }
  
    healthBar.innerHTML = "";
    for (let i = 0; i < health; i++) {
      healthBar.innerHTML += "▓"; // current health point total
    }
    healthBar.innerHTML += "▒"; //  current health point position
    for (let i = 0; i < 20 - health; i++) {
      healthBar.innerHTML += "░"; // lost health points
    }
  }

module.exports= {enemyTakeDamage}