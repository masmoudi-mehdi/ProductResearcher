const apiKey = 'AIzaSyCjHbaikGwZgRLsVcbZynIJ972pljZet_o';
const cx = 'd1964a48cd7584d7c';
const searchTerm = '1800 Tequila, Silver Tequila 100% de Agave'; 

const competitorLinks = ["https://app.provi.com", "https://www.wine-searcher.com"]

const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchTerm}&searchType=image`;

fetch(url)
  .then(response => response.json())
  .then(data => {
   
    let result = {
      productName : searchTerm,
      img : data.items[0].image.thumbnailLink,
      description : data.items[0].snippet,
    };

    console.log(data.items[0]); 
  })
  .catch(error => {
    console.error('Erreur lors de la recherche Google :', error);
  });

