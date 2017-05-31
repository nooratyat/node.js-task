var express = require('express');
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.update({accessKeyId: 'AKIAIOABQ2NDVGQTIYOQ', secretAccessKey: '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'});
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



app.listen(port, function() {
  console.log(`app running on port ${port}`);
});


