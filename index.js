const express = require("express");
const app = express();
const port = 3000;
const http = require("http");
const https = require("https");
const serverTest = http.createServer(app);
const server = https.createServer(app);

//const { connectDB } = require("./src/config/configDb");
const connectMG = require("./src/config/configMg");
var Sequelize = require("sequelize");
const routes = require("./src/routes");
// imporconst controller = {}
// import model
var User = require("./src/modal/User");
var Customer = require("./src/modal/Customer");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connectDB();
connectMG();
app.get("/", (req, res) => {
  res.json({ test: "Hello World!" });
});

routes(app);

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
// server.listen(5005, () => {
//   console.log("Example app listening on https://localhost:" + 5005);
// });
