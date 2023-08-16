const express = require("express");
const router = express.Router();
const moment = require("moment");
const Section2 = require("../models/section2.model");

router.get("/", (req, res) => {
  res.render("section2");
});

router.post("/khoj", async (req, res) => {
  const { inputValues, searchValue } = req.body;

  const sortedInputValues = inputValues
    .split(",")
    .map((value) => parseInt(value))
    .sort((a, b) => b - a);

  const userId = req.user.id;

  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");

  const userEmail = req.session.userEmail;
  console.log("User email", userEmail);

  const section2Data = new Section2({
    email: userEmail,
    time: timestamp,
    inputValues: sortedInputValues,
    searchValue: parseInt(searchValue),
  });
  try {
    await section2Data.save();
    const isSearchValueInInput = sortedInputValues.includes(
      parseInt(searchValue)
    );

    res.render("section2", {
      isSearchValueInInput,
      inputValues,
      searchValue,
    });
  } catch (error) {
    console.error("Error saving section2 data:", error);
    res.status(500).send("Error saving section2 data");
  }
});

module.exports = router;
