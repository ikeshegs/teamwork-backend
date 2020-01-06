import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createGifTable = () => {
  const queryText = 
    `
      CREATE TABLE IF NOT EXISTS
        gifs(
          id UUID PRIMARY KEY,
          title CHAR(60) NOT NULL,
          image_url VARCHAR(255) NOT NULL,
          created_on TIMESTAMP
        )
    `;
  
  pool.query(queryText)
    .then((res) => {
      console.log(res)
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const dropGifTable = () => {
  const queryText = 'DROP TABLE IF EXISTS gifs';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('Gif removed');
  process.exit(0);
});

export { createGifTable, dropGifTable };

// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');