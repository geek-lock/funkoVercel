require('dotenv').config();
const mysql = require('mysql2');

// Crear un pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexiones en el pool
  queueLimit: 0 // Sin límite en la cola de conexiones
});

// Conectar al pool de conexiones
pool.getConnection((err, connection) => {
  if (err) {
    console.error("ERROR conectando a la base de datos", err);
    return;
  }

  console.log("Conectado EXITOSAMENTE a la base de datos");

  // Liberar la conexión de vuelta al pool después de usarla
  connection.release();
});

module.exports = pool;
