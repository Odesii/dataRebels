async function wipingUser() {
    const response = await fetch('/api/users/gameover', {
        method: 'DELETE'
    });

    if (response.ok) {
        setTimeout(function() {
            document.location.replace('/');
        }, 5000)
    } else {
        alert('Failed to delete account.');
    }
}

wipingUser();