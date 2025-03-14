import express, { Router } from "express";

const router =Router();



//@route   GET api/auth
//@desc    Test route
//@access  public


router.get("/", (req, res)=>{

    res.send("auth route");

})


export default router;