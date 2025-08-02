const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
var initCouch = require("./db/dbconnection/init_couch");
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
const routes = require("./routes/routes");
initCouch(function (err) {
  if (err) {
    console.error("Error initializing CouchDB: " + err);
    process.exit(1);
  } else {
    console.log("couchdb initialized");
  }
});

app.use("/", routes);

app.listen(PORT, () => {
  console.log("Server Works on port : " + PORT);
});
