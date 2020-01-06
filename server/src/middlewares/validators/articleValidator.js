import {
  check
} from 'express-validator';

const titleCheck = check('title')
  .exists()
  .withMessage('Title Field is missing')
  .isString()
  .withMessage('Title must be Alphabets')
  .trim()
  .withMessage('Title field cannot be blank')

const articleCheck = check('article')
  .exists()
  .withMessage('Article field is blank')
  .trim()
  .withMessage('Article cannot be blank')
  .isString()
  .withMessage('Article should be a string')

export {
  titleCheck,
  articleCheck
}