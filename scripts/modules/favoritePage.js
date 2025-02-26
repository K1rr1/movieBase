import { getFavorites, removeFromFavorites } from './favorite.js';
import { createMovieCard } from './movieCard.js';

export function renderFavorites() {
  const favoritesContainer = document.getElementById('favoritesContainer');
  if (!favoritesContainer) {
    console.error('Kunde inte hitta favoritesContainer.');
    return;
  }

  const favorites = getFavorites();
  favoritesContainer.innerHTML = ''; // Rensa container

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = '<p>No favorites yet.</p>';
    return;
  }

  favorites.forEach(movie => {
    const card = createMovieCard(movie);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove from Favorites';
    removeBtn.addEventListener('click', () => {
      removeFromFavorites(movie.imdbID);
      renderFavorites(); // Uppdatera sidan efter borttag
    });
    card.appendChild(removeBtn);

    favoritesContainer.appendChild(card);
  });
}
