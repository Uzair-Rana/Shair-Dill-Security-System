import express from 'express'
import Feature from '../models/Feature.js'

const router = express.Router()

// Get all active features
router.get('/', async (req, res) => {
  try {
    const features = await Feature.find({ isActive: true }).sort({ order: 1 })
    res.json(features)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single feature
router.get('/:id', async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id)
    if (!feature) return res.status(404).json({ error: 'Feature not found' })
    res.json(feature)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new feature
router.post('/', async (req, res) => {
  try {
    const feature = new Feature(req.body)
    await feature.save()
    res.status(201).json(feature)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update feature
router.put('/:id', async (req, res) => {
  try {
    const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!feature) return res.status(404).json({ error: 'Feature not found' })
    res.json(feature)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete feature
router.delete('/:id', async (req, res) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id)
    if (!feature) return res.status(404).json({ error: 'Feature not found' })
    res.json({ message: 'Feature deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
