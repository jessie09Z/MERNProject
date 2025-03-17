import express, { Router } from "express";
import auth from "../../middleware/auth.js";
import User from "../../models/User.js";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcryptjs";

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

//@route   POST api/auth
//@desc    Authentication user and get token
//@access  public
router.post(
    "/",
    [
      
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { password, email } = req.body;

        try {
            // Check if user already exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid Email or Password" }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({ errors: [{ msg: "Invalid Email or Password" }] });
            }
        
            const paylod ={
                user:{
                    id:user.id,

                }
            };
            jwt.sign(paylod, config.get("jwtSecret"),
        {expiresIn: 360000},
    (err, token)=>{

        if(err){
            throw err;
        }
        console.log(token);
        res.json({token});
    });

 
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

export default router;