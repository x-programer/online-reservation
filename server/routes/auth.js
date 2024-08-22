const router = require('express').Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { emailSender, OTP } = require('../impMethod');
const path = require('path');
const fs = require('fs');
const sessionStorage = require('sessionstorage-for-nodejs');

let val = "default";
const authenticatedUserEmail = {
    email : val
}


//Register...
// router.post('/register', async(req,res)=>{
//     const newUser = User({
//         username : req.body.username,
//         email : req.body.email,
//         // this is password encryption and saving in databse...
//         password : CryptoJS.AES.encrypt( req.body.password , process.env.SECRET_KEY),
//     });

//     try{
//         const user = await newUser.save();
//         res.status(201).send(user);

//     } catch(e){
//         res.status(500).send(e);
//     }
// })

router.post('/register', async (req, res) => {
    console.log("Body : " + req.body);
    const { username, email, password } = req.body;

    try {
        // Hash the password using bcryptjs
        // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const newUser = User({
            username,
            email,
            password: password, // Save the hashed password in the database
        });

        const user = await newUser.save();
        // localStorage.setItem("userId" , user._id);
        sessionStorage.setItem( "userId" , user._id);
        res.status(201).send(user._id);

    } catch (error) {
        console.log(error + " : This error")
        res.status(500).send("Somethis went wrong : " + error);
    }
});

//

//Login...
router.post('/login', async (req, res) => {
    console.log("Login ");
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json("Wrong Email");
        } else {
            // emailSender(req.body.email);
            // we Should check here OTP...
        }

        // Password decryption & checking ...
        // const originalPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        // if (originalPassword.toString(CryptoJS.enc.Utf8) !== req.body.password) {
        //     return res.status(400).json("Wrong Password");
        // } 

        // JWT Token ...
        const accessToken = jwt.sign(

            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }

        )

        // removing password and sending with accesToken with spread operator...
        const { password, ...info } = user._doc;
        res.status(200).json({ ...info, accessToken });
    } catch (e) {
        res.status(500).send("Something went wrong: " + e);
    }
});

module.exports = router;