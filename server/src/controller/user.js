import bcrypt from 'bcryptjs';
import uuidv4 from 'uuid/v4';
import moment from 'moment';

import db from '../database';
import auth from '../utils/auth';

const salt = bcrypt.genSaltSync(12);

class User {
  /**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */

  async createUser(req, res) {
    const {
      email, firstName, lastName, address, gender, jobRole, department, password 
    } = req.body;

    const hash = bcrypt.hashSync(password, salt, (err, result) => {
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
      moment().format('MMMM Do YYYY, h:mm:ss a'),
      moment().format('MMMM Do YYYY, h:mm:ss a')
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
            userId: data.rows[0].id
          }
        });
      }
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        res.status(409).json({
          status: 'error',
          error: 'Email already exists'
        });
      }
    }
  }
}

export default User;