const userCollection = require("../models/user")
const { generateJwtToken } = require("../jwt")


//get all user function
async function getAllUsers(req, res) {
    const all_users = await userCollection.find({})
    return res.status(200).json(all_users)
}

//password hashing
const bcrypt = require("bcrypt")
const hashPassword = async (userPassword) => {

    const saltRounds = 10;

    const password = userPassword
    const hPassword = await bcrypt.hash(password, saltRounds)
    console.log(hPassword)
    return hPassword
}

const comparePassword = async (userPassword, hash) => {
    return await bcrypt.compare(userPassword, hash)

}


// Signup function
async function handelSignup(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(404).json({ message: "All fields are required." })
    }
    try {
        const checkAlreadyExists = await userCollection.findOne({ email });

        if (checkAlreadyExists && checkAlreadyExists.email === req.body.email) {
            return res.status(400).json({ message: "User already exists!" })
        } else {
            const secretPassword = await hashPassword(password) //is wale function se hash return hoga
            console.log(secretPassword)
            const newData = await userCollection.create({ name, email, password: secretPassword })
            return res.status(200).json({ reponse: newData, message: "User created successfully", my_token: generateJwtToken(newData.email, newData.name) })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Login function
async function handelLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const checkUser = await userCollection.findOne({ email });
        if (!checkUser) {
            return res.status(200).json({ message: "User not found." });
        } else {
            const checkPassword = await comparePassword(password, checkUser.password)
            if (checkPassword) {

                return res.status(200).json({ message: "Login successful.", my_token: generateJwtToken(checkUser.email, checkUser.name) })
            } else {
                return res.status(202).json({ message: "Incorrect password!" })
            }
        }

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = {
    handelLogin, getAllUsers, handelSignup, hashPassword,
}