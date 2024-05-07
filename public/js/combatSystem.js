import {
    stuxnet,
    spider,
    iloveyou,
    stormWorm,
    codeRed,
    myDoom,
    hacks
  } = from("./hack");




class CombatSystem{
    constructor(player,enemy){
        this.player=player
        this.enemy=enemy
        this.turns=0;
        this.playerMove=true;
        this.enemyMove=true;
        this.status=0; //0 no combat /1 combat
        this.oneTurnSkill=false
    }

    turn(){
        return this.turns
    }
    nextTurn(){
        this.turns++;
    return this.turns
    }

    combatStart(){
        this.status=1;
        return this.status
    }

    startTurn(attacker,defender,moveType){
        if(this.status===1){
            this.winLoss();
            switch(moveType){
                case 'atk':
                    attacker.attack(defender);
                    break;
                case 'def':
                    attacker.defend();
                    this.oneTurnSkill=true
                    break;
            }
                this.updateMove(attacker);
                this.checkEndOfRound();
        }else{
            console.log('End of Combat')
        }
        
}
    updateMove(attacker){
        if (attacker===this.player){
            this.enemyMove=false;
        }else{
            this.playerMove=false;
        }
    }

    checkEndOfRound(){
        if(!this.enemyMove && !this.playerMove){
            this.nextTurn();
            this.playerMove=true;
            this.enemyMove=true;
            if(this.oneTurnSkill){
                this.oneTurnSkillReset();
            }

        }
    }
    
    winLoss(){
        if(this.player.hp<=0 || this.enemy.hp<=0){
            this.status=0;
            console.log('End of Combat')
            }
    }

    endPlayerMove(){
        this.enemyMove=false;
        return this.enemyMove;
    }
    onEnemyTurn(){
        this.startTurn(this.enemy, this.player, 'atk');
        return this.playerMove
    }
    oneTurnSkillReset(){
        this.player.def=this.player.defBase;
        this.enemy.def=this.player.defBase;
        this.oneTurnSkill=false
    }

}