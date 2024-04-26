const {
    stuxnet,
    spider,
    iloveyou,
    stormWorm,
    codeRed,
    myDoom,
    hacks
  } = require("../js/hack.js")

const enemy=new stuxnet("Stuxnet", 20, 3, 10, 10, "Destroy centrifuge");

  const{
    battle,
    enemyTurn,
    outcome,
    winMatch
}=require('../js/mechanics.js')

const stuxNet = new stuxnet("Stuxnet", 20, 3, 10, 10, "Destroy centrifuge");

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

describe('attack',()=>{
    test('If the player attacks the enemy hp goes down',()=>{
        expect(codered.attack(doom)).toBe(0)
    })


})