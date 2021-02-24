const express = require('express')
const app = express()

const { google } = require('googleapis');
const stream = require('stream');
const multer = require('multer')
const upload = multer()



// const oauth2Client = '614916046170-kal46vrrrg2d9h1ubi0s2uhqadp3lait.apps.googleusercontent.com'

app.post('/upload', upload.single('Outbound.xlsx'), (req, res, next) => {
   
    // const serviceAccount = 'PATH TO SERVICE ACCOUNT';  
    let fileObject = req.file;
    let bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
      // const jWTClient = new google.auth.JWT(
      // serviceAccount.client_email,
      // null,
      // serviceAccount.private_key,
      // ['<COMMA SEPARATED SCOPES WHICH ARE AUTHORIZED>']
      // )
      google.drive({ version: 'v3'})
          .files.create({
              auth: oauth2Client/jWTClient,
              media: {
                  mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                  body: bufferStream
              },
              resource: {
                  name: 'Outbound.xlsx',
                  // if you want to store the file in the root, remove this parents
                  parents: ['folder1']
              },
              fields: 'id',
          }).then(function (resp) {
              console.log(resp,'resp');
          }).catch(function (error) {
              console.log(error);
          })
      res.send('File uploaded');
  });

  app.listen(3000,()=>{
      console.log('connected to port 3000')
  })