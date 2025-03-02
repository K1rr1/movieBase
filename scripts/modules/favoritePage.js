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

    
    

    favoritesContainer.appendChild(card);
  });
}
