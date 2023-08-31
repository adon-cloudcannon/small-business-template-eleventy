const fs = require('fs');
const path = require('path');

// Global custom styles are generated at build. 
// If you make local changes within _data/site/styles.json they will not automatically refresh.
// You will need to rebuild the site for the changes to take effect.
console.log("🎨 Generating Custom Styles")

// Read JSON data
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../_data/site.json'), 'utf-8'));

// Retrieve the custom object from JSON
const styles = data.styles;

// Initialize CSS string with the :root selector
let cssString = ':root {\n';

// Loop over all keys in the custom object
for (let key in styles) {
  // Convert underscores to dashes in the key name
  const cssKey = key.replace(/_/g, '-');

  // Append each key-value pair to the CSS string
  cssString += `  --${cssKey}: ${styles[key]};\n`;
}

// Close the :root selector
cssString += '}\n';

// Write to a CSS file
fs.writeFileSync(path.join(__dirname, '../styles/custom-styles.css'), cssString);
