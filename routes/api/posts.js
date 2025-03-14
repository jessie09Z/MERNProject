import express, { Router } from "express";

const router =Router();



//@route   GET api/posts
//@desc    Test route
//@access  public


router.get("/", (req, res)=>{

    res.send("posts route");

})


export default router;