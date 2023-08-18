const pg = require("../config/db");

const postProfile = async (data) => {
  const {
    id_worker,
    position,
    domicile,
    company_work,
    job_desc,
    photo_worker,
  } = data;
  console.log(data);
  console.log("model postProfile");
  return new Promise((resolve, reject) =>
    pg.query(
      `INSERT INTO workers_profile (id_worker,position,domicile,company_work,job_desc,photo_worker) VALUES('${id_worker}','${position}', '${domicile}', '${company_work}', '${job_desc}', '${photo_worker}')`, 
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

module.exports = {
  postProfile,
};
