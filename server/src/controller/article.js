import uuidv4 from 'uuid/v4';
import moment from 'moment';

import db from '../database';
import customValidator from '../middlewares/validatorErrors';

const Article = {

  /**
   * Create A Article
   * @param {object} req 
   * @param {object} res
   * @returns {object}
   */

  async createArticle(req, res) {
    const validator = customValidator(req);

    if (validator.error) {
      return res.status(404).json({
        status: 404,
        error: validator.error
      });
    }

    const { title, article } = req.body;

    const text = `INSERT INTO
      articles(id, title, article, created_on)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      uuidv4(),
      title,
      article,
      moment()
    ];

    try {
      const data = await db.query(text, values);
      if (data) {
        
        return res.status(201).json({
          status: "success",
          data: {
            message: "Article successfully posted",
            title: data.rows[0].title,
            articleId: data.rows[0].id,
            article: data.rows[0].article,
            createdOn: data.rows[0].created_on
          }
        });
      }
    } catch (error) {
      if (error) {
        res.status(400).json({
          status: 'error',
          error: error.message
        })
      }
    }
  }
}

export default Article;