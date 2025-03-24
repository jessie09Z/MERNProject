import express, { Router } from "express";
import auth from "../../middleware/auth.js";
import { check , validationResult} from "express-validator";
import User from "../../models/User.js";
import Profile from "../../models/Profile.js";
import Post from "../../models/Post.js";



const router =Router();



//@route   Post api/posts
//@desc    Create a post
//@access  private


router.post("/", [auth,
    check("text", "text is required").not().isEmpty(),

], async (req, res)=>{
    
        const errors=validationResult(req);
        if(!errors.isEmpty()){
       
            return res.status(400).json({errors:errors.array()});
        }
  
    try {
        const user= await User.findById(req.user.id).select("-password");
        

        const newPost = new Post({
            text: req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id,

        });
        const post = await newPost.save();

       return res.json(post);
    } catch (err) {
        console.error(err.message);
     return  res.status(500).send('Server Error');
    }

    res.send("posts route");

})


//@route   get api/posts
//@desc    get posts
//@access  private


router.get("/", auth, async(req,res)=>{

    try {
        const posts = await Post.find().sort({date:-1});
        res.json(posts);
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


//@route   get api/posts/:post_id
//@desc    get post by id
//@access  private

router.get("/:post_id", auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({msg: "No post"});
        }
        res.send(post);

    } catch (err) {
        console.error(err.message);
        if(err.kind=="ObjectId"){
            res.status(400).json({msg: "No post"});
        }
        res.status(500).send('Server Error');
    }
})



//@route   delete api/posts/:post_id
//@desc    delete post by id
//@access  private

router.delete("/:post_id", auth, async (req, res)=>{
    try{
    const post=  await Post.findById(req.params.post_id);
     //check user
     if(post.user.toString() !== req.user.id){
        return res.status(401).json({msg:"User not authorized"});}
    
        await post.remove();
    res.send("post deleted");
    
       } 

     catch (err) {
        console.error(err.message);
        if(err.kind=="ObjectId"){
            res.status(400).json({msg: "No post"});
        }
        res.status(500).send('Server Error');
    }
})

//@route   put api/posts/like/:post_id
//@desc    Like a post
//@access  private
router.put("/like/:id",auth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        console.log(post);
        //check if the post has already been liked by the user
        if(post.likes.filter(like=>like.user.toString() == req.user.id).length>0){
            return res.status(400).json({msg:"Already liked by user"});
        }
        post.likes.unshift({user:req.user.id});
       await post.save();
       res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

//@route   put api/posts/unlike/:post_id
//@desc    unLike a post
//@access  private
router.put("/unlike/:id", auth,
    async(req, res)=>{
        try {
            // first step try to find if current user liked the post
             const post =await Post.findById(req.params.id);
             console.log(post, "try to find post by id");
             if(post.likes.filter(like=>like.user.toString()=== req.user.id).length===0){
                
                res.status(400).json({msg:"Current user didn't liked the post before"});}
               
             const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
             post.likes.splice(removeIndex,1);
             await post.save();
             return res.send("unlike the post");
            
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
            
        }

})

//@route   Post api/posts/comments/:id
//@desc    Create a comment for a specific post
//@access  private


router.post("/comments/:id", [auth,
    check("text", "text is required").not().isEmpty(),

], async (req, res)=>{
    
        const errors=validationResult(req);
        if(!errors.isEmpty()){
       
            return res.status(400).json({errors:errors.array()});
        }
  
    try {
        const user= await User.findById(req.user.id).select("-password");
        console.log(user);
        // check if post exist
        const post = await Post.findById(req.params.id);
        console.log(post);
        if(!post){
            return res.status(401).json({msg: "current post does not exist"});
        }

        

        const comment = {    text: req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id}
            console.log(comment);

        
        post.comments.unshift(comment);
         await post.save();

       return res.json(post);
    } catch (err) {
        console.error(err.message);
     return  res.status(500).send('Server Error');
    }

    res.send("posts route");

})

//@route   delete api/posts/comments/:id
//@desc    delete a comment for a specific post
//@access  private


router.delete("/comments/:post_id/:comment_id", auth,async (req, res)=>{
    
    try {
    const post= await Post.findById(req.params.post_id);
    console.log(post);
    if(!post){
        return res.status(400).json({msg:"Unable to find the post"});
    }    
    //find comment
    console.log("Received comment_id:", req.params.comment_id);
    const comment = post.comments.find(comment=> comment._id.toString()===req.params.comment_id);
    console.log(comment);
    if(!comment){
        return  res.status(404).send('unable to find the comment');
    }
    if(comment.user.toString()!==req.user.id){
        return  res.status(401).send('unable to delete the comment, not written by the user');

    }
    const commentIndex= post.comments.map(comment=>comment.id).indexOf(req.params.comment_id);
    post.comments.splice(commentIndex,1);
    await post.save();
    res.send(post);
        
    } catch (error) {
        console.error(error.message);
        return  res.status(500).send('Server Error');
        
    }
     

})


export default router;