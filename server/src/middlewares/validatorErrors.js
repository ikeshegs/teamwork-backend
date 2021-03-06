import { validationResult } from 'express-validator';

const customValidator = (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    
    const error = errors.array();
    return { error: error[0].msg };
  }
  return { };
};

export default customValidator;