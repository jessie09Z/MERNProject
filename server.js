import express from "express";
import connectDB from "./config/db.js";
import userRoute from './routes/api/users.js'
import profileRoute from './routes/api/profile.js'
import postsRoute from './routes/api/posts.js'
import authRoute from './routes/api/auth.js'
const app = express();

//connect to db
connectDB().then(() => {
    console.log("✅ MongoDB Connected...");
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
});
//init middleware
app.use(express.json({extended:false}));

app.get('/', (req, res)=>{
    res.send("API RUNNING");

})

//Define routers
app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);

const PORT = process.env.PORT || 5000;



app.listen( PORT, ()=> console.log(`Server started on port ${PORT}`));
