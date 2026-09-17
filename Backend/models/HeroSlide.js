import mongoose from 'mongoose'

const heroSlideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    ctaText: {
      type: String,
      required: true,
      default: 'Learn More',
    },
    ctaLink: {
      type: String,
      default: '#',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('HeroSlide', heroSlideSchema)
