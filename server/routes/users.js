const router = require('express').Router();
const User = require('../models/User');
const verify = require('../verifyToken');

const CryptoJS = require('crypto-js');


//UPDATE...
router.put('/:id' ,verify, async(req,res)=>{
    console.log("Update method...");
    // fristly we verify the json webToken is valid or not for this we make a verify method in root...

    if(req.user.id === req.params.id || req.user.isAdmin){
        // if(req.body.password){
        //     req.body.password =  CryptoJS.AES.encrypt( req.body.password , process.env.SECRET_KEY)
        // }

        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id , {
                $set: req.body
            } , {new:true});

            res.status(200).json(updatedUser);
        }catch(e){
            res.status(500).json(e);
        }

    } else{
        res.status(403).json("You can Only Update your Account");
    }

});

//DELETE...
router.delete('/:id' ,verify, async(req,res)=>{
    console.log("Delete method...");
    // fristly we verify the json webToken is valid or not for this we make a verify method in root...

    if(req.user.id === req.params.id || req.user.isAdmin){
        

        try{
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json("User has been deleted.");
        }catch(e){
            res.status(500).json(e);
        }

    } else{
        res.status(403).json("You can Only delete your Account");
    }

});

//GET USER..
router.get('/find/:id' , async(req,res)=>{
        try{
            const user = await User.findById(req.params.id);
            const {password , ...info} = user._doc;

            res.status(200).json(info);
        }catch(e){
            res.status(500).json(e);
        }
});



// GET ALL USER...
router.get('/', verify , async(req,res)=>{
    console.log("Get All User method...");
    const query = req.query.new;

    if(req.user.isAdmin){
        try{
            const users = query ? await User.find().sort({_id:-1}).limit(10) : await User.find();

            res.status(200).json(users);
        }catch(e){
            res.status(500).json(e);
        }

    } else{
        res.status(403).json("You are not allowed ! ");
    }

});

module.exports = router