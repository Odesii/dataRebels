import {renderCardRoll} from './3dRender/homePage.js'

const reRoll = document.querySelector('.roll')

const rollCharacter = async (event) => {
    event.preventDefault();
    const current =document.getElementById('current-Char')
    reRoll.style.display = 'none';
    const response = await fetch('/api/users/roll', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        // alert('Rolled a character!');
    } else {
        alert('Failed to roll a character.');
    }
    const character = await response.json()
if (!character.img){
console.log('No IMAGE REROLLING')
rollCharacter();
}
    renderCardRoll(character.img)

    


    setTimeout(function() {
        console.log('TIME OUT', reRoll)
        reRoll.style.display= 'inline'
        console.log(reRoll)
    }, 3000 )
    current.innerHTML = ''
    current.innerHTML = character.name
};



const initializeGameState = async (event) => {
    event.preventDefault();

    const enemy = event.target;
    const enemyId = JSON.parse(enemy.getAttribute('data-id'));

    const response = await fetch(`/api/games/${enemyId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
  console.log(response)
    if (response.ok) {
        document.location.replace('/play');
    } else if (response.status === 500) {
        alert('You are already in a game! Redirecting you to your game ...')
        document.location.replace('/play');
    } else {
        alert('Failed to start a game.');
    }
};

    reRoll.addEventListener('click', rollCharacter);

document.querySelectorAll('.play')
    .forEach(button => button?.addEventListener('click', initializeGameState));

window.addEventListener('load', () => {
    if(reRoll.dataset.img){
   renderCardRoll(reRoll.dataset.img)
    }
})