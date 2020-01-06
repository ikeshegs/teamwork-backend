import express from 'express';
import auth from '../utils/auth';

// Validators
import {
  titleCheck,
  articleCheck
} from '../middlewares/validators/articleValidator';

// Controller
import article from '../controller/article';

const articleRoute = express.Router();

articleRoute.post(
  '/api/v1/articles',
  auth.verifyToken,
  [titleCheck, articleCheck],
  article.createArticle
);

export default articleRoute;