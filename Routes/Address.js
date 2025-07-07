const express = require("express");
const { addAddress, getAddress } = require("../Controller/addressController.js");
const  Auth = require('../Middleware/Auth');

const router = express.Router();

// add address
router.post("/add", Auth.Authenticated, addAddress);

// get address
router.get('/get',Auth.Authenticated, getAddress)

module.exports= router;
