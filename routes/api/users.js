import express, { Router } from "express";
import User from "../../models/User.js";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";

const router = Router();

//@route   GET api/users
//@desc    Test route
//@access  public
router.get("/", (req, res) => {
    res.send("User route");
});

//@route   POST api/users
//@desc    User register
//@access  public
router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("password", "Please enter a password longer than 6 characters").isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, password, email } = req.body;

        try {
            // Check if user already exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "User already exists" }] });
            }

            // Get users gravatar
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm",
            });

            user = new User({
                name,
                email,
                avatar,
                password,
            });

            // Encrypt password using bcrypt
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Save the user to the database
            await user.save();
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

            // Return success message (consider sending a JWT token here as well)
            res.status(201).json({ msg: "User registered successfully" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

export default router;