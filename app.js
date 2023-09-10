const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use port 3000 by default
require('dotenv').config();

// Configure Mongoose connection
mongoose.connect('mongodb://localhost:27017/test_genedevs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Handle database connection events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, Express.js!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
