const {login,register, changeData} = require("../controller/authController")
const express = require('express')
const { Protect } = require("../middleware/protect")
const router = express.Router()

router.post('/login',login)
router.post('/register',register)
router.put('/changepassword',Protect,changeData)

module.exports = router;