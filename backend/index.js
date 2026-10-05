
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
app.use(cors()); // Enable CORS for all routes
connectToMongo();

// Middleware to read JSON request bodies
app.use(express.json());

// Import routes
const auth = require('./routes/auth');
const notes = require('./routes/notes');

// Available routes
app.use('/api/auth', auth);
app.use('/api/notes', notes);

// Start server
app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});