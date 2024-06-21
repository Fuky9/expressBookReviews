const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const bookIsbn = req.params.isbn;
  if (books.hasOwnProperty(bookIsbn)) {
    res.status(200).json(books[bookIsbn]);
  } else res.status(404).json({"message": "Book not found!"});
 });

// Getting array of books for requests below
const bookArray = Object.values(books);

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const bookAuthor = req.params.author;

  // req param author compared to books author data (in lower case without spaces)
  const filteredArray = bookArray.filter((book) => book.author.toLowerCase().replace(/ /g,'') === bookAuthor.toLowerCase().replace(/ /g,''));
  if (filteredArray.length > 0) {
    if (filteredArray.length === 1) {
        return res.status(200).send(filteredArray[0]);
  } else return res.status(200).send(filteredArray);
} else res.status(404).json({"message": "No book found"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const bookTitle = req.params.title;
    const filteredArray = bookArray.filter(book => book.title.toLowerCase().replace(/ /g,'') === bookTitle.toLowerCase().replace(/ /g,''));
    if (filteredArray.length > 0) {
        if (filteredArray.length === 1) {
            return res.status(200).send(filteredArray[0]);
    } else return res.status(200).send(filteredArray);
 } else res.status(404).json({"message": "No book found"});   
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const bookIsbn = req.params.isbn;
  if (books.hasOwnProperty(bookIsbn)) {
    res.status(200).json(books[bookIsbn]["reviews"]);
  } else res.status(404).json({"message": "Book not found!"});
});

module.exports.general = public_users;
