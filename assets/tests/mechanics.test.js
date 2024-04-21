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
let playerAtk=5;//player att value
let enemyAtk=5;//enemy attack value
let playerHp=30;//plyr hp value
let enemyHp=30;//enemyhp value
let playerDef=5;//def value
let enemyDef=5;//def value
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

describe('battle',()=>{
    test('If the player attacks and the computer attacks the player and enemy will have the same hp',()=>{
        
        expect(battle(compMove='attack', plyrMove="attack")).toBe(enemyHp===playerHp)
    })


})