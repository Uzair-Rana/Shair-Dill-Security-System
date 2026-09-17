import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['cameras', 'access-control', 'alarms', 'sensors', 'monitoring', 'other'],
      default: 'other',
    },
    ctaText: {
      type: String,
      default: 'Learn More',
    },
    ctaLink: {
      type: String,
      default: '#',
    },
    price: {
      type: String,
    },
    features: [String],
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

export default mongoose.model('Product', productSchema)
