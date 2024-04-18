class hacks {
    constructor(name,hp,ap,attack,defend,moves){
        this.name=name
        this.hp=hp
        this.ap=ap
        this.attack=attack
        this.defend=defend
        this.moves=moves
    }

}

class spider extends hacks{
    constructor(name, hp, ap, attack,defend,moves){
        super(name,hp,ap,attack, defend,moves)
        
    }
    hack(){
        console.log(`${this.name} uses ${this.moves} to do ${this.attack} damage`)
    }
}

const spiderHack= new spider('Sprite Spider',20,10,10,10,'ransomware')

spiderHack.hack()
// ----------------------------------------------------------------------

class iloveyou extends hacks{
    constructor(name, hp, ap, attack,defend,moves){
        super(name,hp,ap,attack, defend,moves)
        
    }
    hack(){
        console.log(`${this.name} uses ${this.moves} to do ${this.attack} damage`)
    }
}

const loveYou= new iloveyou('ILOVEYOU',20,10,10,10,'malware')

loveYou.hack()

class myDoom extends hacks{
    constructor(name, hp, ap, attack,defend,moves){
        super(name,hp,ap,attack, defend,moves)
        
    }
    hack(){
        console.log(`${this.name} uses ${this.moves} to do ${this.attack} damage`)
    }
}

const doom= new myDoom('MyDoom',20,10,10,10,'DDoS')

doom.hack()
class stormWorm extends hacks{
    constructor(name, hp, ap, attack,defend,moves){
        super(name,hp,ap,attack, defend,moves)
        
    }
    hack(){
        console.log(`${this.name} uses ${this.moves} to do ${this.attack} damage`)
    }
}

const worm= new stormWorm('StormWorm',20,10,10,10,'spam')
worm.hack()

class codeRed extends hacks{
    constructor(name, hp, ap, attack,defend,moves){
        super(name,hp,ap,attack, defend,moves)
        
    }
    hack(){
        console.log(`${this.name} uses ${this.moves} to do ${this.attack} damage`)
    }
}

const codered= new codeRed('Code Red',20,10,10,10,'Hacked by Chinese!')
codered.hack()

class stuxnet extends hacks{
    constructor(name, hp, ap, attack,defend,moves){
        super(name,hp,ap,attack, defend,moves)
        
    }
    hack(){
        console.log(`${this.name} uses ${this.moves} to do ${this.attack} damage`)
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
    myDoom
}