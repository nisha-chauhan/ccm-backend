const express = require("express");
const jwt = require('jsonwebtoken');
const { authFunc } = require("./jwt")
const cors = require('cors');
const { mongoDbConnection } = require("./connection");
const { handelSignup, handelLogin, getAllUsers, hashPassword } = require("./controlers/user");

const app = express();
const PORT = 5000;

// MongoDB connection
mongoDbConnection("mongodb://localhost:27017/testDb");

// Middleware for parsing JSON and URL-encoded bodies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/hashpassword", hashPassword)

// Routes
app.get("/", async (req, res) => {
    return res.send("Welcome to NodeApi");
});


app.post("/signup", handelSignup);
app.post("/login", handelLogin);
app.get("/get-all-users", authFunc, getAllUsers);





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
