require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const PORT = 4001;

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/evident", {});
    console.log("DB connected");
  } catch (error) {
    console.error("DB not connected:", error.message);
  }
};

app.listen(PORT, async () => {
  console.log(`server is running at http://localhost:${PORT}`);
  await connectDB();
});
