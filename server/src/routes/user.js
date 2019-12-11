import express from 'express';

import {
  emailCheck,
  firstNameCheck,
  lastNameCheck,
  passwordCheck,
  jobRoleCheck,
  genderCheck,
  addressCheck,
  departmentCheck,
  confirmPasswordCheck
} from '../middlewares/validators/userValidator';

// Controllers
import User from '../controller/user';

const userRoute = express.Router();

userRoute.post(
  '/api/v1/auth/create-user', 
  [emailCheck, firstNameCheck, lastNameCheck, passwordCheck, confirmPasswordCheck, jobRoleCheck, departmentCheck, genderCheck, addressCheck], 
  User.createUser
);

userRoute.post('/api/v1/auth/signin', [emailCheck, passwordCheck], User.signinUser)

export default userRoute;