import express from 'express'
import HeroSlide from '../models/HeroSlide.js'

const router = express.Router()

// Get all active hero slides
router.get('/', async (req, res) => {
  try {
    const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 })
    res.json(slides)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single hero slide
router.get('/:id', async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id)
    if (!slide) return res.status(404).json({ error: 'Slide not found' })
    res.json(slide)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new hero slide
router.post('/', async (req, res) => {
  try {
    const slide = new HeroSlide(req.body)
    await slide.save()
    res.status(201).json(slide)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update hero slide
router.put('/:id', async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!slide) return res.status(404).json({ error: 'Slide not found' })
    res.json(slide)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete hero slide
router.delete('/:id', async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndDelete(req.params.id)
    if (!slide) return res.status(404).json({ error: 'Slide not found' })
    res.json({ message: 'Slide deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
