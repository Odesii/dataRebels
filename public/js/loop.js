//start game
//player turn
//enemy turn
//next turn
//if user hp or enemy hp===0 game over
const startGame(){

}

const attackButton=document.querySelector('#attack');

attackButton.addEventListener('click', async()=>{
    const gameId=2;
    const battle=await playerAttack(gameId);
    console.log("this is",battle)
});

const defendButton=document.querySelector('#defend');

defendButton.addEventListener('click', async()=>{
    const gameId=2;
    const battle=await playerDefend(gameId);
    console.log("this is",battle)
});

//on initialize game state from ./play.js

function endGame(){

}