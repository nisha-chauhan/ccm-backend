const mongoose = require("mongoose")


async function mongoDbConnection(url) {
    return mongoose.connect(url).then(() => { console.log(`Database is connected`) }).catch(() => {
        console.log("Database is Not connected some error occured!")
    })
}

module.exports = {
    mongoDbConnection
}