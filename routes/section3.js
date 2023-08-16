// section3Router.js

const express = require("express");
const router = express.Router();
const Section2 = require("../models/section2.model");

router.get("/input-values", async (req, res) => {
  const { start_datetime, end_datetime, userEmail } = req.query;

  try {
    const inputData = await Section2.find({
      email: userEmail,
      time: {
        $gte: start_datetime,
        $lte: end_datetime,
      },
    }).sort({ time: "asc" });

    const formattedData = inputData.map((entry) => ({
      timestamp: entry.time,
      input_values: entry.inputValues.join(", "),
    }));

    res.json({
      status: "success",
      user_email: userEmail,
      payload: formattedData,
    });
  } catch (error) {
    console.error("Error fetching input values:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching input values",
    });
  }
});

module.exports = router;
