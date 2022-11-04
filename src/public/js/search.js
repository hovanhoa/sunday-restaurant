let searchButton = document.getElementById('search-button');
let closeButton = document.getElementById('close-button');
let searchResult = document.querySelector('.search-result');
let form = document.querySelector('form');

searchButton.onclick = function() {
    searchResult.classList.add('active');
}

closeButton.onclick = function() {
    searchResult.classList.remove('active');
}

form.onsubmit = function() {
    return false;
}
