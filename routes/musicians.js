const express = require("express");
const router = express.Router();
const { Band, Musician } = require("../models/index");
const { db } = require("../db/connection");

router.get("/", async (req, res) => {
  const allMus = await Musician.findAll();
  res.json(allMus);
});

router.get("/:id", async (req, res) => {
  const index = req.params.id;
  const theMusician = await Musician.findByPk(index);
  if (theMusician !== null) {
    res.json(theMusician);
  } else {
    res.status(404).send("Musician not found");
  }
});

router.post("/", async (req, res) => {
  const theMusician = req.body;
  const theRes = await Musician.create(theMusician);

  res.json(theRes);
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  const theId = req.params.id;
  const theRes = await Musician.destroy({ where: { id: theId } });

  if (theRes === 0) {
    res.status(404).send("No record found");
  } else {
    res.send(`Successfully deleted ${theRes} record(s)`);
  }
});

module.exports = router;
