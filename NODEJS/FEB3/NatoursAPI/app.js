
const express = require('express');
const app = express();
const fs = require('fs');
const { Server } = require('http');

app.get('/',(req,res)=>{
res.status(200).json({message : 'helo from serevr',
app : 'natours'}); 
})

app.post('/',(req,res)  => {
res.send('post');
})

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

app.get('/api/v1/tours',(req,res)=>{
res.status(200).json({
    status : 'success',
    data : {
     tours
    }
})
})

app.get("/",(req,res)=>{
    console.log("hello")
})

const port = 3000;
app.listen(port,()=>{
    console.log('listening to port '+ port);
});
