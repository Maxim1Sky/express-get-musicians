const express = require("express");
const router = express.Router();
const { Band, Musician } = require("../models/index");

router.get("/", async (req, res) => {
  const bandsNMusic = await Band.findAll({ include: Musician });

  res.json(bandsNMusic);
});

module.exports = router;
