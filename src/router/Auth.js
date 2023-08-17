const {login,register,verify} = require("../controller/AuthController")
const express = require('express');
const { Router } = require("express");
const router = express.Router()

router.post('/login',login)
router.post('/register',register)

//email
// router.get('/verify/:id',verify)

module.exports = router;