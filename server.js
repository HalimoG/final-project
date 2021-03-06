require("dotenv").config();
const ENV = process.env.ENV || "development";
// const cookieSession = require('cookie-session')
const bodyParser = require("body-parser");

const client = require("./elasticsearch-db/connections.js");
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const getLabels = require("./watson.js")();
const express = require("express");
const path = require("path");
const port = 8080;
const app = express();
const multer = require("multer");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
}).single("myImage");

app.post("/login", function(req, res) {
  var username = req.body.username;
  knex("photographer")
    .where("username", username)
    .then(results => {
      if (results.length) {
        res.send(results);
      } else {
        knex("influencer")
          .where("username", username)
          .then(results => {
            res.send(results);
          });
      }
    });
});

app.post("/collab", function(req, res) {
  console.log("influencer", req.body.influencer);
  console.log("photographer", req.body.photographer);
  knex("requests")
    .insert({
      photographer_id: req.body.photographer,
      influencer_id: req.body.influencer
    })
    .then(results => {
      res.sendStatus(200);
    });
});
app.post("/decline", function(req, res) {
  console.log("influencer", req.body.influencer);
  console.log("photographer", req.body.photographer);
  knex("requests")
    .where({
      photographer_id: req.body.photographer,
      influencer_id: req.body.influencer
    })
    .del()
    .then(results => {
      res.sendStatus(200);
    });
});

app.post("/upload", function(req, res) {
  upload(req, res, async err => {
    if (!err) {
      await getLabels.vR(
        `./public/uploads/${req.file.originalname}`,
        async labels => {
          await client.search(
            {
              index: "photographers",
              type: "user",
              body: {
                query: {
                  match: { keyWords: labels }
                }
              }
            },
            function(error, response, status) {
              if (error) {
                console.log("search error: " + error);
              } else {
                console.log("--- Hits ---");
                var array = [];

                function average() {
                  var sum = 0;
                  var pointer = 0;
                  response.hits.hits.forEach(function(hit, i) {
                    sum += hit["_score"];
                    pointer += 1;
                  });

                  return sum / pointer;
                }

                response.hits.hits.forEach(function(hit, i) {
                  console.log(average());
                  console.log(response.hits);
                  if (hit["_score"] > Math.round(average())) {
                    array.push(hit["_source"]);
                  }
                });

                var keywords = labels.split(" ");
                var object = {
                  match: array,
                  img: keywords
                };
                res.send(object);
              }
            }
          );
        }
      );
    }
  });
});

app.get("/:id/influencerrequest", function(req, res) {
  var id = req.params.id;
  knex("photographer")
    .select(
      "photographer.name",
      "photographer.profilepic",
      "photographer.id",
      "photographer.type"
    )
    .join("requests", "requests.photographer_id", "=", "photographer.id")
    .join("influencer", "requests.influencer_id", "=", "influencer.id")
    .where("influencer.id", req.params.id)
    .then(results => {
      res.json(results);
    });
});
app.get("/:id/photographerrequest", function(req, res) {
  var id = req.params.id;
  knex("photographer")
    .select(
      "influencer.name",
      "influencer.profilepic",
      "influencer.id",
      "influencer.type"
    )
    .join("requests", "requests.photographer_id", "=", "photographer.id")
    .join("influencer", "requests.influencer_id", "=", "influencer.id")
    .where("photographer.id", req.params.id)
    .then(results => {
      res.json(results);
    });
});

app.listen(port);

console.log("App is listening on port " + port);
