import { createMovieCard } from './movieCard.js';

export function renderSearchResults() {
  const cardContainer = document.getElementById('cardContainer');
  if (!cardContainer) {
    console.error('cardContainer hittades inte.');
    return;
  }

  const resultsString = localStorage.getItem('searchResults');
  if (resultsString) {
    const movies = JSON.parse(resultsString);
    cardContainer.innerHTML = ''; // Töm containern

    movies.forEach(movie => {
      // Använd createMovieCard istället för att manuellt skapa ett kort
      const card = createMovieCard(movie);
      cardContainer.appendChild(card);
    });
    // Rensa localStorage om du inte vill behålla datan efter visning
    localStorage.removeItem('searchResults');
  } else {
    cardContainer.innerHTML = '<p>Inga sökresultat hittades.</p>';
  }
}
