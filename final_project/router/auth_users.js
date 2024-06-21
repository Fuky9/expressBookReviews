const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username:"admin", password:"admin"}];
//returns boolean
//write code to check if the username is not already used
const isValid = (username)=>{
    
    const validUserArray = users.filter(user => user.username === username)
    
    if (validUserArray.length > 0) {
        return false
    } else true
}

//returns boolean
//write code to check if username and password match the one we have in records.
const authenticatedUser = (username,password)=>{
    
    const authenticatedArray = users.filter(user => (user.username === username) && (user.password === password))  

    if (authenticatedArray.length > 0) {
        return true;
    } else false;
}

//Endpoint for registering users
regd_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (isValid(username)) {
            users.push({username: username, password: password});
            res.status(200).json({"message": `User ${username} successfully registered!`});
        } else res.status(409).json({"message": "User already exists!"});
    } else res.status(404).json({"message": "Unable to register user"})
})

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (authenticatedUser(username,password)) {
        const accessToken = jwt.sign(
            
        )
        req.session.authorization = {
            accessToken,
        } 

    } else req.status(401).json({"message": "Failed to login!"})

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
