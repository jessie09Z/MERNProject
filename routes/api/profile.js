import express, { Router } from "express";
import auth from "../../middleware/auth.js";
import request from "request";
import config from "config";
import Profile from "../../models/Profile.js";
import User from "../../models/User.js";
import { check, validationResult } from "express-validator";
const router =Router();
import cors from "cors";



//@route   GET api/profile/me
//@desc    Get current user's profile
//@access  private


router.get("/me",auth, async (req, res)=>{

    try{
        const profile = await Profile.findOne({
            user:req.user.id
        }).populate('user',['name', 'avatar']);

        if(!profile){
            return res.status(401).json({msg: "there is no profile for this user"});
        }
        res.json(profile);
        console.log(profile, "profile information");
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }

})

//@route  Post api/profile/
//@desc    create or update current user's profile
//@access  private
router.post("/",[auth,
    [check('status','status is required').not().isEmpty(),
        check('skills', 'skills is required').not().isEmpty()
    ]
 ], async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
return res.status(401).json({errors:errors.array()});
    }

     // destructure the request
     const {
        website,
        company,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        status,
        githubusername,
        // spread the rest of the fields we don't need to check
        bio,
      } = req.body;
      //build profile object
      const profileFields ={};
      profileFields.user=req.user.id;
      if(company) profileFields.company=company;
      if(website) profileFields.website=website;
      if(bio) profileFields.bio=bio;
      if(status) profileFields.status=status;
      if(githubusername) profileFields.githubusername=githubusername;
      if (skills){
        profileFields.skills =skills.split(",").map(skill=>skill.trim());
        console.log(profileFields.skills);

      }

         // Build socialFields object
    profileFields.social = { youtube, twitter, instagram, linkedin, facebook };
    if(youtube) profileFields.social.youtube=youtube;
    if(twitter) profileFields.social.twitter=twitter;
    if(facebook) profileFields.social.facebook=facebook;
    if(linkedin) profileFields.social.linkedin=linkedin;
    if(instagram) profileFields.social.instagram=instagram;



 try{
    let profile=await Profile.findOne({user: req.user.id});
    //update
    if(profile){
        profile=await(
            Profile.findOneAndUpdate({user: req.user.id},
                {$set : profileFields},
                {new: true}
            )
        );
        return res.json(profile);
    }
    profile=new Profile(profileFields);
    await profile.save();
    res.json(profile);


 }
 catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');

 }
})

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
    try {
      const profiles = await Profile.find().populate('user', ['name', 'avatar']);
      console.log(profiles);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // @route    GET api/profile/user/:user_id
// @desc     Get  profile by user id
// @access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
      const profile = await Profile.findOne({user:req.params.user_id}).populate('user', ['name', 'avatar']);
      if(!profile) return res.status(400).json({msg:"User not have profile"});
      console.log(profile);
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if(err.kind == "ObjectId"){ return res.status(400).json({msg:"User not have profile"});}
      res.status(500).send('Server Error');
    }
  });
  

  // @route    Delete api/profile
// @desc     Delete profile, user, posts
// @access   Private
router.delete('/',auth,  async (req, res) => {
    try {
       await Profile.findOneAndDelete({user:req.user.id});
       await User.findOneAndDelete({_id:req.user.id});
      
      res.json({msg: "user removerd"});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


   // @route   put api/profile/experience
// @desc     Add profile experience
// @access   Private

router.put("/experience",[auth, 
    [check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty(),


    ]
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})

    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }=req.body;

    const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
      const profile= await Profile.findOne({user:req.user.id });
      profile.experience.unshift(newExperience);

      await profile.save();
      res.status(200).json(profile);


    }catch(err){
        console.error(err.message);
        res.status(500).send("Server side error");
    }

})

  // @route   delete api/profile/experience/:exp_id
// @desc    delete profile experience
// @access   Private

router.delete("/experience/:exp_id", auth, async (req, res)=>{

   
    try {
        const profile= await Profile.findOne({user:req.user.id });
        //get remove index
        const removeIndex = profile.experience.map(item =>item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex,1);
  
        await profile.save();
        res.status(200).json(profile);
  
  
      }catch(err){
          console.error(err.message);
          res.status(500).send("Server side error");
      }
  


})


   // @route   put api/profile/education
// @desc     Add profile education
// @access   Private

router.put("/education",[auth, 
    [check('school', 'school is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field of study is required').not().isEmpty(),
        check('from', 'From is required').not().isEmpty(),


    ]
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})

    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description

    }=req.body;

    const newEducation = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
      const profile= await Profile.findOne({user:req.user.id });
      profile.education.unshift(newEducation);

      await profile.save();
      res.status(200).json(profile);


    }catch(err){
        console.error(err.message);
        res.status(500).send("Server side error");
    }

})

  // @route   delete api/profile/education/:ed_id
// @desc    delete profile edcation
// @access   Private

router.delete("/education/:exp_id", auth, async (req, res)=>{

   
    try {
        const profile= await Profile.findOne({user:req.user.id });
        //get remove index
        const removeIndex = profile.education.map(item =>item.id).indexOf(req.params.ed_id);

        profile.education.splice(removeIndex,1);
  
        await profile.save();
        res.status(200).json(profile);
  
  
      }catch(err){
          console.error(err.message);
          res.status(500).send("Server side error");
      }
  


})
  // @route   get api/profile/github/:username
// @desc    get user repos from github 
// @access   Public

/*router.get('/github/:username', async (req, res) => {
    try {
      const uri = encodeURI(
        `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
      );
      const headers = {
        'user-agent': 'node.js',
        Authorization: `token ${config.get('githubToken')}`
      };
  
      const gitHubResponse = await axios.get(uri, { headers });
      return res.json(gitHubResponse.data);
    } catch (err) {
      console.error(err.message);
      return res.status(404).json({ msg: 'No Github profile found' });
    }
  });*/


export default router;