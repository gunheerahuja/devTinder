const express = require('express');
const connectDb =  require('./config/database');
const app = express();
const User = require('./models/user');
const {validateSignupData} = require('./utils/validation');
const bcrypt = require('bcrypt');


app.use(express.json());
 app.post('/signup', async (req, res) => {
    try{
   //validation of data
   validateSignupData(req);
   
   const { firstName, lastName, email, password}  = req.body;
   const {password} = req.body;

   //encrypt password
   const paswordHash =  await bcrypt.hash(password,10);
   console.log(paswordHash);

   //  //creating a new instance of the user model
    const user = new User({
        firstName,
        lastName,
        email,
        password:  paswordHash,
    })
    //  //creating a new instance of the user model
    // const user = new User(
    //     {
    //         firstName: "John",
    //         lastName:"Doe",
    //         email:"johndoe@example.com",
    //         password:"password123"
    //     }
    // );

    // await user.save();
    // res.send('User registered successfully');
    
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
 });


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        
        if (!user) {
          throw new Error ('Invalid credentials');
        }
            const isPasswordValid = await bcrypt.verify(password);
            
        if (isPasswordValid) {
            res.send("login success");
        }
        else {
            throw new Error ('Invalid credentials');
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

 //get user by email
 app.get('/user/:email', async (req, res) => {
     const useremail = req.body.email;

     try{
    const users = await  User.find({ email: useremail});
    if(users.length === 0) {
         res.status(404).json({ message: 'User not found' });
    }
    else{
        res.send(users);
 
    }
    
     }
     catch(error){
         res.status(404).json({ message: error.message });
     }

 });

 //login api - POST /login - authenticate user
 //feed api -GET/feed -get all users from the database
 app.get('/feed', async (req, res) => {
   try{
    const users = await User.find({});
    res.send(users);
   }
   catch(error){
       res.status(500).json({ message: error.message });
   }
 });

 app.delete('/users', async (req, res) => {
    const userID = req.body.userID;
    try{
        const user = await User.findByIdAndDelete(userID);
        if(!user) return res.status(404).json({ message: 'User not found' });
        res.send("user deleted successfully");
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
 });

 //update user profile
 app.patch("/users/:userId",async (req, res) => {
    const userID = req.params?.userID;
    const data = req.body;

    const ALLOWED_UPDATES =["userId","photoUrl","about","gender","age","hobbies"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
         ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed) {
        throw new Error("Update not allowed");
    }
    if(data?.hobbies.length > 5) {
        throw new Error("Maximum 5 hobbies are allowed");
    }
    try{
        const user = await User.findByIdAndUpdate({_id:userID},data,{
            returnDocument: "after",
            returnValidators: true,
        });
        res.send("user updated successfully");
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
    });
//start server
connectDb()
 .then(()=>{
    console.log('Connected to MongoDB');
    app.listen(7777,()=>{
        console.log('Server started on port 7777');
    });
    //require('./models/User'); // require the User model
})
 .catch(err=>{
    console.error('Error connecting to db:',err.message);
    process.exit(1);
});

// cqu7ItVo7fYd7qVG