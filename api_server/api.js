const express = require('express');

const itemsRouter = require('./items/items.router');
const userRouter = require('./users/user.router')

const PORT = 1500;
const HOSTNAME  = 'localhost';

const app = express()

app.use(express.json())

app.use('/items', itemsRouter)
app.use('/users', userRouter)

app.get('*', (req, res) => {
    return res.status(404).json({
        data: null,
        error: 'Route not found'
    })
})
app.listen(PORT, () => console.log(`listening at: http://${HOSTNAME}:${PORT}`))