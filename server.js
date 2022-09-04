"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const mongoose = require("mongoose");
server.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost:27017/Books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const booksSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});

const booksModel = mongoose.model("books", booksSchema);

async function seedBooks() {
  const firstBooke = new booksModel({
    title: "The Hitchhiker's Guide to the Galaxy",
    description:
      "The Hitchhiker's Guide to the Galaxy is a science fiction comedy series created by Douglas Adams.",
    status: "Available",
  });
  const secondBooke = new booksModel({
    title: "The Prestige",
    description:
      "The Prestige is a 2006 British-American mystery thriller film directed by Christopher Nolan, who co-wrote the screenplay with his brother Jonathan Nolan",
    status: "Available",
  });

  const thirdBooke = new booksModel({
    title: "Fight Club",
    description:
      "Fight Club is a 1996 novel by Chuck Palahniuk. It follows the experiences of an unnamed protagonist struggling with insomnia. Inspired by his doctor's exasperated remark that insomnia is not suffering, the protagonist finds relief by impersonating a seriously ill person in several support groups",
    status: "Available",
  });

  await firstBooke.save();
  await secondBooke.save();
  await thirdBooke.save();
}
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
