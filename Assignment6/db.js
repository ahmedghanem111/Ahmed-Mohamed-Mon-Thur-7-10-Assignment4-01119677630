const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Seq_Mon'
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting: ', err);
  } else {
    console.log('Connected to MySQL ');
  }
});

module.exports = db;