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

const createArticleTable = () => {
  const queryText = 
    `
      CREATE TABLE IF NOT EXISTS
        articles(
          id UUID PRIMARY KEY,
          title CHAR(60) NOT NULL,
          article CHAR(255) NOT NULL,
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

const dropArticleTable = () => {
  const queryText = 'DROP TABLE IF EXISTS articles';
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
  console.log('Article removed');
  process.exit(0);
});

export { createArticleTable, dropArticleTable };

// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');