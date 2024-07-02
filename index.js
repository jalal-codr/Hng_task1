const express = require("express");
const axios = require("axios")
require('dotenv').config();
const app = express();
app.use(express.json());



app.get("/api/hello/:name",async(req,res)=>{
    const name = req.params.name
    let clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    const url = `https://ipinfo.io/${clientIp}?token=${process.env.Token}`;
    try{
        const response = await axios.get(url)
        data = {
            client_ip:response.data.ip,
            location:response.data.city,
            gretting:`hello ${name} the temperature is 11 deggress celcius in ${response.data.city}`
        }
        res.send(data);
        
    }
    catch(err){
        res.send(err)
    } 
})



app.listen(8500,()=>console.log('server runing on port 8500'));