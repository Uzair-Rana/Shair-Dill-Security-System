import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// Import routes
import heroSlidesRoutes from './routes/heroSlides.js'
import productsRoutes from './routes/products.js'
import featuresRoutes from './routes/features.js'
import statsRoutes from './routes/stats.js'
import testimonialsRoutes from './routes/testimonials.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sdsss'

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✓ Connected to MongoDB')
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err.message)
    process.exit(1)
  })

// Routes
app.use('/api/hero-slides', heroSlidesRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/features', featuresRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/testimonials', testimonialsRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SDSSS Backend is running' })
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'SDSSS Security Solutions API',
    version: '1.0.0',
    endpoints: {
      heroSlides: '/api/hero-slides',
      products: '/api/products',
      features: '/api/features',
      stats: '/api/stats',
      testimonials: '/api/testimonials',
      health: '/api/health',
    },
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Something went wrong',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SDSSS Backend server running on http://localhost:${PORT}`)
  console.log(`📚 API Documentation available at http://localhost:${PORT}`)
})

export default app
