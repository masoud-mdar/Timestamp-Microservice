// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", function(req,res){
  let date = new Date().toUTCString();
  let unixFormat = Math.floor(new Date().getTime());
  res.json({unix: unixFormat, utc: date});
})

app.get("/api/timestamp/:date_string", function(req,res){
  let rawParam = req.params.date_string;
  let regex = /\d{5,}/;

  if (regex.test(rawParam)){

    let numDate = parseInt(rawParam);
    var date = new Date(numDate).toUTCString();
    if (date === "Invalid Date"){
      res.json({error: date});
    }
    var unixFormat = parseInt(rawParam);

  } else{

    let dateStr = rawParam.toString();
    let dateArr = dateStr.split("-");
    let finalDateStr = dateArr.join(",");
    var date = new Date(finalDateStr).toUTCString();
    if (date === "Invalid Date"){
      res.json({error: date});
    }
    var unixFormat = Math.floor(new Date(finalDateStr).getTime());

  }

  res.json({unix:unixFormat, utc: date});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
