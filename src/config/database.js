const mongoose = require('mongoose');

const connectDb = async()=>{
 
        await mongoose.connect("mongodb+srv://gunheerahuja:cqu7ItVo7fYd7qVG@cluster0.i4fvt.mongodb.net/devtinder");

        
}
module.exports = connectDb;