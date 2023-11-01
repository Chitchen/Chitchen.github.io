const express = require('express');
const fs = require('fs');
/*
 Imports the express library.
 This is necessary to have an express server.
*/
const bodyParser = require('body-parser');  // Node.js body parsing middleware.
const app = express();

var colorMap = require(__dirname + '/test.json')

// Telling the app what modules / packages to use
app.use(bodyParser.json());
// Express modules / packages
app.use(bodyParser.urlencoded({ extended: true }));
// Express modules / packages
app.use(express.static('views'));
// load the files that are in the public directory

app.listen(3000, () => { // Listen on port 3000
  console.log('Listening!') // Log when listen success
})

//Set Views
app.get('', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get("/test.json", (req, res) => {
  res.sendFile(__dirname + '/test.json');
})

//DataBase Stuffs
// Handling request 
app.post("/update", (req, res) => {
  res.json([{
    country_recieved: req.body.countryId,
    color_recieved: req.body.countryColor
  }])
  var name = String(req.body.countryId);
  var color = String(req.body.countryColor);
  colorMap[name] = color;

  fs.writeFile("test.json", JSON.stringify(colorMap),
    function(err) {
      if (err) {
        console.log(err);
        res.status(500).send("Error writing to file");
      } else {
        //console.log("Success!");
        //console.log(`Wrote: ${colorMap[name]} TO: ${name}`)
        res.status(200).end();
      }
    });
})
