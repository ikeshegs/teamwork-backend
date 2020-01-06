import express from 'express';
// import multer from 'multer';

import auth from '../utils/auth';

import titleCheck from '../middlewares/validators/gifValidator';

import Gif from '../controller/gif';

const gifRoute = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.mimetype === 'image/gif') {
//       cb(null, './files/images/');
//     } else {
//       cb({
//         message: 'This file is not a gif file'
//       }, false)
//     }
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// })
// const upload = multer({
//   storage
// });

gifRoute.post('/api/v1/gifs', auth.verifyToken, [titleCheck], Gif.postGif);

export default gifRoute;