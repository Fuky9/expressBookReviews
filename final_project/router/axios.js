const express = require("express");
const axios = require("axios");
const axios_routes = express.Router();

// Fetching the endpoints data using Axios for practice

// Geting all books
axios_routes.get("/", async (req, res) => {
  try {
    response = await axios.get("http://localhost:5000/");
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: `Cannot fetch book data ${err}` });
  }
});

// Getting book details based on isbn
axios_routes.get("/isbn/:isbn", async (req, res) => {
  const bookIsbn = req.params.isbn;
  const url = `http://localhost:5000/isbn/${bookIsbn}`;
  try {
    response = await axios.get(url);
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: `Cannot fetch book data ${err}` });
  }
});

// Getting book details based on author
axios_routes.get("/author/:author", async (req, res) => {
  const bookAuthor = req.params.author;
  const url = `http://localhost:5000/author/${bookAuthor}`;
  try {
    response = await axios.get(url);
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: `Cannot fetch book data ${err}` });
  }
});

// Getting book details based on title
axios_routes.get("/title/:title", async (req, res) => {
  const bookTitle = req.params.title;
  const url = `http://localhost:5000/title/${bookTitle}`;
  try {
    response = await axios.get(url);
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ message: `Cannot fetch book data ${err}` });
  }
});

module.exports = axios_routes;
