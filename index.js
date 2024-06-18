(async function() {
    // Function to fetch card data from Magic: The Gathering API
    async function fetchCards(queryParams) {
        const url = `https://api.magicthegathering.io/v1/cards?${new URLSearchParams(queryParams)}`;
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
            li.textContent = `${card.name} (${card.type}) - ${card.colors.join(', ')} - Power/Toughness: ${card.power || ''}/${card.toughness || ''}`;
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

    // Function to handle search button click by card name
    async function searchCard() {
        const cardNameInput = document.getElementById('cardName');
        const cardName = cardNameInput.value.trim();

        if (cardName === '') {
            alert('Please enter a card name to search.');
            return;
        }

        const cards = await fetchCards({ name: cardName });
        displaySearchResults(cards);
    }

    // Function to handle search button click by card type
    async function searchCardByType() {
        const cardTypeInput = document.getElementById('cardType');
        const cardType = cardTypeInput.value.trim();

        if (cardType === '') {
            alert('Please enter a card type to search.');
            return;
        }

        const cards = await fetchCards({ type: cardType });
        displaySearchResults(cards);
    }

    // Function to filter cards by color
    async function filterByColor() {
        const cardColor = document.getElementById('cardColor').value;
        if (cardColor === '') {
            document.getElementById('colorFilteredResults').innerHTML = '<p>No color selected for filtering.</p>';
            return;
        }

        const cards = await fetchCards({});
        const filteredCards = cards.filter(card => card.colors.includes(cardColor));

        const colorFilteredResultsContainer = document.getElementById('colorFilteredResults');
        colorFilteredResultsContainer.innerHTML = '';

        if (filteredCards.length === 0) {
            colorFilteredResultsContainer.innerHTML = '<p>No cards found for the selected color.</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.className = 'card-list';

        filteredCards.forEach(card => {
            const li = document.createElement('li');
            li.textContent = `${card.name} (${card.type}) - ${card.colors.join(', ')} - Power/Toughness: ${card.power || ''}/${card.toughness || ''}`;
            li.className = 'card-item';
            li.setAttribute('data-card-id', card.id);
            li.addEventListener('click', () => addToCollection(card));
            ul.appendChild(li);
        });

        colorFilteredResultsContainer.appendChild(ul);
    }

    // Add event listeners
    document.getElementById('searchButton').addEventListener('click', searchCard);

    // Expose functions to global scope
    window.searchCardByType = searchCardByType;
    window.filterByColor = filterByColor;
})();
