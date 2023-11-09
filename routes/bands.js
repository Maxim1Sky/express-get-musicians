const express = require("express");
const router = express.Router();
const { Band, Musician } = require("../models/index");

router.get("/", async (req, res) => {
  const bandsNMusic = await Band.findAll({ include: Musician });

  res.json(bandsNMusic);
});

router.get("/:id", async (req, res) => {
  const theId = req.params.id;
  const theBand = await Band.findByPk(theId, { include: Musician });

  res.json(theBand);
});

module.exports = router;
