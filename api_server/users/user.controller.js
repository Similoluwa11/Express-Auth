const fs = require('node:fs')
const path = require('path');
const userFilePath = path.join(__dirname, 'db.users.json') 
let users = fs.readFileSync(userFilePath, 'utf-8')
const createUser = (req, res) => {
    
    const parsedUsers = JSON.parse(users)
    
        const user = req.body;
        if (parsedUsers.find((u) => u.username === user.username)) {
            return res.status(400).json({ message: 'Username is already taken' });
          }
        user.api_key = `${user.username}_${user.password}`
    //console.log(parsedUsers);
    if (user.username === 'similoluwa') {
        user.user_type = 'admin'
    } else {
        user.user_type = 'user'
    }
    const allUsers = [...parsedUsers, user]
    const allUsersString = JSON.stringify(allUsers);
    fs.writeFileSync(userFilePath, allUsersString);
    return res.status(201).json({
        message: 'User created successfully',
        users: allUsers
    })
    
        
    
    
}

module.exports = {
    createUser
}