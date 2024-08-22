const router = require('express').Router();
const verify = require('../verifyToken');
const Movie = require('../models/Movie');
const path = require('path');
const sessionStorage = require('sessionstorage-for-nodejs');
const fs = require('fs');
const { response } = require('express');
let userNewId;
// const videoPath = path.join(__dirname, "../uploads", "1713364010403-y2mate.com - Lamborghini Aventador SVJ Flyby Blu Glauco_1080p.mp4");

// const folderName = '/Users/joe/met';

// we want to user id here ..

//addInMovies method ..
async function addInMovies(title , addInMoviesId){
    try {
        //Movies Object ..
        const newMovies = Movie({
            title,
            addInMoviesId
        });
         const movie = await newMovies.save();
         return "Uploaded";
    } catch (error) {
        console.log(error + " : Error while saving video information on databse ..");
    } 
}

//route for anime uploading...
router.post('/random', async (req, res) => {
    try {
        const title = req.body.title;
        const filename = Date.now() + "-" + req.files.screenshot.name;
        const file = req.files.screenshot;

        
        const uploadPath = path.join(__dirname, "../uploads", filename); // Use path.join for cross-platform compatibility
        // createFolder();
        await file.mv(uploadPath); // Asynchronous file move
        console.log(uploadPath + "This is path for uploading" + title);
        
        // updating video imformation on movies object ..
        
        //userId for saving videos information on movies schema..
        userNewId = sessionStorage.getItem("userId");
        addInMovies(title , userNewId)
            .then( response => console.log(response))
            .catch( error => console.log(error));

        console.log(userNewId, "Aaya yar ");

        res.status(200).json({ uploadPath: `${filename}` });
    } catch (err) {
        console.error("Error during file upload:", err);
        res.status(500).send("Internal Server Error");
    }
});


router.get("/:filename", async (req, res) => {
    const range = req.headers.range;
    console.log("Request haścome here !");
    if (!range) {
        return res.status(400).send("Requires Range header");
    }

    try {
        const filename = req.params.filename; // Extract filename from URL
        const uploadPath = path.join(__dirname, "../uploads", filename);

        const fileData = await fs.promises.stat(uploadPath);
        const videoSize = fileData.size;

        // Correctly split the range header
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        // Correct content length calculation
        const contentLength = end - start + 1;

        // Correct response headers
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(uploadPath, { start, end });
        videoStream.pipe(res);
    } catch (error) {
        console.error("Error during video streaming:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;