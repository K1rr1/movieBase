// Importerar modulerna
import { fetchTopMovies } from './modules/api.js';
import { renderTrailers } from './modules/caroussel.js';
import oData from './data/data.js';
import { createMovieCard } from './modules/movieCard.js';
import { getRandomMovies } from './utils/utils.js';
import { renderFavorites } from './modules/favoritePage.js';
import { initMovieDetails } from './modules/movieDeets.js';
import { initSearch } from './modules/searchFunction.js';
import { renderSearchResults } from './modules/searchResults.js';

// Väntar tills DOM är klar
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  console.log('Current path:', path);

  if (path === '/' || path === '/index.html') {
    console.log('index.html');
    initIndex();
    // Initiera sökfunktionen på index.html där sökformuläret finns i headern
    initSearch();
  } else if (path === '/movie.html') {
    console.log('movie.html');
    initMovieDetails();
  } else if (path === '/favorites.html') {
    console.log('favorites.html');
    // Anropa renderFavorites för att visa favoritfilmerna
    renderFavorites();
  } else if (path === '/search.html') {
    console.log('search.html');
    // Eftersom search.html enbart ska visa sökresultaten, rendera dessa
    renderSearchResults();
  }
});

async function initIndex() {
  // Hämtar topplistan
  await fetchTopMovies();

  // Sparar datan i ett globalt objekt
  const movies = oData.topMovieList;
  
  if (movies && movies.length > 0) {
    // Slumpar 5 filmer från datan för karusellen
    const trailerMovies = getRandomMovies(movies, 5);
    trailerMovies.forEach((movie, index) => {
      // Lägger till en frame i karusellen för varje plockad film
      renderTrailers(movie, index + 1);
    });

    // Renderar filmkort i rekommendationssektionen
    const cardContainer = document.getElementById('cardContainer');
    renderMovieCards(movies, cardContainer);
    console.log("Movies found, length:", movies.length);
  } else {
    console.error("Filmer kunde inte hittas");
  }
}

// Renderar filmkort i container-elementet
function renderMovieCards(movies, container) {
  container.innerHTML = ''; // Rensa container innan renderingen
  movies.forEach(movie => {
    container.appendChild(createMovieCard(movie));
  });
}
