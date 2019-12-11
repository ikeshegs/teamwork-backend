import {
  check
} from 'express-validator';

const emailCheck = check('email')
  .exists()
  .withMessage('Email Field is missing')
  .isEmail()
  .withMessage('Invalid Email Format: abcd@efg.xxx')

const firstNameCheck = check('firstName')
  .exists()
  .withMessage('Firstname field is missing')
  .isLength({
    min: 3
  })
  .withMessage('Firstname field cannot be empty')
  .isString()
  .withMessage('Firstname must be Alphabets')
  .isAlpha()
  .withMessage('Firstname field cannot be blank')

const lastNameCheck = check('lastName')
  .exists()
  .withMessage('Lastname field is missing')
  .isLength({
    min: 3
  })
  .withMessage('Lastname field cannot be empty')
  .isString()
  .withMessage('Lastname must be Alphabets')
  .isAlpha()
  .withMessage('Lastname field cannot be blank')

const jobRoleCheck = check('jobRole')
  .exists()
  .withMessage('Job Role field is missing')
  .trim()
  .withMessage('Job Role cannot be empty')
  .isString()
  .withMessage('Job Role must be an alphabet')
  .isLength({
    min: 2
  })
  .withMessage('Job Role needs a minimum of 2 characters')

const departmentCheck = check('department')
  .exists()
  .withMessage('Department field is missing')
  .trim()
  .withMessage('Department cannot be empty')
  .isString()
  .withMessage('Department must be an alphabet')
  .isLength({
    min: 2
  })
  .withMessage('Department needs a minimum of 2 characters')

const addressCheck = check('address')
  .exists()
  .withMessage('Address field is missing')
  .trim()
  .withMessage('Address cannot be empty')
  .isString()
  .withMessage('Address must be a string')
  .isLength({
    min: 10
  })
  .withMessage('Address needs a minimum of 10 characters')

const genderCheck = check('gender')
  .exists()
  .withMessage('Gender field is missing')
  .trim()
  .withMessage('Gender cannot be empty')
  .isString()
  .withMessage('Gender must be a string')
  .isLength({
    min: 4
  })
  .withMessage('Gender needs a minimum of 4 characters')

const passwordCheck = check('password').exists()
  .withMessage('Password Field is missing')
  .isLength({
    min: 8,
    max: 40
  })
  .withMessage('Password must be between 8 to 40 characters')
  .not()
  .isNumeric()
  .withMessage('Password Field must contain at least one number')
  .not()
  .isAlpha()
  .withMessage('Password Field must contain at least one alphabet')

const confirmPasswordCheck = check('confirmPassword')
  .custom((value, {
    req
  }) => {
    if (value !== req.body.password) {
      throw new Error('Password does not match');
    }
    return true;
  });

export {
  emailCheck,
  firstNameCheck,
  lastNameCheck,
  genderCheck,
  jobRoleCheck,
  departmentCheck,
  addressCheck,
  passwordCheck,
  confirmPasswordCheck
};