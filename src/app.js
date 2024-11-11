const express = require('express');

const app = express();
//the sequence of routes that will be executed when the application is started with express app 

app.use((req,res) => {
    res.send('Welcome');
});

app.use("/hello",(req, res) => {
    res.send('Hello World');
});


app.use("/",(req, res) => {
    res.send('About Us');
});
app.listen(2777,()=>{
    console.log('Server started on port 2777');
});