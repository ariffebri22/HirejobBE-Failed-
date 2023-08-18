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
  let { username, email, phone, password,uuid } = data;
  console.log("model createUser");
  return new Promise((resolve, reject) =>
    pg.query(
      `INSERT INTO workers (username, email, phone, password,checker) VALUES('${username}','${email}','${phone}','${password}','${uuid}')`,
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

const changeData = async (email, data) => {
  const { username,password } = data;
  console.log(data);
  console.log("model changeData");
  return new Promise((resolve, reject) =>
    pg.query(
      `UPDATE workers SET username='${username}',password='${password}' WHERE workers.email= '${email}'`,
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

const activatedUser = async (uuid) => {
  console.log("model activate")
  return new Promise((resolve,reject)=>
      pg.query(`UPDATE workers SET is_active=true WHERE checker='${uuid}'`,(err,result)=>{
          if(!err){
              resolve(result)
          } else{
              reject(err)
          }
      })
  )
}

module.exports = { getUserByEmail, createUser, changeData, activatedUser };
