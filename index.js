// Function to fetch card data from Magic: The Gathering API
async function fetchCardsByName(cardName) {
    const url = `https://api.magicthegathering.io/v1/cards?name=${encodeURIComponent(cardName)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.cards;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to display search results
function displaySearchResults(cards) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    if (cards.length === 0) {
        searchResultsContainer.innerHTML = '<p>No cards found.</p>';
        return;
    }

    const ul = document.createElement('ul');
    ul.className = 'card-list';

    cards.forEach(card => {
        const li = document.createElement('li');
        li.textContent = `${card.name} (${card.type}) - ${card.colors.join(', ')} - Power/Toughness: ${card.power}/${card.toughness}`;
        li.className = 'card-item';
        li.setAttribute('data-card-id', card.id);
        li.addEventListener('click', () => addToCollection(card));
        ul.appendChild(li);
    });

    searchResultsContainer.appendChild(ul);
}

// Function to add card to collection
function addToCollection(card) {
    const collectionList = document.getElementById('cardCollection');
    const li = document.createElement('li');
    li.textContent = `${card.name} (${card.type})`;
    li.className = 'card-item';
    collectionList.appendChild(li);
}

// Function to handle search button click
async function searchCard() {
    const cardNameInput = document.getElementById('cardName');
    const cardName = cardNameInput.value.trim();

    if (cardName === '') {
        alert('Please enter a card name to search.');
        return;
    }

    const cards = await fetchCardsByName(cardName);
    displaySearchResults(cards);
}