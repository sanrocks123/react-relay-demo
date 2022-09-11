var express = require("express");

var app = express();
app.use(express.static('build'));

const path = require('path');

app.get('/public', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});