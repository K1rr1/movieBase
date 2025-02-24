import { addToFavorites } from "./favorite.js";

export function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    // Poster
    const img = document.createElement('img');
    img.src = movie.Poster || './res/default.jpg';
    img.alt = movie.Title || 'Filmposter';
    card.appendChild(img);

    // Filmtitel
    const title = document.createElement('h3');
    title.textContent = movie.Title;
    card.appendChild(title);

    // Knapp för att gå till detaljsidan (movie.html)
    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'Details';
    detailsButton.addEventListener('click', () => {
        // Navigera till movie.html och skicka med imdbID i URL:en
        window.location.href = `movie.html?imdbID=${movie.imdbID}`;
    });
    card.appendChild(detailsButton);

    // Knapp för att lägga till favorit
    const favoritesButton = document.createElement('button');
    favoritesButton.textContent = 'Add to favorites';
    favoritesButton.addEventListener('click', () => {
        addToFavorites(movie);
    });
    card.appendChild(favoritesButton);

    return card;
}
