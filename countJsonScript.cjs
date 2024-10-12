const fs = require('fs');

// Replace 'path/to/your/file.json' with the actual path to your JSON file
const jsonFilePath = './phungmotorbike-data.json';

// Read the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Check if jsonData is an array or an object
        const count = Array.isArray(jsonData) ? jsonData.length : Object.keys(jsonData).length;

        console.log(`Number of objects in JSON: ${count}`);
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
});
