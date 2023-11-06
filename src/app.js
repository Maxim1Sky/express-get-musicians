const express = require("express");
const app = express();
const { Band, Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians

app.get("/musicians", async (req, res) => {
  const allMus = await Musician.findAll();
  res.json(allMus);
});

app.get("/musicians/1", async (req, res) => {
  const allMus = await Musician.findAll();
  res.json(allMus[0]);
});

app.get("/bands", async (req, res) => {
  const allBan = await Band.findAll();
  res.json(allBan);
});

module.exports = app;
