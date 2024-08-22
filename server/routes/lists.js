const router = require('express').Router();
const List = require('../models/List');
const verify = require('../verifyToken');


//LIST CREATOR METHOD...
router.post('/', verify , async(req,res)=>{
    console.log("List Creation Method...");

    if(req.user.isAdmin){
        const newList = new List(req.body);
        try {
            const savedList = await newList.save();
            res.status(200).json(savedList);
        } catch (error) {
            res.status.json(error);
        }
    } else{
        res.status(403).json("You Don't have permision to create list");
    }
});


//delete ...
router.delete('/:id', verify, async(req,res)=>{
    console.log("Delete Method...");
    if(req.user.isAdmin){
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).jaon("List has been deleted");
        } catch (error) {
            res.status(500).json("System error while deleting list : ",error);
        }
    } else{
        res.status(403).json("You don't have permission to delete the list");
    }
});


//list getting...
router.get('/', verify, async(req,res)=>{
    const typeQuery = req.query.type;
    const generQuery = req.query.gener;
    console.log(typeQuery , generQuery);
    let list = [];
    try {

        if(typeQuery){
            if(generQuery){
                list = await List.aggregate([
                    {$sample: {size: 10}},
                    {$match: { type: typeQuery , gener: generQuery }}
                ]);
            } else{
                list = await List.aggregate([
                    {$sample: {size: 10}},
                    {$match: {type: typeQuery}}
                ])
            }
        } else{
            list = await List.aggregate([
                {$sample: {size: 10}}
            ]);
        }
        
        list.length > 0 ? res.status(200).json(list) : res.status(404).json("You don't have any movie in "+generQuery+" gener");

    } catch (error) {
        res.status(500).json("Some error while getting list : "+error);
    }
});

module.exports = router;