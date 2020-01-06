import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

import db from '../database';
import auth from '../utils/auth';
import customValidator from '../middlewares/validatorErrors';

const salt = bcrypt.genSaltSync(12);

const User = {

  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object}
   */

  async createUser(req, res) {
    const validator = customValidator(req);

    if (validator.error) {
      return res.status(404).json({
        status: 404,
        error: validator.error
      });
    }

    const {
      email,
      firstName,
      lastName,
      address,
      gender,
      jobRole,
      department,
      password
    } = req.body;

    const hash = await bcrypt.hashSync(password, salt, (err, result) => {
      if (err) {
        return err;
      }
      return result;
    });

    const text = `INSERT INTO
      users(id, email, first_name, last_name, password, gender, address, job_role, department, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      returning *`;
    const values = [
      uuidv4(),
      email,
      firstName,
      lastName,
      hash,
      gender,
      address,
      jobRole,
      department,
      moment(),
      moment()
    ];

    try {
      const data = await db.query(text, values);
      if (data) {
        const token = auth.createToken(data.rows[0]);
        return res.status(201).json({
          status: "success",
          data: {
            message: "User account successfully created",
            token,
            userId: data.rows[0].id,
            email: data.rows[0].email,
            firstName: data.rows[0].first_name,
            lastName: data.rows[0].last_name,
            password: data.rows[0].password,
            gender: data.rows[0].gender,
            jobRole: data.rows[0].job_role,
            address: data.rows[0].address,
            department: data.rows[0].department
          }
        });
      }
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        res.status(409).json({
          status: 'unique error',
          error: 'Email already exists'
        });
        return;
      }

      if (error) {
        res.status(400).json({
          status: 'error',
          error: error.message
        })
      }
    }
  },

  /**
   * Signin A User
   * @param {object} req 
   * @param {object} res
   * @returns {object}
   */

  async signinUser(req, res) {
    const validator = customValidator(req);

    if (validator.error) {
      return res.status(404).json({
        status: 404,
        error: validator.error
      });
    }

    const {
      email,
      password
    } = req.body;

    const text = `SELECT id, email, password FROM users WHERE email = $1`;
    const values = [email];

    try {
      const data = await db.query(text, values);
      if (data) {

        const comparedPassword = bcrypt.compareSync(
          password,
          data.rows[0].password
        );

        if (!comparedPassword) {
          return res.status(401).json({
            status: 'error',
            message: 'Wrong Password'
          })
        }

        const token = auth.createToken(data.rows[0]);
        return res.status(200).json({
          status: "success",
          data: {
            message: "Successful",
            token,
            userId: data.rows[0].id,
            email: data.rows[0].email,
            password: data.rows[0].password,
          }
        });
      }
    } catch (error) {
      if (error) {
        res.status(404).json({
          status: 'error',
          message: 'User Not Found'
        })
      }
    }
  }
}

export default User;