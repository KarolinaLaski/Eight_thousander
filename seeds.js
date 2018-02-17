var mongoose = require("mongoose"),
    Mountain = require("./models/mountain"),
    Summiter = require("./models/summiter");


var data = [
  {
    name: "Everest",
    image: "https://financialtribune.com/sites/default/files/field/image/17january/16_nepal.jpg",
    description: "Mount Everest attracts many climbers, some of them highly experienced mountaineers. There are two main climbing routes, one approaching the summit from the southeast in Nepal (known as the 'standard route') and the other from the north in Tibet. While not posing substantial technical climbing challenges on the standard route, Everest presents dangers such as altitude sickness, weather, and wind, as well as significant hazards from avalanches and the Khumbu Icefall. As of 2017, nearly 300 people have died on Everest, many of whose bodies remain on the mountain.",
    height: 8848,
    location: "Nepal",
    ascents: 5656,
    deaths: 223
  },
  {
    name: "Everest",
    image: "https://financialtribune.com/sites/default/files/field/image/17january/16_nepal.jpg",
    description: "Mount Everest attracts many climbers, some of them highly experienced mountaineers. There are two main climbing routes, one approaching the summit from the southeast in Nepal (known as the 'standard route') and the other from the north in Tibet. While not posing substantial technical climbing challenges on the standard route, Everest presents dangers such as altitude sickness, weather, and wind, as well as significant hazards from avalanches and the Khumbu Icefall. As of 2017, nearly 300 people have died on Everest, many of whose bodies remain on the mountain.",
    height: 8848,
    location: "Nepal",
    ascents: 5656,
    deaths: 223
  },
  {
    name: "Everest",
    image: "https://financialtribune.com/sites/default/files/field/image/17january/16_nepal.jpg",
    description: "Mount Everest attracts many climbers, some of them highly experienced mountaineers. There are two main climbing routes, one approaching the summit from the southeast in Nepal (known as the 'standard route') and the other from the north in Tibet. While not posing substantial technical climbing challenges on the standard route, Everest presents dangers such as altitude sickness, weather, and wind, as well as significant hazards from avalanches and the Khumbu Icefall. As of 2017, nearly 300 people have died on Everest, many of whose bodies remain on the mountain.",
    height: 8848,
    location: "Nepal",
    ascents: 5656,
    deaths: 223
  }
]


function seedDB(){
  Mountain.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Mountains have been removed!")
      Summiter.remove({}, function(err){
        if(err){
          console.log(err)
        } else {
          console.log("Summiters have been removed!");
          data.forEach(function(seed){
            Mountain.create(seed, function(err, mountain){
              if(err){
                console.log(err)
              } else {
                console.log("Mountain have been created");
                // create Summiters
                Summiter.create(
                  {
                   name: "Adam Bielecki",
                   nationality: "Poland"
                 }, function(err, summiter){
                   if(err){
                     console.log(err)
                   } else {
                     mountain.summiters.push(summiter._id);
                     mountain.save();
                     console.log("Added new summiter!")
                   }
                 });
              }
            });
          });
        }
      });
    }
  });
}

module.exports = seedDB;
