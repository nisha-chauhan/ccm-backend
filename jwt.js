const jwt = require('jsonwebtoken');

const secretKey = "NIsha@%&GK01vdv";

///jwt function
const generateJwtToken = (email, name) => {
    if (!secretKey) {
        process.exit(1);
    }
    const userData = {
        email: email,
        name: name
    }
    const expiry_time = {
        expiresIn: '1h'
    };
    const token = jwt.sign(userData, secretKey, expiry_time);
    return token
};


const authFunc = (req, res, next) => {
    let bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided." });
    }
    jwt.verify(token, secretKey, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token." })
        } else {
            req.user = decode
            next()

        }
    })
}



// password hashing
const hashPassword = (req, res) => {

    const saltRounds = 10;
    // bcrypt.genSalt(saltRounds, (err, salt) => {
    //     if (err) {
    //         console.log(err)
    //         return res.status(404).json({ message: "Error occure!", error: err })
    //     }
    //     const { password } = req.body;
    //     // const password = userPassword;
    //     bcrypt.hash(password, salt, (err, hash) => {
    //         if (err) {
    //             console.log(err)
    //             return res.status(404).json({ message: "Error in hashing", error: err })
    //         }
    //         console.log(`Password hashing complete`, hash)
    //         return res.json({ hashPassword: hash })
    //     })
    // })
    const { password } = req.body;
    const hPassword = bcrypt.hash(password, saltRounds)
    console.log(hPassword)
    return res.status(200)
}

module.exports = { generateJwtToken, authFunc }