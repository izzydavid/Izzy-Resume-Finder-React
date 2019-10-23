require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
var jwt = require('express-jwt');
const imagesRoutes = require("./routes/images.routes")
const apiRoutes = require("./routes/api.routes")
var authRoutes = require("./routes/auth.routes");



const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
  getToken: function fromHeaderOrCookie(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      console.log("auth", req.headers.authorization.split(' ')[1]);
      return req.headers.authorization.split(' ')[1];
    }

    return null;
  }
});

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/images", imagesRoutes); 
app.use("/api", apiRoutes); 
app.use("/auth", authRoutes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user:password123@ds137498.mlab.com:37498/heroku_1wncblw2"; 

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false});

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//send react client folder for the front end
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
