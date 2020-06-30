var express = require('express');
var fs = require('fs');
var http = require('http');
var app = express();
app.use(express.static('./dist'));
app.use(function (req, res,next) {
  res.sendfile('./dist/index.html');  //路径根据自己文件配置
});
var httpsServer = http.createServer(app);
httpsServer.listen(5001, function () {
  console.log('请访问：localhost:5001');
});