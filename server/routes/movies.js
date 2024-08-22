const router = require('express').Router();
const verify = require('../verifyToken');
const Movie = require('../models/Movie');
const path = require('path');

// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
//   const upload = multer({ storage: storage })
  

//     router.post("/random", upload.single("file"), (req, res) => {
//         // Handle file upload (e.g., save to MongoDB)
//         console.log("aaya");
//         console.log(req.body);
//         console.log(req.file);
//         // ...
//         res.status(200).json({ message: "File uploaded successfully!" });
//     })


//Movié Uploading Method...
router.post('/', verify , async(req,res)=>{
    //Create method...

    if(req.user.isAdmin){
        const newMovie = new Movie(req.body);
        try{
            const saveMovie = await newMovie.save();
            res.status(201).json(saveMovie);

        } catch(e){
            res.status(500).json("System Error while Movie Uoloading");
        }

    } else{
        res.status(403).json("You Are Not Admin! So You can't upload Movie or Anime.")
    }

});


//Update Method..
router.put('/:id' ,verify, async(req,res)=>{
    console.log("Movie Update Method...");
    if(req.user.isAdmin){
        try{
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id , 
                {$set: req.body}, 
                {new:true}
            );
            res.status(200).json(updatedMovie);
        } catch(e){
            res.status(500).json("Something Went Wrong while Movie uploading");
        }
    } else{
        res.status(403).json("You don't have permision to updateing these things");
    }
});


//DELETE METHOD...
router.delete('/:id' ,verify, async(req,res)=>{
    console.log("Movie Delete Method...");
    if(req.user.isAdmin){
        try{
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie has been deleted");
        } catch(e){
            res.status(500).json("Something Went Wrong while Movie deleting ");
        }
    } else{
        res.status(403).json("You don't have permision to updateing these things");
    }
});


//GET METHOD...
router.get('/find/:id', verify, async(req,res)=>{
    try{
        const yourMovie = await Movie.findById(req.params.id);
        res.status(200).json(yourMovie);
    } catch(e){
        res.status(500).json("Something went wrong!");
    }
});


//GET ANY RANDOM MOVIE OR SERIES...
router.get('/random',verify, async(req,res)=>{
    let movie;
    const type = req.query.type;
    try {

        if(type === "series"){
            movie = await Movie.aggregate([
                {$match : {isSeries:true}},
                {$sample : {size : 1}},
            ]);
        } else{
            movie = await Movie.aggregate([
                {$match : {isSeries:false}},
                {$sample : {size : 1}},
            ]);
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json("No Random Movie : " + error);
    }
});


//GET ALL MOVIES...
router.get('/', verify, async(req,res)=>{
    if(req.user.isAdmin){
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (error) {
            res.status(500).json(error);
        }
    } else{
        res.status(403).json("You don't have permission to get all movies");
    }
});


module.exports = router;