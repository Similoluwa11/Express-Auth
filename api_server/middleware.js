 const fs = require('node:fs');
const path = require('path');
let userFilePath = path.join(__dirname, 'users', 'db.users.json')
//console.log(userFilePath)
const userDB = fs.readFileSync(userFilePath)


const apiKeyAuth = (req, res, next) => {
    const authHeader = req.headers;
    let parsedUserDB = JSON.parse(userDB);
    if (!authHeader.api_key) {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }

    const existingUser = parsedUserDB.find(user => user.api_key === authHeader.api_key)
    if (existingUser) {
        req.user = existingUser
        next();
    } else {
        return res.status(401).json({ message: 'You are not authenticated!' });
    }
}

const checkAdmin = (req, res, next) => {
    if (req.user.user_type !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized!' });
    }

    next()
}
module.exports = {
    apiKeyAuth,
    checkAdmin
}
