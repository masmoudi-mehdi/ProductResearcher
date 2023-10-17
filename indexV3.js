const apiKey = 'AIzaSyCjHbaikGwZgRLsVcbZynIJ972pljZet_o';
const cx = 'd1964a48cd7584d7c';
const searchTerm = '1800 Tequila, Reposado Tequila 100% de Agave'; 

const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchTerm}`;

function removeUnwantedResults(results) {
  return results.filter(item => item.displayLink !== "https://app.provi.com" && item.displayLink !== "https://www.wine-searcher.com");
}

fetch(url)
  .then(response => response.json())
  .then(data => {
    const results = data.items;
    
    // Supprimer les éléments indésirables
    const filteredResults = removeUnwantedResults(results);

    // Ajouter la logique de tri
    const compareByRelevance = (a, b) => {
      const relevanceA = a.title.includes(searchTerm) + a.snippet.includes(searchTerm);
      const relevanceB = b.title.includes(searchTerm) + b.snippet.includes(searchTerm);
      return relevanceB - relevanceA; // Tri par ordre décroissant de pertinence
    };

    filteredResults.sort(compareByRelevance); // Tri des résultats

    console.log(filteredResults[0]);
  })
  .catch(error => {
    console.error('Erreur lors de la recherche Google :', error);
  });
