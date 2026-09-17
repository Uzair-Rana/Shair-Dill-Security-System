import express from 'express'
import Testimonial from '../models/Testimonial.js'

const router = express.Router()

// Get all active testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1 })
    res.json(testimonials)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single testimonial
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id)
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' })
    res.json(testimonial)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new testimonial
router.post('/', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body)
    await testimonial.save()
    res.status(201).json(testimonial)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update testimonial
router.put('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' })
    res.json(testimonial)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete testimonial
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id)
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' })
    res.json({ message: 'Testimonial deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
