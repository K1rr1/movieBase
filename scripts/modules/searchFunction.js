export async function searchMovies(query) {
    const apiKey = 'd0c3ab17';
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`


    try{
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error('nätverksfel: kan ej nå OMDB API');

    }
    const data = await response.json();
    if (data.response === "false"){
        throw new Error(data.Error);

    }
    

    //returnera sökresultatet (en array med filmobject)
    return data.Search;
} catch (error){
    console.error("fel vid hämtning av filmer:", error);
    throw error;

}
}

export function initSearch() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
  
    if (!searchForm || !searchInput) {
      console.error('Sökformuläret eller inputfältet kunde inte hittas.');
      return;
    }
  
    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Förhindra att sidan laddas om
      const query = searchInput.value.trim();
      if (!query) {
        
        console.warn('Sökfältet är tomt.');
        return;
      }
      try {
        const movies = await searchMovies(query);
        console.log("Sökresultat:", movies);
        //spara resultaten 
        localStorage.setItem('searchResults', JSON.stringify(movies));
        
        //omdirigerars till search.html med resultaten
        window.location.href = 'search.html';
      } catch (error) {
        // Här  hantera felet, t.ex. visa ett felmeddelande för användaren
        console.error("Något gick fel vid sökningen:", error);
      }
    });
  }