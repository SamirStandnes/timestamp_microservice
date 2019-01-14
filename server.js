// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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
/*
const validateString = (err, req, res, next) => {
let date = (req.params.date_string === '')? new Date(Date.now()) : new Date(req.params.date_string);

  if(date) {
    next(err);
  }
  else {
    next();
  }

};
*/

/*
const string_validator = (err, req, res, next) => {
  
  let req_param = req.params.date_string;
  let date = req_param === undefined ? Date.now() : req_param;
  if (!new Date(date)) { 
    next(err);
  }
  next();
  
};

*/

const handler = (req, res, next) => {
  let req_param = req.params.date_string;
  let date = req_param === undefined ? new Date(Date.now()) : new Date(req_param);
  console.log(date);
  
  if (date == "In) { 
    res.json({error: "Invalid Date" });
  }
  
  else {
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
  }
  
  
};


app.get('/api/timestamp/:date_string?', handler);

/*
app.use((err,req,res,next) => {
  
  const status = err.status || 500;
  
  res.status(status).json({"error" : "Invalid Date" });

});

*/



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});