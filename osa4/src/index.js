// const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('../utils/config');
const blogsRouter = require('../controllers/blogs');

const MONGODB_URI = config.MONGODB_URI;
mongoose.set('useUnifiedTopology', true);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter);



const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
