// Initializes document
document.addEventListener("DOMContentLoaded", () => {
    displayText()
});
//Displays Welcome message when DOM is loaded.
function displayText() {
    let message = document.querySelector('h1')
    message.innerHTML = 'Welcome to Your NEW MTG Card Finder!'
};
//Card Name Function
function getCardName() {
    const cardName = document.getElementById('cardName').value.toLowerCase();
    fetch(`https://api.magicthegathering.io/v1/cards?name=${cardName}`)
    .then(response => response.json())
    .then(data => {
         data.cards.forEach(card => {
            console.log(card.name);
            const imgElement = document.createElement("img");
            imgElement.src = card.imageUrl
            imgElement.style.display = "block";
            const images = document.querySelector('#nameImages');
            images.appendChild(imgElement);
        })
    })
    .catch(error => console.error(error));
}
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', getCardName)
//Card Type Function
function getCardType() {
    const cardType = document.getElementById('cardType').value.toLowerCase();
    fetch(`https://api.magicthegathering.io/v1/cards?type=${cardType}`)
    .then(response => response.json())
    .then(data => {
        data.cards.forEach(card => {
            console.log(card.type);
            const imgElement = document.createElement("img");
            imgElement.src = card.imageUrl
            imgElement.style.display = "block";
            const images = document.querySelector('#typeImages');
            images.appendChild(imgElement);
        })
    })
    .catch(error => console.error(error));
}
const landButton = document.getElementById('landButton');
landButton.addEventListener('keydown', getCardType)
//Card Color Function
function getCardRarity() {
    const cardRarity = document.getElementById('cardRarity').value.toLowerCase();
    fetch(`https://api.magicthegathering.io/v1/cards?rarity=${cardRarity}`)
    .then(response => response.json())
    .then(data => {
        data.cards.forEach(card => {
            console.log(card.rarity);
            const imgElement = document.createElement("img");
            imgElement.src = card.imageUrl
            imgElement.style.display = "block";
            const images = document.querySelector('#rarityImages');
            images.appendChild(imgElement);
        })
    })
    .catch(error => console.error(error));
}
const colorButton = document.getElementById('rarityButton');
colorButton.addEventListener('click', getCardRarity);



