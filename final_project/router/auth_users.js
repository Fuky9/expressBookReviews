const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{ username: "admin", password: "admin" }];
//returns boolean
//write code to check if the username is not already used
const isValid = (username) => {
  const validUserArray = users.filter((user) => user.username === username);

  if (validUserArray.length > 0) {
    return false;
  } else return true;
};

//returns boolean
//write code to check if username and password match the one we have in records.
const authenticatedUser = (username, password) => {
  const authenticatedArray = users.filter(
    (user) => user.username === username && user.password === password
  );

  if (authenticatedArray.length > 0) {
    return true;
  } else return false;
};

//Endpoint for registering users
regd_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: `User ${username} successfully registered!` });
    } else return res.status(409).json({ message: "User already exists!" });
  } else return res.status(404).json({ message: "Unable to register user" });
});

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign(
      {
        data: username,
      },
      "access",
      { expiresIn: 60 * 60 }
    );
    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).json({ message: "User successfully logged in!" });
  } else return res.status(401).json({ message: "Failed to login!" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const bookIsbn = req.params.isbn;
  const { username } = req.session.authorization;
  const review = req.query.review;

  if (!books.hasOwnProperty(bookIsbn)) {
    return res.status(404).json({ message: "Book not found!" });
  }

  books[bookIsbn].reviews[username] = { review };

  return res.status(200).json({
    message: `Review: ${review} added/updated for book ${books[bookIsbn].title}.`,
  });
});

// Delete book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const bookIsbn = req.params.isbn;
  const { username } = req.session.authorization;

  if (!books.hasOwnProperty(bookIsbn)) {
    return res.status(404).json({ message: "Book not found!" });
  }
  if (books[bookIsbn].reviews[username]) {
    delete books[bookIsbn].reviews[username];
  } else return res.status(404).json({ message: "Review not found!" });

  return res
    .status(200)
    .json({ message: `Review from user ${username} was deleted.` });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
