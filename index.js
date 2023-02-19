const express = require("express");
const app = express();
const cors = require('cors');
const port = 3000;
const http = require("http");
const https = require("https");
var bodyParser = require('body-parser');
const serverTest = http.createServer(app);
const server = https.createServer(app);

const handleEror = require("./src/middleware/handleEror");

//const { connectDB } = require("./src/config/configDb");
const connectMG = require("./src/config/configMg");
var Sequelize = require("sequelize");
const routes = require("./src/routes");

// import model
var User = require("./src/modal/User");
var Customer = require("./src/modal/Customer");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header({"Access-Control-Allow-Origin": "*"});
  next();
}) 
//connectDB();
connectMG();
routes(app);
app.get("/", (req, res) => {
  res.json({ test: "Hello World!" });
});



// app.get("/user", async (req, res) => {
//   const response = await User.findAll()
//     .then(function (data) {
//       const res = { success: true, data: data };
//       return res;
//     })
//     .catch((error) => {
//       const res = { success: false, error: error };
//       return res;
//     });
//   res.json(response);
// });

serverTest.listen(5005, () => {
  console.log("Example app listening on http://localhost:" + 5005);
});
var date = new Date("2023-01-03T09:00:00.000Z");
console.log(date.toString());
// server.listen(5005, () => {
//   console.log("Example app listening on https://localhost:" + 5005);
// });
