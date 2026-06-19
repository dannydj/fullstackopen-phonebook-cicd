const mongoose = require('mongoose')
require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT || 3001

mongoose.set('strictQuery', false)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })