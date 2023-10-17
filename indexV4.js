const apiKey = 'AIzaSyCjHbaikGwZgRLsVcbZynIJ972pljZet_o';
const cx = 'd1964a48cd7584d7c';
const searchTerms = ["1800 Tequila, Silver Tequila 100% de Agave", "Absolut, Blue Vodka", "Absolut, Peppar Flavored Vodka"]; // Remplacez par les valeurs que vous souhaitez rechercher

const competitorLinks = ["https://app.provi.com", "https://www.wine-searcher.com"];

let results = [];

function fetchGoogleData(searchTerm) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchTerm}&searchType=image`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      let result = {
        productName: searchTerm,
        img: '',
        description: '',
      };

      for (let i = 0; i < data.items.length; i++) {
        if (competitorLinks.includes(data.items[i].displayLink)) {
          continue;
        }
        result.img = data.items[i].link;
        result.description = data.items[i].snippet;
        results.push(result);
        break;
      }
    })
    .catch(error => {
      console.error('Google search error for ', searchTerm, ':', error);
    });
}

const promises = searchTerms.map(searchTerm => fetchGoogleData(searchTerm));

Promise.all(promises)
  .then(() => {
    console.log(results);
  })
  .catch(error => {
    console.error('Google search error :', error);
  });
