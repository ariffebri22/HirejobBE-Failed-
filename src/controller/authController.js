const {
  getUserByEmail,
  createUser,
  changePassword, activatedUser
} = require("../model/authModel");
const argon2 = require("argon2");
const { GenerateToken } = require("../helper/generateToken");
const { v4: uuidv4 } = require("uuid");
const Email = require("./../middleware/email");

const AuthController = {
  register: async (req, res, next) => {
    let { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(404).json({
        status: 404,
        message: "input correctly, please",
      });
    }

    let user = await getUserByEmail(email);

    if (user.rows[0]) {
      return res.status(404).json({
        status: 404,
        message: "Email is already registered",
      });
    }

    //email
    let uuid = uuidv4();
    console.log("uuid", uuid);
    //

    password = await argon2.hash(password);

    let dataUser = {
      username,
      email,
      phone,
      password, uuid,
    };

    let data = await createUser(dataUser);
    console.log("create");
    console.log(data);


    if (!data.rowCount == 1) {
      return res.status(404).json({ status: 404, message: "register failed" });
    }

    //email
    let url = `${process.env.BASE_URL}/auth/verify/${uuid}`;
    let sendEmail = Email(email, url, username);

    console.log("sendEmail", sendEmail);
    console.log(sendEmail);
    //

    return res.status(200).json({ "status": 200, "message": "register user berhasil,silahkan verifikasi Email" })
  },
  verify: async (req, res, next) => {
    const { id } = req.params;
    let result = await activatedUser(id);
    console.log("result");
    console.log(result);
    if (result) {
      return res.status(200).json({ status: 200, message: "verify success silakan login" });
    }
    return res.status(404).json({ status: 404, message: "verify gagal harap coba lagi" });
  },

  login: async (req, res, next) => {
    let { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(404).json({
        status: 404,
        message: "input correctly, please",
      });
    }

    let data = await getUserByEmail(email);
    console.log(data.rows[0]);

    if (!data.rows[0]) {
      return res
        .status(404)
        .json({ status: 404, message: "Email is not yet registered" });
    }

    let users = data.rows[0];
    console.log("users.password");
    console.log(users.password);
    let verify = await argon2.verify(users.password, password);
    if (!verify) {
      return res.status(404).json({ status: 404, message: "Invalid password" });
    }
    delete users.password;
    let token = GenerateToken(users);
    users.token = token;

    if (!users.is_active) {
      return res
        .status(404)
        .json({ status: 494, message: "email belum diaktivasi" });
    }

    res
      .status(200)
      .json({ status: 200, message: "get data profile success", users });
  },

  changeData: async (req, res, next) => {
    let { password } = req.body;
    console.log("req.body");
    console.log(req.body);

    let email = req.payload.email;
    let dataWorkerId = await getUserByEmail(email);

    console.log("put data");
    console.log(dataWorkerId.rows[0]);

    password = await argon2.hash(password);

    let data = {
      password: password || dataWorkerId.rows[0].password,
    };

    let result = await changePassword(email, data);
    console.log(result);
    return res
      .status(200)
      .json({
        status: 200,
        message: "update data worker success",
        data,
        result,
      });
  }
};

module.exports = AuthController;