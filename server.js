const express = require('express');
const path = require('path');
var fs = require('fs')
var https = require('https')
const app = express();
const router = express.Router();

//route untuk halaman home
router.get('/broadcast', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'))
});

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/client.html'))
});

app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'node_modules')));

app.use('/', router)
https.createServer({
    key: fs.readFileSync(path.join(__dirname,'fake-keys', 'privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname,'fake-keys', 'certificate.pem')),
  }, app)
  .listen(3000, function () {
    console.log('Go to https://localhost:3000/')
  })