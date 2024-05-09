const initializeUserInventory = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);

    if (response.ok) {
        document.location.replace('/shop');
    } else if (response.status = 500) {
        document.location.replace('/shop');
    } else {
        alert('Failed to initialize your inventory.');
    }
}

const purchaseItem = async (event) => {
    event.preventDefault();

    const item = event.target;

    const itemId = JSON.parse(item.getAttribute('data-id'));

    const response = await fetch(`/api/items/${itemId}`, {
        method: 'PUT'
    });
      
    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to buy the item.');
    }
}

document
    .querySelector('.shop')
    ?.addEventListener('click', initializeUserInventory);

document.querySelectorAll('.buy')
    .forEach(button => button?.addEventListener('click', purchaseItem));