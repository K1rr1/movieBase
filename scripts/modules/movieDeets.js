// modules/movieDetails.js

export async function initMovieDetails() {
    const params = new URLSearchParams(window.location.search);
    const imdbID = params.get('imdbID');
  
    if (!imdbID) {
      console.error("Inget imdbID hittades i URL:en.");
      return;
    }
  
    try {
      // Anropa den andra API:n OMDb API med imdbID
      const movie = await fetchMovieDetailsFromOtherAPI(imdbID);
      renderMovieDetails(movie);
    } catch (error) {
      console.error("Fel vid hämtning av filmdetaljer:", error);
    }
  }
  
  async function fetchMovieDetailsFromOtherAPI(imdbID) {
    const apiKey = 'd0c3ab17'; // api nykel
    const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}&plot=full`;

    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.Response === "False") {
      throw new Error(data.Error);
    }
    return data;
  }
  
  function renderMovieDetails(movie) {
    const container = document.getElementById('movieInformation');
    if (!container) {
      console.error("Container med id 'movieInformation' hittades inte.");
      return;
    }
  
    // Hjälpfunktion för att hantera "N/A"-värden
    function getInfo(field, fallback) {
      return (field && field !== "N/A") ? field : fallback;
    }
  
    container.innerHTML = `
      <div class="movie-details-container">
        <div class="movie-poster">
          <img src="${getInfo(movie.Poster, './res/default.jpg')}" alt="${getInfo(movie.Title, 'Filmposter')}">
        </div>
        <div class="movie-info">
          <h1>${getInfo(movie.Title, "No Title")}</h1>
          <p><strong>Released:</strong> ${getInfo(movie.Released, "Unknown")}</p>
          <p><strong>Runtime:</strong> ${getInfo(movie.Runtime, "Unknown")}</p>
          <p><strong>Genre:</strong> ${getInfo(movie.Genre, "Unknown")}</p>
          <p><strong>IMDb Rating:</strong> ${getInfo(movie.imdbRating, "N/A")}</p>
          <p><a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">View on IMDb</a></p>
        </div>
      </div>
      <div class="movie-plot">
        <h2>Plot</h2>
        <p>${getInfo(movie.Plot, "No plot available.")}</p>
      </div>
    `;
  }
  