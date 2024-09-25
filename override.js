const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: "193.203.184.57", // Hostname of your MySQL server
  user: "u966908622_Streams", // Username for MySQL
  password: "FarzokMalik@123", // Password for MySQL
  database: "u966908622_upwork", // Name of the MySQL database
});

// Password to override with (hashed)
const newPassword = 'FarzokMalik@123';
const saltRounds = 10;

bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }

  // Update all users' passwords with the hashed password
  const query = 'UPDATE users SET password = ?';

  connection.query(query, [hashedPassword], (error, results) => {
    if (error) {
      console.error('Error updating passwords:', error);
      return;
    }

    console.log(`Updated ${results.affectedRows} users' passwords successfully.`);
  });

  // Close the database connection
  connection.end();
});
