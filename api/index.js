const express = require("express");
const axios = require("axios")
const url = require('url');
const { request } = require("http");
require('dotenv').config();
const app = express();
app.use(express.json());
app.set('trust proxy',true);

app.get("/api", (req, res) => res.send("Express on Vercel"));


app.get("/api/hello",async(req,res)=>{
    let urlObject = url.parse(req.url,true);
    const urlQuery = urlObject.query
    
    const name = urlQuery.visitor_name;

    res.send(name)

})



app.listen(8500,()=>console.log('server runing on port 8500'));
module.exports = app;