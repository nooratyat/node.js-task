var express = require('express');
var fs = require('fs');
var AWS = require('aws-sdk');
 var s3 = require('s3');
//commit this for security issue  
// AWS.config.update({accessKeyId:'AKIAICM7D3TQOUAI6SLQ', secretAccessKey: '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'});
var s3Stream = require('./node_modules/s3-upload-stream/lib/s3-upload-stream.js')(new AWS.S3());

var multiparty = require('connect-multiparty');
var multipartMiddleware = multiparty();

app = express();

var port = process.env.API_PORT || 2000;

var server = require("http").createServer(app);
app.use(multipartMiddleware);




app.get('/', function(req, res) {
  res.sendFile(path.resolve('client/index.html'));
});

app.post('/upload',function(req,res){
  var file = req.files.filename;
  console.log(file)
  var read = fs.createReadStream(file);
  var upload = s3Stream.upload({
    "Bucket": "myy",
    "Key": file.name
  });
  // Handle errors.
  upload.on('error', function (error) {
    console.log(error);
  });
  // Pipe the incoming filestream, and up to S3.
  read.pipe(upload);
  
  res.redirect('/')
})
 /// to download url 
var params = {Bucket: 'myy', Key: file.name, Expires: 60};
  var url = s3.getSignedUrl('getObject', params);
  console.log("get URL is", url);


app.listen(port, function() {
  console.log(`app running on port ${port}`);
});


