const exp = require('constants');
const express = require('express');
const { readFile } = require('fs');
const path = require('path')
const fs = require('fs').promises
const PORT = 1400;
const HOSTNAME  = 'localhost'
const app = express()
app.use(express.static('public'));
const studentPagePath = path.join(__dirname, 'public', 'index.html')
const errorPagePath = path.join(__dirname, 'public', '404.html')
const handleStudentPage = async(req, res)=>{
    const file = await fs.readFile(studentPagePath)
    res.state(200).sendFile(file)
}
app.get('index.html', handleStudentPage)
app.get('*', async (req, res)=>{
   try {
    const file = await fs.readFile(errorPagePath)
    res.status(404).sendFile(file)
   } catch (error) {
    console.error(error)
   }
})

app.listen(PORT, HOSTNAME, ()=> console.log(`Server started at  http://${HOSTNAME}:${PORT}`))
