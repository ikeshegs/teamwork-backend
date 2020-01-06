import {
  check
} from 'express-validator';

const titleCheck = check('title')
  .exists()
  .withMessage('Title field is missing')
  .isLength({
    min: 3
  })
  .withMessage('Title field cannot be empty')
  .isString()
  .withMessage('Title must be Alphabets')
  .isAlpha()
  .withMessage('Title field cannot be blank')

export default titleCheck;