import multer from 'multer'

import db from '../database';
import customValidator from '../middlewares/validators/validatorErrors';
import cloudinary from '../utils/cloudinaryConfig';

const Gif = {
  async postGif(req, res) {
    const validator = customValidator(req);

    if (validator.error) {
      return res.status(404).json({
        status: 404,
        error: validator.error
      });
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        if (file.mimetype === 'image/gif') {
          cb(null, './files/images/');
        } else {
          cb({
            message: 'This file is not a gif file'
          }, false)
        }
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    })
    const upload = multer({
      storage
    });
  }
}

export default Gif;