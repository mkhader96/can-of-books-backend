"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const mongoose = require("mongoose");
server.use(cors());
const booksModel = require("./Modules/BookModule");
const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost:27017/Books2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// seedBooks();

server.get("/", homeHandler);
server.get("test", testHandler);
server.get("/books", getBooks);
server.get("*", defaultHandler);

function homeHandler(req, res) {
  res.send("Home Route");
}

function testHandler(req, res) {
  res.send("Test Route");
}

function defaultHandler(req, res) {
  res.status(404).send("Not Found");
}

function getBooks(req, res) {
  booksModel.find({}, (error, booksData) => {
    if (error) {
      res.send(error);
    } else {
      res.send(booksData);
    }
  });
}

server.listen(PORT, () => console.log(`listening on ${PORT}`));
