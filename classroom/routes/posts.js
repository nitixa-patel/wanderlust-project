const express = require("express");
const router = express.Router();

//POST
//Index - posts
router.get("/",(req,res)=>{
    res.send("GET for posts");
});

//Show - posts
router.get("/:id",(req,res)=>{
    res.send("GET for show posts");
});

//Post - posts
router.post("/",(req,res)=>{
     res.send("post of posts");
});

//DELETE - posts
router.delete("/",(req,res)=>{
   res.send("Delete post");
});


module.exports=router;