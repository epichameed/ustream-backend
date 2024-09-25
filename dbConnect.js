// Import MySQL2 package
const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "193.203.184.57", // Hostname of your MySQL server
  user: "u966908622_Streams", // Username for MySQL
  password: "FarzokMalik@123", // Password for MySQL
  database: "u966908622_upwork", // Name of the MySQL database
  port: 3306, // MySQL port (default: 3306)
  connectTimeout: 50000, // Increase timeout to 10 seconds
});

// Try connecting to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database successfully!");
});

// Query example (optional)
connection.query("SELECT 1 + 1 AS result", (err, results) => {
  if (err) {
    console.error("Error executing query:", err);
  } else {
    console.log("Query results:", results);
  }

  // Close the connection
  connection.end();
});
