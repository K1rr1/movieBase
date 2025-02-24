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
    const apiKey = 'd0c3ab17'; // här ska min api nykel
    const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.Response === "False") {
      throw new Error(data.Error);
    }
    return data;
  }
  
  function renderMovieDetails(movie) {
    const container = document.getElementById('movieInformation');
    
    if (movie) {
      container.innerHTML = `
        <h1>${movie.Title}</h1>
        <img src="${movie.Poster}" alt="${movie.Title}">
        <p>${movie.Plot || "Ingen beskrivning finns."}</p>
        <p><strong>Released:</strong> ${movie.Released || "Okänt"}</p>
        <p><strong>Runtime:</strong> ${movie.Runtime || "Okänt"}</p>
        <p><strong>Genre:</strong> ${movie.Genre || "Okänt"}</p>
        <!-- Lägg gärna till fler detaljer -->
      `;
    } else {
      container.innerHTML = `<p>Filmen kunde inte hittas.</p>`;
    }
  }
  