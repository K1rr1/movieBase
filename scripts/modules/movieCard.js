//skapar ett enskilt filmkort
import { addToFavorites } from "./favorite.js";


export function createMovieCard(movie){
    const card = document.createElement ('div');
    card.className = 'movie-card';

    //posters
    const img = document.createElement ('img');
    img.src = movie.Poster || './res/default.jpg'; // om bilden inte finns lägger en default bild, har inget default.jpg ännu dock
    img.alt = movie.Title || 'Filmposter';
    card.appendChild(img);

    //film titeln
    const title = document.createElement('h3');
    title.textContent = movie.Title;
    card.appendChild(title);

    //knappen som navigerar till filmsidan
    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'details';
    detailsButton.addEventListener('click', () => {
        window.location.href = `movie.html?imdbID=${movie.imdbID}`;

    });
    card.appendChild(detailsButton);

    //favorit knapp för o spara
    const favoritesButton = document.createElement('button');
    favoritesButton.textContent = 'Add to favorites';
    detailsButton.addEventListener('click', ()=> {
        addToFavorites (movie);
    });
    card.appendChild(favoritesButton);
    
    return card;

    // //favorit funktionen, funkar inte som den ska just nu glöm inte
    // function addToFavorites(movie){
    //     let favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    //     //kontroll om filmen redans fins i listan
    //     if (!favorites.find(fav => fav.imdbID === movie.imdbID)){
    //         favorites.push(movie);
    //         localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    //         alert (`${movie.Title} added to favorites`);

    //     }
    //     else {
    //         alert(`${movie.Title} is already in favorites`)
    //     }
    // }
}