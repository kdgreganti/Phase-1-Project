document.addEventListener("DOMContentLoaded", () => {
    fetchCards()
});
function fetchCards() {
    const url = `https://api.magicthegathering.io/v1/cards`;
    fetch(url) 
    .then(r => r.json())
    .then(data => {
        debugger
    })
}

// (async () => {
//     // Function to fetch card data from Magic: The Gathering API
//     async function fetchCards(queryParams) {
//         const url = `https://api.magicthegathering.io/v1/cards?${new URLSearchParams(queryParams)}`;
//         try {
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             return data.cards;
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             return [];
//         }
//     }

//     // Function to fetch set data from Magic: The Gathering API
//     async function fetchSets() {
//         const url = `https://api.magicthegathering.io/v1/sets`;
//         try {
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             return data.sets;
//         } catch (error) {
//             console.error('Error fetching sets:', error);
//             return [];
//         }
//     }

//     // Populate the set dropdown with available sets
//     async function populateSetDropdown() {
//         const sets = await fetchSets();
//         const setDropdown = document.getElementById('cardSet');

//          // Add option for all sets as default
//         const allSetsOption = document.createElement('option');
//         allSetsOption.value = '';
//         allSetsOption.textContent = 'All Sets';
//         setDropdown.appendChild(allSetsOption);

//         sets.forEach(set => {
//             const option = document.createElement('option');
//             option.value = set.code;
//             option.textContent = set.name;
//             setDropdown.appendChild(option);
//         });
//     }

//     // Call the populateSetDropdown function when the script loads
//     await populateSetDropdown();

//     // Function to display search results
//     function displaySearchResults(cards, containerId) {
//         const resultsContainer = document.getElementById(containerId);
//         resultsContainer.innerHTML = ''; // Clear previous results

//         // Add title "Search Results"
//         const title = document.createElement('h2');
//         title.textContent = 'Search Results';
//         resultsContainer.appendChild(title);

//         if (cards.length === 0) {
//             resultsContainer.innerHTML += '<p>No cards found.</p>';
//             return;
//         }

//         const ul = document.createElement('ul');
//         ul.className = 'card-list';

//         cards.forEach(card => {
//             const li = document.createElement('li');
//             li.className = 'card-item';
//             li.setAttribute('data-card-id', card.id);
//             li.addEventListener('click', () => addToCollection(card));

//             // Display card image if available
//             if (card.imageUrl) {
//                 const img = document.createElement('img');
//                 img.src = card.imageUrl;
//                 img.alt = card.name;
//                 li.appendChild(img);
//             }

//             ul.appendChild(li);
//         });

//         resultsContainer.appendChild(ul);
//     }

//     // Function to add card to collection
//     function addToCollection(card) {
//         const collectionList = document.getElementById('cardCollection');
//         const li = document.createElement('li');
//         li.textContent = `${card.name} (${card.type})`;
//         li.className = 'card-item';
//         li.setAttribute('data-card-id', card.id);
//         li.addEventListener('click', () => removeFromCollection(card.id)); // Add event listener to remove the card
//         collectionList.appendChild(li);
//     }

//     // Function to remove a card from the collection
//     function removeFromCollection(cardId) {
//         const collectionList = document.getElementById('cardCollection');
//         const cardToRemove = collectionList.querySelector(`[data-card-id="${cardId}"]`);
//         if (!cardToRemove) return;

//         const confirmRemoval = confirm(`Are you sure you want to remove "${cardToRemove.textContent.trim()}" from your collection?`);
//         if (confirmRemoval) {
//             collectionList.removeChild(cardToRemove);
//         }
//     }

//     // Function to handle search button click by card name
//     async function searchCard() {
//         const cardNameInput = document.getElementById('cardName');
//         const cardName = cardNameInput.value.trim();

//         if (cardName === '') {
//             alert('Please enter a card name to search.');
//             return;
//         }

//         const cardColor = document.getElementById('cardColor').value;
//         const cardType = document.getElementById('cardType').value;
//         const cardSet = document.getElementById('cardSet').value;

//         const queryParams = { name: cardName };
//         if (cardColor) queryParams.colors = cardColor;
//         if (cardType) queryParams.types = cardType;
//         if (cardSet) queryParams.set = cardSet;

//         const cards = await fetchCards(queryParams);
//         displaySearchResults(cards, 'searchResultsContainer'); // Display results below the "Search Results" title
//     }

//     // Function to filter cards by color, type, and set
//     async function filterCards() {
//         const cardColor = document.getElementById('cardColor').value;
//         const cardType = document.getElementById('cardType').value;
//         const cardSet = document.getElementById('cardSet').value;

//         const queryParams = {};
//         if (cardColor) queryParams.colors = cardColor;
//         if (cardType) queryParams.types = cardType;
//         if (cardSet) queryParams.set = cardSet;

//         const cards = await fetchCards({});
//         const filteredCards = cards.filter(card => {
//             const colorMatch = cardColor === '' || card.colors.includes(cardColor);
//             const typeMatch = cardType === '' || card.type.toLowerCase().includes(cardType.toLowerCase());
//             const setMatch = cardSet === '' || card.set.toLowerCase() === cardSet.toLowerCase();
//             return colorMatch && typeMatch && setMatch;
//         });

//         const filteredResultsContainer = document.getElementById('filteredResults');
//         displaySearchResults(filteredCards, 'filteredResults');
//     }

//     // Expose functions to global scope
//     window.searchCard = searchCard;
//     window.filterCards = filterCards;
// })();


