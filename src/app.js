const express = require("express");
const app = express();
const { Band, Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

app.use(express.json()); // makes sure that we'll receive json data only (i'm not sure, idk how it works)

//TODO: Create a GET /musicians route to return all musicians

app.get("/musicians", async (req, res) => {
  const allMus = await Musician.findAll();
  res.json(allMus);
});

app.get("/musicians/:id", async (req, res) => {
  const index = req.params.id;
  const theMusician = await Musician.findByPk(index);
  if (theMusician !== null) {
    res.json(theMusician);
  } else {
    res.status(404).send("Musician not found");
  }
});

app.get("/bands", async (req, res) => {
  const allBan = await Band.findAll();
  res.json(allBan);
});

module.exports = app;
