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

    // Function to fetch set data from Magic: The Gathering API
    async function fetchSets() {
        const url = `https://api.magicthegathering.io/v1/sets`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.sets;
        } catch (error) {
            console.error('Error fetching sets:', error);
            return [];
        }
    }

    // Populate the set dropdown with available sets
    async function populateSetDropdown() {
        const sets = await fetchSets();
        const setDropdown = document.getElementById('cardSet');
        sets.forEach(set => {
            const option = document.createElement('option');
            option.value = set.code;
            option.textContent = set.name;
            setDropdown.appendChild(option);
        });
    }

    // Call the populateSetDropdown function when the script loads
    await populateSetDropdown();

    // Function to display search results
    function displaySearchResults(cards, containerId) {
        const resultsContainer = document.getElementById(containerId);
        resultsContainer.innerHTML = '';

        if (cards.length === 0) {
            resultsContainer.innerHTML = '<p>No cards found.</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.className = 'card-list';

        cards.forEach(card => {
            const li = document.createElement('li');
            li.textContent = `${card.name} (${card.type}) - ${card.colors.join(', ')} - Power/Toughness: ${card.power || ''}/${card.toughness || ''}`;
            li.className = 'card-item';
            li.setAttribute('data-card-id', card.id);
            li.addEventListener('click', () => displayCardImage(card));
            ul.appendChild(li);
        });

        resultsContainer.appendChild(ul);
    }

    // Function to add card to collection
    function addToCollection(card) {
        const collectionList = document.getElementById('cardCollection');
        const li = document.createElement('li');
        li.textContent = `${card.name} (${card.type})`;
        li.className = 'card-item';
        li.addEventListener('click', () => displayCardImage(card));
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
        displaySearchResults(cards, 'searchResults');
    }

    // Function to filter cards by color, type, and set
    async function filterCards() {
        const cardColor = document.getElementById('cardColor').value;
        const cardType = document.getElementById('cardType').value;
        const cardSet = document.getElementById('cardSet').value;

        const queryParams = {};
        if (cardColor) queryParams.colors = cardColor;
        if (cardType) queryParams.types = cardType;
        if (cardSet) queryParams.set = cardSet;

        const cards = await fetchCards({});
        const filteredCards = cards.filter(card => {
            const colorMatch = cardColor === '' || card.colors.includes(cardColor);
            const typeMatch = cardType === '' || card.type.toLowerCase().includes(cardType.toLowerCase());
            const setMatch = cardSet === '' || card.set.toLowerCase() === cardSet.toLowerCase();
            return colorMatch && typeMatch && setMatch;
        });

        const filteredResultsContainer = document.getElementById('filteredResults');
        displaySearchResults(filteredCards, 'filteredResults');
    }

    // Function to display the card image
    function displayCardImage(card) {
        const cardImage = document.getElementById('cardImage');
        if (card.imageUrl) {
            cardImage.src = card.imageUrl;
            cardImage.style.display = 'block';
        } else {
            cardImage.style.display = 'none';
        }
    }

    // Expose functions to global scope
    window.searchCard = searchCard;
    window.filterCards = filterCards;
})();


