const express = require("express");
const app = express();
const { Band, Musician } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

app.use(express.json()); // makes sure that we'll receive json data only (i'm not sure, idk how it works)
app.use(express.urlencoded({ extended: true })); //so that we can parse the request body with urlencoded values
// I honestly don't know why you need this line ^

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

app.post("/musicians", async (req, res) => {
  const theMusician = req.body;
  const theRes = await Musician.create(theMusician);

  res.json(theRes);
});

app.put("/musicians/:id", async (req, res) => {
  const theUpdate = req.body;
  const theId = req.params.id;

  // returns [1] if a record was found
  const theRes = await Musician.update(req.body, { where: { id: theId } });

  if (theRes[0] === 1) {
    res.send("Successfully updated the record");
  } else {
    res.status(404).send("Could not find the record");
  }
});

app.delete("/musicians/:id", async (req, res) => {
  const theId = req.params.id;
  const theRes = await Musician.destroy({ where: { id: theId } });

  if (theRes === 0) {
    res.status(404).send("No record found");
  } else {
    res.send(`Successfully deleted ${theRes} record(s)`);
  }

  // if (theRes[0] === 1) {
  //   res.send("Successfully removed the record");
  // } else {
  //   res.status(404).send("Could not find the record");
  // }
});

app.get("/bands", async (req, res) => {
  const allBan = await Band.findAll();
  res.json(allBan);
});

module.exports = app;
