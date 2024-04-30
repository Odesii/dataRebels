class hacks {
    constructor(name,hp,ap,atkVal,def,moves,speed,role){
        this.name=name
        this.hp=hp
        this.hpBase=this.hp
        this.ap=ap
        this.apBase=this.ap
        this.atkVal=atkVal
        this.atkVal=this.atkVal
        this.def=def
        this.defBase=this.def
        this.moves=moves
        this.speed=speed
        this.speedOrigin=this.speed
        this.role=role
        
    }
    attack(enemy){
        let damage=this.atkVal-enemy.def
        let damageDone;
        damageDone=enemy.hp-damage
        enemy.hp=damageDone;
        if (enemy.hp<=0){
            enemy.hp=0;
        }console.log(`${this.name} hacks ${enemy.name} dealing ${damage}`)
        return damage
        
} 
    defend(){
       this.def=this.def+=1
       console.log(`${this.name} increases firewall defense by ${this.def} for one turn`)
       return this.def
}
    resetStatsAfterMove(){
        this.def=this.defBase

}
    resetStats(){
        this.hp=character.hpBase
        return character.hp
    }

}

class spider extends hacks{
    constructor(name,hp,ap,atkVal,def,moves,speed,role){
        super(name,hp,ap,atkVal,def,moves,speed,role)
        
    }
    hack(){
        console.log(`${this.name} uses ${this.moves} to do ${this.atkVal} damage`)
    }
}

const spiderHack= new spider('Sprite Spider',20,10,10,10,'ransomware')

spiderHack.hack()
// ----------------------------------------------------------------------

class iloveyou extends hacks{
    constructor(name,hp,ap,atkVal,def,moves,speed,role){
        super(name,hp,ap,atkVal,def,moves,speed,role)
        
    }
    hack(){
        console.log(`${this.name} uses ${this.moves} to do ${this.atkVal} damage`)
    }
}

const loveYou= new iloveyou('ILOVEYOU',20,10,10,10,'malware')

loveYou.hack()

class myDoom extends hacks{
    constructor(name,hp,ap,atkVal,def,moves,speed,role){
        super(name,hp,ap,atkVal,def,moves,speed,role)
        
    }
    hack(){
        console.log(`${this.name} uses ${this.moves} to do ${this.atkVal} damage`)
    }
}

const doom= new myDoom('MyDoom',20,10,10,10,'DDoS')

doom.hack()
class stormWorm extends hacks{
    constructor(name,hp,ap,atkVal,def,moves,speed,role){
        super(name,hp,ap,atkVal,def,moves,speed,role)
        
    }
    hack(){
        console.log(`${this.name} uses ${this.moves} to do ${this.atkVal} damage`)
    }
}

const worm= new stormWorm('StormWorm',20,10,10,10,'spam')
worm.hack()

class codeRed extends hacks{
    constructor(name,hp,ap,atkVal,def,moves,speed,role){
        super(name,hp,ap,atkVal,def,moves,speed,role)
        
    }
    hack(){
        console.log(`${this.name} uses ${this.moves} to do ${this.atkVal} damage`)
    }
}

const codered= new codeRed('Code Red',20,10,10,10,'Hacked by Chinese!')
codered.hack()

class stuxnet extends hacks{
    constructor(name,hp,ap,atkVal,def,moves,speed,role){
        super(name,hp,ap,atkVal,def,moves,speed,role)
        
    }
    hack(){
        console.log(`${this.name} uses ${this.moves} to do ${this.atkVal} damage`)
    }
}

const stuxNet= new stuxnet('Stuxnet',20,10,10,10,'Destroy centrifuge')

stuxNet.hack()


module.exports={
    stuxnet,
    spider,
    iloveyou,
    stormWorm,
    codeRed,
    myDoom,
    hacks
}