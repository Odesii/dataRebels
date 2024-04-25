const {
    stuxnet,
    spider,
    iloveyou,
    stormWorm,
    codeRed,
    myDoom,
    hacks
  } = require("./hack");




class CombatSystem{
    constructor(player,enemy){
        this.player=player
        this.enemy=enemy
        this.playerMove=true;
        this.enemyMove=true;
        this.status; //0 no combat /1 combat
        this.oneTurnSkill=false
    }

    combatStart(){
        this.status=1;
        return this.status
    }

    startTurn(attacker,defender,enemy){
        this.winLoss()
        if(this.status===1){
            switch(enemy){
                case 'atk':
                    attacker.attack(defender);
                    break;
                case 'def':
                    attacker.defend();
                    this.oneTurnSkill=true
                    break
            }
        }
        }


    }
    winLoss(){
        if(this.player.hp<=0){
            this.status=0
        }
        if(this.enemy.hp<=0){
            this.status=0
        }
    }


}