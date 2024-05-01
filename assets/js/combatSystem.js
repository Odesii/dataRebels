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
        this.turns=0;
        this.playerMove=true;
        this.enemyMove=true;
        this.status; //0 no combat /1 combat
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
        if(attacker===this.player){
            this.enemyMove=false
        }else{
            this.playerMove=false
        }
        if(this.enemyMove===false && this.playerMove===false){
            this.nextTurn;
            this.enemyMove=true;
            this.playerMove=true;
            if(this.oneTurnSkill===true){
                this.resetStatsAfterMove()
            }
        }
        }else{
            console.log(`end of combat`)
        }
        this.winLoss();
        
}

    
    winLoss(){
        if(this.player.hp<=0){
            this.status=0;
        }
            if(this.enemy.hp<=0){
                this.status=0;
            }
    }

    endPlayerMove(){
        this.enemyMove=false;
        return this.enemyMove;
    }
    enemyMove(){
        this.startTurn(attacker, defender, enemy)
        return this.playerMove
    }
    oneTurnSkillReset(){
        this.player.def=this.player.defBase;
        this.enemy.def=this.player.defBase;
        this.oneTurnSkill=false
    }

}