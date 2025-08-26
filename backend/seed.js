// src/scripts/seed.js
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from '../models/Project.js'
import Task from '../models/Task.js'

dotenv.config()
const MONGO_URI = process.env.MONGO_URI

async function seed() {
  if (!MONGO_URI) throw new Error('MONGO_URI not set')

  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  console.log('🔄 Clearing old data…')
  await Project.deleteMany({})
  await Task.deleteMany({})

  console.log('🌱 Seeding projects…')
  const proj = await Project.create({ title: 'Seeded Project', createdBy: null })

  console.log('🌱 Seeding tasks…')
  await Task.create([
    { projectId: proj._id, title: 'Seed Task 1', createdBy: null },
    { projectId: proj._id, title: 'Seed Task 2', createdBy: null }
  ])

  console.log('✅ Seeding complete')
  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('❌ Seeding failed:', err)
  process.exit(1)
})
