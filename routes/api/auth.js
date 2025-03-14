import express, { Router } from "express";
import auth from "../../middleware/auth.js";
import User from "../../models/User.js";

const router =Router();



//@route   GET api/auth
//@desc    Test route
//@access  private


router.get("/",auth, async (req, res)=>{

   try{

    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
   }
   catch(err){
    console.log(err);
    res.status(500).json({msg: "server error"});

   }

})


export default router;