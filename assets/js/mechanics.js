const {stuxnet, spider,iloveyou,stormWorm,codeRed,myDoom}=require('./monsters')

const stuxNet= new stuxnet('Stuxnet',20,10,10,10,'Destroy centrifuge')

console.log(stuxNet)

const spiderHack= new spider('Sprite Spider',20,10,10,10,'ransomware')

console.log(spiderHack)

const loveYou= new iloveyou('ILOVEYOU',20,10,10,10,'malware')

console.log(loveYou)

const doom= new myDoom('MyDoom',20,10,10,10,'DDoS')

console.log(doom)

const worm= new stormWorm('StormWorm',20,10,10,10,'spam')

console.log(worm)

const codered= new codeRed('Code Red',20,10,10,10,'Hacked by Chinese!')

console.log(codered)

// let credits;
// //button is where start button will be
// button.addEventListener('click',startGame)


// function startGame(){

// }



// function winMatch (result){
//     if(result===win){
//         credits++;

//     }//else hard restart
// }


// function renderGameOver(result){
//     if(result===lose){
//     location.replace('gameover.html')
//     }
// }

