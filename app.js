const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use port 3000 by default

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, Express.js!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
