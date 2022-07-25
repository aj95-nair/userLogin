const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { userlogin }= require('../utils/auth');
const User = require("../models/user");

router.post("/user-login", async (req, res) => {
  await userlogin(req.body, res);
});




module.exports = router;