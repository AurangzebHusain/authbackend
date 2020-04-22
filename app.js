const express=require("express");
require('dotenv').config();
const bodyParser=require("body-parser");

const authRoutes=require("./routes/auth");
const app=express();
const PORT=process.env.PORT;
const DBURI=process.env.DBURI;
const mongoose=require('mongoose');

mongoose.connect(DBURI,{useNewUrlParser:true,
useUnifiedTopology:true,
useCreateIndex:true},
()=>{
    console.log("DB CONNECTED")
}
)

app.use(bodyParser.json());
app.use("/api",authRoutes);
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})