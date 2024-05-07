const rollCharacter = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/roll', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        alert('Rolled a character!');
        document.location.replace('/');
    } else {
        alert('Failed to roll a character.');
    }
};

const initializeGameState = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        document.location.replace('/play');
    } else if (response.status = 500) {
        alert('You are already in a game! Redirecting you to your game ...')
        document.location.replace('/play');
    } else {
        alert('Failed to start a game.');
    }
};

document
    .querySelector('.roll')
    ?.addEventListener('click', rollCharacter);

document
    .querySelector('.play')
    ?.addEventListener('click', initializeGameState);
  