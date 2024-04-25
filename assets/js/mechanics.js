const {
  stuxnet,
  spider,
  iloveyou,
  stormWorm,
  codeRed,
  myDoom,
  hacks
} = require("./hack");

const stuxNet = new stuxnet("Stuxnet", 20, 10, 10, 10, "Destroy centrifuge");

console.log(stuxNet);

const spiderHack = new spider("Sprite Spider", 20, 10, 10, 10, "ransomware");

console.log(spiderHack);

const loveYou = new iloveyou("ILOVEYOU", 20, 10, 10, 10, "malware");

console.log(loveYou);

const doom = new myDoom("MyDoom", 20, 10, 10, 10, "DDoS");

console.log(doom);

const worm = new stormWorm("StormWorm", 20, 10, 10, 10, "spam");

console.log(worm);

const codered = new codeRed("Code Red", 20, 10, 10, 10, "Hacked by Chinese!");

console.log(codered);
let result;//
let credits;//
let playerAtk;//player att value
let enemyAtk;//enemy attack value
let playerHp;//plyr hp value
let enemyHp;//enemyhp value
let playerDef;//def value
let enemyDef;//def value
let compMove;//atk or def
let plyrMove;//atk or defend
//button is where start button will be/click to initialize game and bring up player input
// button.addEventListener("click", startGame);//start button

// function startGame() {}

function winMatch(result) {
  if (result === 'win') {
    credits++;//go to shop
  } //else hard restart
}

function outcome() {
  if (playerHp === 0) {
    result='lose';}
    //hard restart? click play again and reload
    if(enemyHp===0) {
        result="win";
    };
}


function enemyTurn() {
let rndmMove= Math.floor((Math.random()*4))
    if(rndmMove<= 2){
        compMove='attack'
    } else {
        compMove='defend'
    }


}

function battle(){
    if(compMove= 'attack'){
        playerHp-=enemyAtk
    }
    else if(compMove='defend'){
        enemyHp+=enemyDef
    }

    if (plyrMove='attack'){
    enemyHp-=playerAtk
    }else if(plyrMove='defend'){
        playerHp+=playerDef
    }
    return (playerHp,enemyHp )
}   




function playerTurn(){

}

module.exports={
    battle,
    enemyTurn,
    outcome,
    winMatch
}