const express=require('express');
const axios=require("axios");
const app=express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.json());

app.post('/register',(req,ress)=>{
    console.log(req.body)
    const {companyName,ownerName,rollNo,ownerEmail,accessCode}=req.body;
   axios.post("http://104.211.219.98/train/register",{companyName,ownerName,rollNo,ownerEmail,accessCode}).then((res)=>{console.log(res.data,res.data.message);ress.send(res.data)}).catch((res)=>{console.log(res);ress.send("entered rollNo already exists")})
})

app.post('/auth',(req,ress)=>{
    console.log(req.body)
    const {companyName,clientID,clientSecret,ownerName,ownerEmail,rollNo}=req.body;
    axios.post("http://104.211.219.98/train/auth",{companyName,clientID,ownerName,ownerEmail,rollNo,clientSecret}).then((res)=>{ress.send(res.data)})
})

app.get('/trains',(req,ress)=>{
    const token = req.headers["authorization"];
    console.log(token)
    axios.get("http://104.211.219.98/train/trains",{headers: { Authorization: token }}).then((res)=>{ ress.send(res.data)})
    
})

app.get('/train/trains/:id',(req,ress)=>{
    const token = req.headers["authorization"];
    axios.get(`http://104.211.219.98/train/trains/${req.params.id}`,{headers: { Authorization: token }}).then((res)=>{ ress.send(res.data) })
    
})

app.listen(3000,()=>{
    console.log('server running')
})