import oData from '../data/data.js';

export async function fetchTopMovies() {
  try {
    const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const movies = await response.json();
    oData.topMovieList = movies;
    console.log("Fetched movies:", movies);
  } catch (error) {
    console.error("Error fetching top movies:", error);
  }
}