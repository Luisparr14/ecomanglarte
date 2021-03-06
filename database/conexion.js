import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  } else {
    console.log('Connected!');
  }
})

export default connection;