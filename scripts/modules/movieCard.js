// movieCard.js
import { addToFavorites } from "./favorite.js";

export function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';

  // Skapa en container för postern
  const posterContainer = document.createElement('div');
  posterContainer.classList.add('poster-container');

  const img = document.createElement('img');
  img.src = (movie.Poster && movie.Poster !== 'N/A') ? movie.Poster : './res/default.jpg';
  img.alt = movie.Title || 'Filmposter';
  posterContainer.appendChild(img);
  card.appendChild(posterContainer);

  // Filmens titel
  const title = document.createElement('h3');
  title.textContent = movie.Title;
  card.appendChild(title);

  // Knapp för att visa detaljer
  const detailsButton = document.createElement('button');
  detailsButton.textContent = 'Details';
  detailsButton.addEventListener('click', () => {
    window.location.href = `movie.html?imdbID=${movie.imdbID}`;
  });
  card.appendChild(detailsButton);

  // Favoritknapp för att spara filmen
  const favoritesButton = document.createElement('button');
  favoritesButton.textContent = 'Add to favorites';
  favoritesButton.addEventListener('click', () => {
    addToFavorites(movie);
  });
  card.appendChild(favoritesButton);

  return card;
}
