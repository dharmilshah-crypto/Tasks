const express = require('express');
const app = express();

app.get('/',(req,res)=>{
res.status(200).json({message : 'helo from serevr',
app : 'natours'}); 
})

app.post('/',(req,res)  => {
res.send('post');
})

const port = 3000;
app.listen(port,()=>{
    console.log('listening to port '+ port);
})