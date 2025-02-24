import { fetchMovieDetails } from './api.js';

// Läs av imdbID från URL:en
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

if (imdbID) {
  fetchMovieDetails(imdbID)
    .then(movieData => {
      console.log('Fetched movie details:', movieData);
      displayMovieDetails(movieData);
    })
    .catch(error => console.error('Error fetching details:', error));
} else {
  console.error('Inget imdbID hittades i URL:en');
}

function displayMovieDetails(movie) {
  const movieInformation = document.getElementById('movieInformation');
  if (!movieInformation) return;
  
  movieInformation.innerHTML = `
    <h2>${movie.Title}</h2>
    <img src="${movie.Poster}" alt="${movie.Title}">
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
    <p><strong>Actors:</strong> ${movie.Actors}</p>
  `;
}
