
import { addToFavorites, getFavorites, removeFromFavorites } from "./favorite.js";

export function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';

  // Skapa en container för postern
  const posterContainer = document.createElement('div');
  posterContainer.classList.add('poster-container');

  const img = document.createElement('img');
img.src = (movie.Poster && movie.Poster !== 'N/A') ? movie.Poster : 'res/icons/missing-poster.svg';
img.alt = movie.Title || 'Filmposter';
posterContainer.appendChild(img);
card.appendChild(posterContainer);


  // Filmens titel
  const title = document.createElement('h3');
  title.textContent = movie.Title;
  card.appendChild(title);


  

  //  lägger in fler fält i createMovieCard
const infoContainer = document.createElement('div');
infoContainer.classList.add('info-text');

// Lägger till olika p-element eller en gemensam textContent
const yearPara = document.createElement('p');

infoContainer.appendChild(yearPara);






// Lägger  till infoContainer i kortet
card.appendChild(infoContainer);


  


  // Knapp för att visa detaljer
const detailsButton = document.createElement('button');
detailsButton.textContent = 'Details';
detailsButton.classList.add('details-button'); // Viktigt för CSS
detailsButton.addEventListener('click', () => {
  window.location.href = `movie.html?imdbID=${movie.imdbID}`;
});
card.appendChild(detailsButton);








//Stjärnikon uppe i hörnet
const favoriteIcon = document.createElement('i');
favoriteIcon.classList.add('favorite-icon', 'fa-star');
//kontroll om redan favorit
const favorites = getFavorites();
const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
   
   if (isFavorite){
    //solid stjärna om den är favorit, else tom stjärna
    favoriteIcon.classList.add('fas');
} else {
    favoriteIcon.classList.add('far');
}


//eventlistener för att toggla favorit

favoriteIcon.addEventListener('click', (event) =>{
//går bara och trigga stjärnan när man klickan
  event.stopPropagation();
  favoriteIcon.setAttribute('aria-label', isFavorite ? 'Remove from favorites' : 'Add to favorites');

  let currentFavorites = getFavorites();
  if (currentFavorites.some(fav => fav.imdbID === movie.imdbID)) {
    // Ta bort filmen från favoriter
    removeFromFavorites(movie.imdbID);
    favoriteIcon.classList.remove('fas');
    favoriteIcon.classList.add('far');

    // , ta  bort filmkortet från sidan om den redan är i favoritet
    if (window.location.pathname.includes('favorites.html')) {
      card.remove();
    }
  } else {
    // Lägg till filmen i favoriter
    addToFavorites(movie);
    favoriteIcon.classList.remove('far');
    favoriteIcon.classList.add('fas');
  }
});

card.appendChild( favoriteIcon);



  return card;
}
