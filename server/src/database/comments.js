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

const createCommentTable = () => {
  const queryText = 
    `
      CREATE TABLE IF NOT EXISTS
        comments(
          id UUID PRIMARY KEY,
          article_id CHAR(60),
          gif_id CHAR(60),
          comment CHAR(255) NOT NULL,
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

const dropCommentTable = () => {
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
  console.log('Comment removed');
  process.exit(0);
});

export { createCommentTable, dropCommentTable };

// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');