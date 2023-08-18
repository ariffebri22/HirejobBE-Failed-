const Pool = require('../config/db')

const createUser = async (data) => {
    let {username,email,password,phone,jabatan,perusahaan} = data
    console.log("model createUser")
    return new Promise((resolve,reject)=>
        Pool.query(`INSERT INTO recruiters(username,email,password,phone,jabatan,perusahaan) VALUES('${username}','${email}','${password}','${phone}','${jabatan}','${perusahaan}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}
const getUsersByEmail = async (email) => {
    console.log("model getUserByEmail")
    return new Promise((resolve,reject)=>
        Pool.query(`SELECT * FROM recruiters WHERE email='${email}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else{
                reject(err)
            }
        })
    )
}

// const activatedUser = async (uuid) => {
//     console.log("model activate")
//     return new Promise((resolve,reject)=>
//         Pool.query(`UPDATE users SET is_active=true WHERE checker='${uuid}'`,(err,result)=>{
//             if(!err){
//                 resolve(result)
//             } else{
//                 reject(err)
//             }
//         })
//     )
// }

const changePassword = async (email, data) => {
    const { password } = data;
    console.log(data);
    console.log("model changePassword");
    return new Promise((resolve, reject) =>
      Pool.query(
        `UPDATE recruiters SET password='${password}' WHERE recruiters.email= '${email}'`,
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

module.exports =  {createUser,getUsersByEmail,/*activatedUser,*/ changePassword}