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

    const xForwardedFor = req.headers['x-forwarded-for'];
    const clientIp = xForwardedFor ? xForwardedFor.split(',')[0].trim() : req.socket.remoteAddress;
    const url1 = `https://ipinfo.io/${clientIp}?token=${process.env.Token}`;
    try{
        const response = await axios.get(url1)
        data = {
            client_ip:clientIp,
            location:response.data.city,
            greeting:`Hello, ${name}!,the temperature is 11 degrees Celcius in ${response.data.city}`
        }
        res.send(data);
        
    }
    catch(err){
        res.send(err)
    } 
})



app.listen(8500,()=>console.log('server runing on port 8500'));
module.exports = app;