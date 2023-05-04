const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(
  "mongodb+srv://apiwebcw:W4ZPk1AWIGmrR8zZ@holidaycentral.7bwifhs.mongodb.net/HolidayCentral",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const contactSchema = {
  email: String,
  query: String,
};

const flightSchema = {
  id: Number,
  name: String,
  departure: Number,
  arrival: Number,
  price: String,
  departureDate: String,
  time: String,
  flyTime: String,
  airline: Number,
  class: Number,
  status: Number,
};

const flightresseatsSechema = {
  id: Number,
  flight: Number,
  seat: Number,
};

const flightresechema = {
  id: Number,
  dflight: Number,
  seat: Number,
};

const Flight = mongoose.model("flights", flightSchema);
const Flightresseats = mongoose.model("flightresseats", flightresseatsSechema);

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/getFlights", async function (req, res) {
  let depatureFindObj = {
    departure: req.body.departure,
    arrival: req.body.arrival,
    departureDate: req.body.departureDate,
  };
  let arrivalFindObj = {
    departure: req.body.arrival,
    arrival: req.body.departure,
    departureDate: req.body.arrivalDate,
  };

  if (req.body && req.body.airline) {
    depatureFindObj.airline = req.body.airline;
    arrivalFindObj.airline = req.body.airline;
  }

  if (req.body && req.body.class) {
    depatureFindObj.class = req.body.class;
    arrivalFindObj.class = req.body.class;
  }


  try {
    let results = {};

    let flighsToDeparture = await Flight.find(depatureFindObj);
    // console.log("flighs To Departure");
    // console.log(flighsToDeparture);

    let flighsToArriveAgain = await Flight.find(arrivalFindObj);
    // console.log("flighs To Arrive");
    // console.log(flighsToArriveAgain);

    if (flighsToDeparture.length == 0 || flighsToArriveAgain.length == 0) {
      res.send("No any round trips available for the selected combinations");
    } else {
      results.flighsToDeparture = flighsToDeparture;
      results.flighsToArriveAgain = flighsToArriveAgain;
      res.send(results);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/getFlightsBookedSeats", async function (req, res) {
  try {
    let results = {};
    let seatsBooked = await Flightresseats.find(req.body);

    if (seatsBooked.length == 0) {
      res.send("No any round seats being booked");
    } else {
      results.seatsBooked = seatsBooked;
      res.send(results);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/getFlightsBookedSeats", async function (req, res) {
  try {
    let results = {};
    let seatsBooked = await Flightresseats.find(req.body);

    if (seatsBooked.length == 0) {
      res.send("No any round seats being booked");
    } else {
      results.seatsBooked = seatsBooked;
      res.send(results);
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(3001, function () {
  console.log("App is running on Port 3001");
});
