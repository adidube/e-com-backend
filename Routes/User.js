const express=require('express');
const userController =require('../Controller/userController.js');
const  Auth = require('../Middleware/Auth');

const router = express.Router();

// register user

router.post('/register',userController.register) //=> /api/user/register

router.post('/login',userController.login)

router.get('/users',userController.users)
// get user profile
router.get("/profile", Auth.Authenticated, userController.profile);

module.exports=router;