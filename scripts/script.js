


if(window.location.pathname === '/' || window.location.pathname === '/index.html') {
    console.log('index.html');

} else if(window.location.pathname === '/favorites.html') {
    console.log('favorites.html');

} else if(window.location.pathname === '/movie.html') {
    console.log('movie.html');

} else if(window.location.pathname === '/search.html') {
    console.log('search.html');

}

//importerar modulerna
import{fetchTopMovies} from './modules/api.js';
import { renderTrailers } from './modules/caroussel.js';
import oData from './data/data.js';
import { createMovieCard } from './modules/movieCard.js'
import { getRandomMovies } from './utils/utils.js';
import { addToFavorites } from './modules/favorite.js';


// väntar tills DOMen är klar
document.addEventListener('DOMContentLoaded', initIndex);

async function initIndex() {

    //Hämtar topplistan
    await fetchTopMovies();
    
    //sparar datan ett globalt objekt
    const movies = oData.topMovieList
    //slumpar 5 filmer från datan
    if (movies && movies.length > 0){
        const trailerMovies = getRandomMovies (movies, 5);
        trailerMovies.forEach((movie,index)=>{

            //Lägger till en frame i karusellen för varje plockad film
            renderTrailers(movie, index + 1);

        });


        //renderar(?) alla filmer som kort i rekommendations sektion
        const cardContainer = document.getElementById('cardContainer');
        renderMovieCards(movies, cardContainer)
        console.log("movies found, length", movies.length)
        
    }else {
        console.error ('This movies couldnt be found');

    }
}

//hjälpfunktionen för att välja antal slumpade filmer



//renderar filmkort i container-elementet
function renderMovieCards(movies, container){
    container.innerHTML=''; // Rensa container innan 
    movies.forEach(movie=>{
        container.appendChild(createMovieCard(movie));

    });
}

