const express = require('express');

const app = express();


app.use((req,res) => {
    res.send('Welcome');
});
app.listen(2777,()=>{
    console.log('Server started on port 2777');
});