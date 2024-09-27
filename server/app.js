const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const db = require("./database/db");
const fs = require('fs');
const path = require('path');
const employeeRoute = require('./routes/employeeRoutes');
const cors = require('cors');

const app = express();

// CORS setup to allow requests from specific frontend port (e.g., Vite dev server on localhost:5173)
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.urlencoded({ extended: false }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route for setting up tables by reading SQL file
app.get('/setup', async (req, res) => {
    try {
        const createTableQuery = fs.readFileSync(path.join(__dirname, 'queries', 'createSQLTables.sql'), 'utf8');
        const result = await db.query(createTableQuery);
        res.send(`Tables created successfully!`);
    } catch (error) {
        console.error('SQL Query:', createTableQuery);
        console.error('Error:', error?.message);
        res.status(400).json({ message: error?.message });
    }
});

// Employee routes
app.use('/api/employee', employeeRoute);

// Use uppercase PORT variable or default to port 3000 if not provided
const port = process.env.PORT;

// Start the server and connect to the database
db.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to Database and Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error: ", error?.message);
  });
