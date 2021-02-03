const fs = require("fs");
const superagent = require('superagent');

const readfile = file=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(file,(err,data)=>{
            if(err) reject('not found');
            resolve(data);
        })
    })
}
const writefile = (file,data)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file,data,err=>{
            if(err)reject('not write it');
            resolve('success');
        })
    })
}

readfile('dog.txt').then(data=>{
    console.log('breed : ' + data);
    return superagent.get(`https://dog.ceo/api/breeds/image/random`)}).then(res=>{
        
        fs.writeFile('dog-img.txt',res.body.message,(err)=>{
               console.log("file saved");    

    })
    
    }).catch(err=>{
        console.log(res.body.message);
    })

