var express     = require("express"),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
Mountain    = require("./models/mountain"),
Summiter    = require("./models/summiter"),
seedDB      = require("./seeds");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
// seedDB();

mongoose.connect("mongodb://localhost/eight_thousander");

// var mountainSchema = new mongoose.Schema({
//   name: String,
//   image: String,
//   description: String,
//   height: { type: Number },
//   location: String,
//   ascents: { type: Number },
//   deaths:{ type: Number }
// });
//
// var Mountain = mongoose.model("Mountain", mountainSchema);

// Mountain.create({
//   name: "Everest",
//   image: "https://financialtribune.com/sites/default/files/field/image/17january/16_nepal.jpg",
//   description: "Mount Everest attracts many climbers, some of them highly experienced mountaineers. There are two main climbing routes, one approaching the summit from the southeast in Nepal (known as the 'standard route') and the other from the north in Tibet. While not posing substantial technical climbing challenges on the standard route, Everest presents dangers such as altitude sickness, weather, and wind, as well as significant hazards from avalanches and the Khumbu Icefall. As of 2017, nearly 300 people have died on Everest, many of whose bodies remain on the mountain.",
//   height: 8848,
//   location: "Nepal",
//   ascents: 5656,
//   deaths: 223
// });

app.get("/", function(req, res){
  res.render("index");
});

app.get("/mountains", function(req, res){
  Mountain.find({}, function(err, allMountains){
    if(err){
      console.log(err)
    } else {
      res.render("mountains/index", { mountains: allMountains});
    }
  });
});

app.get("/mountains/new", function(req, res){
  res.render("mountains/new");
});

app.post("/mountains", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var height = req.body.height;
  var location = req.body.location;
  var ascents = req.body.ascents;
  var deaths = req.body.deaths;

  var newMountain = {
    name: name,
    image: image,
    description: desc,
    height: height,
    location: location,
    ascents: ascents,
    deaths: deaths
  };

  Mountain.create(newMountain, function(err, mountainCreated){
    if(err){
      console.log(err)
    } else {
      res.redirect("/mountains")
    }
  });
});

app.get("/mountains/:id", function(req, res){
  Mountain.findById(req.params.id).populate("summiters").exec(function(err, mountainFound){
    if(err){
      console.log(err);
    } else {
      res.render("mountains/show", {mountain: mountainFound});
    }
  });
});

app.get("/summiters", function(req, res){
  Summiter.find({}, function(err, allSummiters){
    if(err){
      console.log(err)
    } else {
      res.render("summiters/index", { summiters: allSummiters});
    }
  });
});

app.get("/summiters/:id", function(req, res){
  Summiter.findById(req.params.id).populate("mountains").exec(function(err, summiterFound){
    if(err){
      console.log(err);
    } else {
      res.render("summiters/show", {summiter: summiterFound});
    }
  });
});

app.get("/mountains/:id/summiters/new", function(req, res){
  Mountain.findById(req.params.id, function(err, mountain){
    if(err){
      console.log(err);
    } else {
      res.render("summiters/new", {mountain: mountain})
    }
  });
});


// app.post("/mountains/:id/summiters", function(req, res){
//   Mountain.findById(req.params.id, function(err, mountain){
//     if(err){
//       console.log(err);
//       res.redirect("/mountains");
//     } else {
//       Summiter.create(req.body.summiter, function(err, summiter){
//         if(err){
//           console.log(err)
//         } else {
//           console.log(summiter);
//           mountain.summiters.push(summiter);
//           mountain.save();
//           res.redirect("/mountains/" + mountain._id);
//           Summiter.findById(summiter._id, function(err, foundSummiter){
//             if(err){
//               console.log(err)
//             } else {
//               console.log(mountain._id);
//               foundSummiter.mountains.push(mountain._id);
//               foundSummiter.save();
//               console.log("Mountain added to summiter" + foundSummiter.name);
//             }
//           })
//         }
//       });
//     }
//   });
// });

app.post("/mountains/:id/summiters", function(req, res){
  Mountain.findById(req.params.id, function(err, mountain){
    if(err){
      console.log(err);
      res.redirect("/mountains");
    } else {
      console.log(req.body.summiter);
      console.log(req.body.summiter.name);
      Summiter.findOne({name: req.body.summiter.name}, function(error, result) {
        if (!error) {
          // If the document doesn't exist
          if (!result) {
            // Create it
            Summiter.create(req.body.summiter, function(err, summiter){
              if(err){
                console.log(err)
              } else {
                console.log(summiter);
                mountain.summiters.push(summiter);
                mountain.save();
                res.redirect("/mountains/" + mountain._id);
                Summiter.findById(summiter._id, function(err, foundSummiter){
                  if(err){
                    console.log(err)
                  } else {
                    console.log(mountain._id);
                    foundSummiter.mountains.push(mountain._id);
                    foundSummiter.save();
                    console.log("Mountain added to summiter " + foundSummiter.name);
                  }
                })
              }
            });
          } else {
            mountain.summiters.push(result);
            mountain.save();
            console.log(mountain._id);
            console.log("#######RESULT######")
            console.log(result.mountains);
            result.mountains.push(mountain._id);
            result.save();
            res.redirect("/mountains/" + mountain._id);
            console.log(result);
            console.log("Mountain added to summiter " + result.name);
          }
        }
      });
    }
  });
});


// mongoose.model('Summiter').findOne({'Name': req.body.name}, function(error, exist) {
//   if(exist && !error){
//     //do something
//     Summiter.findOne({ name: req.body.name }, function (err, foundSummiter){
//       foundSummiter.mountains.push(mountain._id);
//       foundSummiter.save();
//     });
//   }

app.listen(3000, function(){
  console.log("The server is running");
});
