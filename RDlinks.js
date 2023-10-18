const fs = require('fs');

// Read the file links.json
fs.readFile('links.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error while reading the file links.json:', err);
    return;
  }

  try {
    // Parse the JSON content into an array
    const links = JSON.parse(data);

    // Create a set to remove duplicates
    const uniqueLinksSet = new Set(links);

    // Convert the set back to an array
    const uniqueLinksArray = [...uniqueLinksSet];

    // Convert the array to JSON format
    const uniqueLinksJSON = JSON.stringify(uniqueLinksArray, null, 2);

    // Save the result to a new file unique_links.json
    fs.writeFile('links.json', uniqueLinksJSON, 'utf8', (err) => {
      if (err) {
        console.error('Error while saving the file links.json:', err);
      } else {
        console.log('Duplicates removed successfully. Result saved in links.json.');
      }
    });
  } catch (parseError) {
    console.error('Error while parsing the JSON file:', parseError);
  }
});
