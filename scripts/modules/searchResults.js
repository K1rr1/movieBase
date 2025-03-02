import { createMovieCard } from './movieCard.js';

export function renderSearchResults() {
  const cardContainer = document.getElementById('cardContainer');
  if (!cardContainer) {
    console.error('cardContainer hittades inte.');
    return;
  }

  const resultsString = localStorage.getItem('searchResults');
  
  // Först kollar vi om resultsString finns överhuvudtaget.
  if (!resultsString) {
    // Om den inte finns, skriv ut att inga sökresultat hittades.
    cardContainer.innerHTML = '<p>Inga sökresultat hittades.</p>';
    return;
  }

  let movies;
  try {
    // Försök att parsa JSON-datan
    movies = JSON.parse(resultsString);
  } catch (error) {
    // Om det blir fel vid parsning, logga felet och informera användaren
    console.error("Fel vid parsning av sökresultaten:", error);
    cardContainer.innerHTML = '<p>Ett fel inträffade vid laddning av sökresultaten.</p>';
    return;
  }

  // Om movies inte är en array eller är tom, meddela att inga sökresultat hittades
  if (!Array.isArray(movies) || movies.length === 0) {
    cardContainer.innerHTML = '<p>Inga sökresultat hittades.</p>';
    return;
  }

  // Rensa containern och rendera varje film
  cardContainer.innerHTML = '';
  movies.forEach(movie => {
    const card = createMovieCard(movie);
    cardContainer.appendChild(card);
  });

  // Ta bort sökresultaten från localStorage om du inte vill spara dem
  localStorage.removeItem('searchResults');
}