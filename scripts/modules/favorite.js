export function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    if (!favorites.find(fav => fav.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
      alert(`${movie.Title} added to favorites`);
    } else {
      alert(`${movie.Title} is already in favorites`);
    }
    
  }