export function addToFavorites(movie) {
  let favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

  // Kolla om filmen redan finns i favoriter
  if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
    favorites.push(movie);
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    alert(`${movie.Title} added to favorites!`);
  } else {
    alert(`${movie.Title} is already in favorites.`);
  }
}

export function getFavorites() {
  return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
}

export function removeFromFavorites(imdbID) {
  let favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  // Filtrera bort den film vi vill ta bort
  favorites = favorites.filter(fav => fav.imdbID !== imdbID);
  localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
}
