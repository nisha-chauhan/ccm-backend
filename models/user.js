const mongoose = require("mongoose");

const userSignupSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },


})
const userCollection = mongoose.model("user", userSignupSchema)

module.exports = userCollection;
