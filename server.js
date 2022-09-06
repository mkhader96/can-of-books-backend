"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const mongoose = require("mongoose");
server.use(cors());
const booksModel = require("./Modules/BookModule");
const PORT = process.env.PORT || 3001;
server.use(express.json())

mongoose.connect('mongodb://mkhader96:miasanmia5@ac-lunxney-shard-00-00.egnkgre.mongodb.net:27017,ac-lunxney-shard-00-01.egnkgre.mongodb.net:27017,ac-lunxney-shard-00-02.egnkgre.mongodb.net:27017/?ssl=true&replicaSet=atlas-m7ugiw-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// seedBooks();

server.get("/", homeHandler);
server.get("test", testHandler);
server.get("/books", getBooks);
server.post('/addBook',addBooks);
server.delete('/deleteBook/:id',deleteBooks);
server.get("*", defaultHandler);

function homeHandler(req, res) {
  res.send("Home Route");
}

function testHandler(req, res) {
  res.send("Test Route");
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

async function addBooks(req, res) {
const title = req.body.title;
const description = req.body.description;
const status = req.body.status;
  console.log(req.body);
  await booksModel.create({
    title: title,
    description: description,
    status: status,
  });
  booksModel.find({}, (error, booksData) => {
    if (error) {
      res.send(error);
    } else {
      res.send(booksData);
      
    }
  });
}
function deleteBooks(req,res) {
  const bookId = req.params.id;
  booksModel.deleteOne({_id:bookId},(err,result)=>{
      
    booksModel.find({},(err,result)=>{
          if(err)
          {
              console.log(err);
          }
          else
          {
              res.send(result);
          }
      })

  })
}
function defaultHandler(req, res) {
  res.status(404).send("Not Found");
}

server.listen(PORT, () => console.log(`listening on ${PORT}`));
