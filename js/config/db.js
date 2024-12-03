const { Pool } = require('pg'); // Importamos el paquete "pg" que nos permitirá conectar a PostgreSQL
require('dotenv').config(); // Importamos dotenv para leer las variables de entorno

// Creamos un "pool" de conexiones a PostgreSQL
const pool = new Pool({
  Brandon: process.env.PG_USER,  
  host: process.env.PG_HOST,      
  database: process.env.PG_DATABASE,  
  password: process.env.PG_PASSWORD,  
  port: process.env.PG_PORT 
});

module.exports = pool; 
