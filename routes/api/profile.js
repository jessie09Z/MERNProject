import express, { Router } from "express";

const router =Router();



//@route   GET api/profile
//@desc    Test route
//@access  public


router.get("/", (req, res)=>{

    res.send("profile route");

})


export default router;