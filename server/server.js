//Imports

const express= require("express")
const cors= require("cors")

const app=express()
const port=5000;



app.listen(port, ()=>{console.log(`Listening to port ${port}`)})