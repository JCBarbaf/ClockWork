require('dotenv').config();
const mariadb = require('mariadb');

async function createDatabase() {
  const connection = await mariadb.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || ''
  });

  try {
    const dbName = process.env.DB_NAME;
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Base de datos '${dbName}' verificada/creada correctamente.`);
  } catch (error) {
    console.error('Error al crear la base de datos:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

createDatabase();