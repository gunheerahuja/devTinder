const express = require('express');
const connectDb =  require('./config/database');
const app = express();
const User = require('./models/user');

app.use(express.json());
 app.post('/signup', async (req, res) => {
   

    const user = new User(req.body)
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
    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
 });

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