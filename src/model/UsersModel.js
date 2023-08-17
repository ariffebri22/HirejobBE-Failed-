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


module.exports =  {createUser,getUsersByEmail}