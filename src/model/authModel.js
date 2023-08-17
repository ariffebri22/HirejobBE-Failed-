const pg = require("../config/db");

const getUserByEmail = async (email) => {
  console.log("model getUserByEmail");
  return new Promise((resolve, reject) =>
    pg.query(`SELECT * FROM workers WHERE email='${email}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  );
};

const createUser = async (data) => {
  let { username, email, phone, password } = data;
  console.log("model createUser");
  return new Promise((resolve, reject) =>
    pg.query(
      `INSERT INTO workers (username, email, phone, password) VALUES('${username}','${email}','${phone}','${password}')`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    )
  );
};

const changePassword = async (email, data) => {
  const { password } = data;
  console.log(data);
  console.log("model changePassword");
  return new Promise((resolve, reject) =>
    pg.query(
      `UPDATE workers SET password='${password}' WHERE workers.email= '${email}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    )
  );
};

module.exports = { getUserByEmail, createUser, changePassword };
