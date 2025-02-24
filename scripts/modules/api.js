import oData from '../data/data.js';

export async function fetchTopMovies() {
    const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
    const movies = await response.json();
    oData.topMovieList = movies;
    console.log("Fetched movies:", movies);
  }