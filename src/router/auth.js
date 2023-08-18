const {login,register, putData,verify} = require("../controller/authController")
const express = require('express')
const { Protect } = require("../middleware/protect")
const router = express.Router()

router.post('/login',login)
router.post('/register',register)
router.put('/changedata',Protect,putData)
router.get('/verify/:id',verify)

module.exports = router;