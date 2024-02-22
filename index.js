const express = require("express");
const app = express();
const cors = require("cors");
const connectDb = require("./config/dbConnection");
require("dotenv").config();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes); 

app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});
