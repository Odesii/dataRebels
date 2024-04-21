const {
    stuxnet,
    spider,
    iloveyou,
    stormWorm,
    codeRed,
    myDoom,
  } = require("../js/monsters.js")

  let result;//
let credits;//
let playerAtk;//player att value
let enemyAtk;//enemy attack value
let playerHp=30;//plyr hp value
let enemyHp=30;//enemyhp value
let playerDef;//def value
let enemyDef;//def value
let compMove;//atk or def
let plyrMove;//atk or defend

  const{
    battle,
    enemyTurn,
    outcome,
    winMatch
}=require('../js/mechanics.js')

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

describe('stuxNet',()=>{
    test('stuxNet should attack the enemy for 10 damage',()=>{
        
        stuxNet.battle("attack");
        expect(shape.render()).toEqual(`<polygon points="100,10 150,190 50,190" fill="green"/>`)
    })


})