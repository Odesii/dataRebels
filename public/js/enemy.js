import{
    stuxnet,
    spider,
    iloveyou,
    stormWorm,
    codeRed,
    myDoom,
    hacks
} from "./hack.js"

class Enemy extends hacks{
    constructor(name,hp,ap,atkVal,def,moves,speed,role){
        super(name,hp,ap,atkVal,def,moves,speed,role)
        
    }
    hack(){
        console.log(`${this.name} uses ${this.moves} to do ${this.atkVal} damage`)
    }
}
const enemy= new Enemy('ICE',20,10,10,10,'NeuroMancer')

enemy.hack()