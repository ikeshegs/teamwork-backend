import express from 'express';
import 'regenerator-runtime/runtime';
import 'core-js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// Routes
import userRoute from './routes/user';
import gifRoute from './routes/gifs';
import articleRoute from './routes/articles';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(userRoute);
app.use(gifRoute);
app.use(articleRoute);

app.get('/', (req, res) => {
  return res
    .status(200)
    .send('Welcome to Teamwork. An internal social network for employees of an organization.')
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Teamwork is running on port', PORT);

export default app;