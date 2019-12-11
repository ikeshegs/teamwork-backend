import express from 'express';

import {
  emailCheck,
  firstnameCheck,
  lastnameCheck,
  passwordCheck,
  jobRoleCheck,
  genderCheck,
  addressCheck,
  departmentCheck,
  confirmPasswordCheck
} from '../middlewares/validators/userValidator';

// Controllers
import User from '../controller/user';

const user = express.Router();

user.post('api/v1/auth/create-user', [emailCheck, firstnameCheck, lastnameCheck, passwordCheck, confirmPasswordCheck, jobRoleCheck, departmentCheck, genderCheck, addressCheck], User.createUser)

export default user;