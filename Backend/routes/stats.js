import express from 'express'
import Stat from '../models/Stat.js'

const router = express.Router()

// Get all active stats
router.get('/', async (req, res) => {
  try {
    const stats = await Stat.find({ isActive: true }).sort({ order: 1 })
    res.json(stats)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single stat
router.get('/:id', async (req, res) => {
  try {
    const stat = await Stat.findById(req.params.id)
    if (!stat) return res.status(404).json({ error: 'Stat not found' })
    res.json(stat)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new stat
router.post('/', async (req, res) => {
  try {
    const stat = new Stat(req.body)
    await stat.save()
    res.status(201).json(stat)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update stat
router.put('/:id', async (req, res) => {
  try {
    const stat = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!stat) return res.status(404).json({ error: 'Stat not found' })
    res.json(stat)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete stat
router.delete('/:id', async (req, res) => {
  try {
    const stat = await Stat.findByIdAndDelete(req.params.id)
    if (!stat) return res.status(404).json({ error: 'Stat not found' })
    res.json({ message: 'Stat deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
