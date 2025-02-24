import oData from '../data/data.js';

// Konstanter för API
const API_KEY = 'd0c3ab17'; // Ersätt med din API-nyckel
const BASE_URL = 'https://www.omdbapi.com/';

// Funktion för att hämta top movies
export async function fetchTopMovies() {
  const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
  const movies = await response.json();
  oData.topMovieList = movies;
  console.log("Fetched movies:", movies);
}

// Funktion för att hämta detaljerad info om en film baserat på imdbID
export async function fetchMovieDetails(imdbID) {
  try {
    const url = `${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`;
    console.log('Fetching URL:', url); // Debug-utskrift
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}
