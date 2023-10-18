const fs = require('fs');

// Read the file results.json
fs.readFile('results.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error while reading the file results.json:', err);
    return;
  }

  try {
    // Parse the JSON content into an array of objects
    const products = JSON.parse(data);

    // Create an object to store unique products using productName as the key
    const uniqueProducts = {};

    // Filter the products to remove duplicates
    products.forEach((product) => {
      uniqueProducts[product.productName] = product;
    });

    // Convert the object of objects to an array of objects
    const uniqueProductsArray = Object.values(uniqueProducts);

    // Convert the array to JSON format
    const uniqueProductsJSON = JSON.stringify(uniqueProductsArray, null, 2);

    // Save the result to a new file unique_results.json
    fs.writeFile('results.json', uniqueProductsJSON, 'utf8', (err) => {
      if (err) {
        console.error('Error while saving the file results.json:', err);
      } else {
        console.log('Duplicate products removed successfully. Result saved in results.json.');
      }
    });
  } catch (parseError) {
    console.error('Error while parsing the JSON file:', parseError);
  }
});
