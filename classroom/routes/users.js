const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("GET for users");
});

//Show - users
router.get("/:id",(req,res)=>{
    res.send("GET for show  users");
});

//Post - users
router.post("/",(req,res)=>{
     res.send("Posting by user");
});

//DELETE - user
router.delete("/",(req,res)=>{
   res.send("Delete by user");
});


module.exports=router;