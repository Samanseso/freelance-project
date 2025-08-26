
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config';
import projectRouter from './routes/project.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  console.error('MONGO_URI not set in .env')
  process.exit(1)
}

mongoose
  .connect(MONGO_URI, {
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

app.use(cors())
app.use(express.json())

app.use('/api/v1/projects', projectRouter)

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
