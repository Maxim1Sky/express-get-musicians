const express = require("express");
const app = express();
const { Band, Musician } = require("../models/index");
const { db } = require("../db/connection");
const musiciansRouter = require("../routes/musicians");

const port = 3000;

// ---- MIDDLEWARE
app.use(express.json()); // makes sure that we'll receive json data only (i'm not sure, idk how it works)
app.use(express.urlencoded({ extended: true })); //so that we can parse the request body with urlencoded values
// I honestly don't know why you need this line ^

app.use("/musicians", musiciansRouter);

//TODO: Create a GET /musicians route to return all musicians

app.get("/bands", async (req, res) => {
  const allBan = await Band.findAll();
  res.json(allBan);
});

module.exports = app;
