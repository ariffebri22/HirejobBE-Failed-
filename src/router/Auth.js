const {login,register,/*verify,*/ changeData} = require("../controller/AuthController")
const express = require('express');
const { Router } = require("express");
const { Protect } = require("../middleware/Protect")
const router = express.Router()

router.post('/login',login)
router.post('/register',register)
router.put('/changepassword',Protect,changeData)

//email
// router.get('/verify/:id',verify)

module.exports = router;