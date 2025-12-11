// database configuration

import msql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = msql.createPool({

  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'minimal_blog',

});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected successfully!');
    connection.release();
  }
});

export default db;
