import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { MongoMemoryServer } from 'mongodb-memory-server'
import HeroSlide from '../models/HeroSlide.js'
import Product from '../models/Product.js'
import Feature from '../models/Feature.js'
import Stat from '../models/Stat.js'
import Testimonial from '../models/Testimonial.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sdsss'

async function getMongoUri() {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI
  }

  try {
    const memoryMongo = await MongoMemoryServer.create()
    return memoryMongo.getUri()
  } catch (error) {
    console.warn('MongoMemoryServer unavailable, falling back to localhost MongoDB:', error.message)
    return MONGODB_URI
  }
}

const heroSlides = [
  {
    id: 1,
    title: 'Dome CCTV Systems',
    heading: 'Dome CCTV Systems',
    description: 'High-definition surveillance cameras equipped with smart night vision and 360-degree coverage for complete facility protection.',
    image: 'https://via.placeholder.com/1200x600?text=Dome+CCTV',
    ctaText: 'Explore CCTV Solutions',
    ctaLink: '#cctv',
    order: 0,
    isActive: true,
  },
  {
    id: 2,
    title: 'Biometric Access Control',
    heading: 'Biometric Access Control',
    description: 'Advanced facial recognition and fingerprint technology for secure access management with real-time alerts and comprehensive audit logs.',
    image: 'https://via.placeholder.com/1200x600?text=Biometric+Access',
    ctaText: 'Learn About Access Control',
    ctaLink: '#biometric',
    order: 1,
    isActive: true,
  },
  {
    id: 3,
    title: 'Command Center Interface',
    heading: 'Command Center Interface',
    description: 'Centralized monitoring dashboard with real-time telemetry, threat detection, and remote system management in one intuitive platform.',
    image: 'https://via.placeholder.com/1200x600?text=Command+Center',
    ctaText: 'View Dashboard',
    ctaLink: '#dashboard',
    order: 2,
    isActive: true,
  },
  {
    id: 4,
    title: 'On-Site Security Officers',
    heading: 'On-Site Security Officers',
    description: 'Trained static guards and patrol officers dedicated to immediate threat response and facility protection with professional expertise.',
    image: 'https://via.placeholder.com/1200x600?text=Security+Officers',
    ctaText: 'Hire Security Staff',
    ctaLink: '#security-staff',
    order: 3,
    isActive: true,
  },
]

const products = [
  {
    title: 'ANPR Camera Systems',
    description: 'Automatic Number Plate Recognition for vehicle tracking and access control.',
    image: 'https://via.placeholder.com/300x240?text=ANPR+Camera',
    category: 'cameras',
    ctaText: 'Explore',
    ctaLink: '#anpr',
    order: 0,
    isActive: true,
  },
  {
    title: 'Biometric Turnstile Gates',
    description: 'High-security access gates with integrated biometric verification.',
    image: 'https://via.placeholder.com/300x240?text=Turnstile+Gate',
    category: 'access-control',
    ctaText: 'Learn More',
    ctaLink: '#turnstile',
    order: 1,
    isActive: true,
  },
  {
    title: 'Alarm & Siren Systems',
    description: 'Strobe lights and sirens for emergency alerts and perimeter protection.',
    image: 'https://via.placeholder.com/300x240?text=Alarm+System',
    category: 'alarms',
    ctaText: 'View',
    ctaLink: '#alarm',
    order: 2,
    isActive: true,
  },
  {
    title: 'Motion Sensors',
    description: 'Advanced motion detection with minimal false alarms and smart triggers.',
    image: 'https://via.placeholder.com/300x240?text=Motion+Sensor',
    category: 'sensors',
    ctaText: 'Discover',
    ctaLink: '#motion',
    order: 3,
    isActive: true,
  },
  {
    title: 'PTZ Speed Dome Cameras',
    description: 'Pan-Tilt-Zoom cameras with motorized control and automated tracking.',
    image: 'https://via.placeholder.com/300x240?text=PTZ+Camera',
    category: 'cameras',
    ctaText: 'Explore',
    ctaLink: '#ptz',
    order: 4,
    isActive: true,
  },
  {
    title: 'RFID Card Readers',
    description: 'Contactless access control using RFID technology for seamless entry.',
    image: 'https://via.placeholder.com/300x240?text=RFID+Reader',
    category: 'access-control',
    ctaText: 'Learn More',
    ctaLink: '#rfid',
    order: 5,
    isActive: true,
  },
  {
    title: 'Smart Door Controllers',
    description: 'Touchscreen-based access control with real-time monitoring.',
    image: 'https://via.placeholder.com/300x240?text=Door+Controller',
    category: 'access-control',
    ctaText: 'View',
    ctaLink: '#controller',
    order: 6,
    isActive: true,
  },
  {
    title: 'Video Doorbells',
    description: 'Smart video doorbells with 24/7 monitoring and two-way audio.',
    image: 'https://via.placeholder.com/300x240?text=Video+Doorbell',
    category: 'monitoring',
    ctaText: 'Discover',
    ctaLink: '#doorbell',
    order: 7,
    isActive: true,
  },
  {
    title: 'Smart Door Locks',
    description: 'Electronic magnetic locks with secure access management.',
    image: 'https://via.placeholder.com/300x240?text=Door+Lock',
    category: 'access-control',
    ctaText: 'Explore',
    ctaLink: '#doorlock',
    order: 8,
    isActive: true,
  },
  {
    title: 'Wireless Beam Detectors',
    description: 'Perimeter protection with wireless infrared beam technology.',
    image: 'https://via.placeholder.com/300x240?text=Beam+Detector',
    category: 'sensors',
    ctaText: 'Learn More',
    ctaLink: '#beam',
    order: 9,
    isActive: true,
  },
  {
    title: 'Turret Cameras',
    description: 'Compact dome cameras with exceptional image quality and durability.',
    image: 'https://via.placeholder.com/300x240?text=Turret+Camera',
    category: 'cameras',
    ctaText: 'View',
    ctaLink: '#turret',
    order: 10,
    isActive: true,
  },
  {
    title: 'Under-Vehicle Inspection',
    description: 'Automated vehicle scanning for security checkpoints.',
    image: 'https://via.placeholder.com/300x240?text=UVIS+System',
    category: 'monitoring',
    ctaText: 'Discover',
    ctaLink: '#uvis',
    order: 11,
    isActive: true,
  },
]

const features = [
  {
    icon: '🎥',
    title: '4K Video Surveillance',
    description: 'Crystal-clear high-definition monitoring with advanced compression and storage.',
    order: 0,
    isActive: true,
  },
  {
    icon: '🔒',
    title: 'Biometric Security',
    description: 'Multi-factor authentication with facial recognition and fingerprint scanning.',
    order: 1,
    isActive: true,
  },
  {
    icon: '📡',
    title: 'Real-time Monitoring',
    description: 'Live 24/7 dashboard access with instant alerts and remote management.',
    order: 2,
    isActive: true,
  },
  {
    icon: '🚨',
    title: 'Smart Threat Detection',
    description: 'AI-powered analytics to identify suspicious activities automatically.',
    order: 3,
    isActive: true,
  },
  {
    icon: '📱',
    title: 'Mobile Integration',
    description: 'Access your security system from anywhere with iOS and Android apps.',
    order: 4,
    isActive: true,
  },
  {
    icon: '🔐',
    title: 'Bank-Grade Encryption',
    description: 'Military-grade security protocols protect all your sensitive data.',
    order: 5,
    isActive: true,
  },
]

const stats = [
  {
    number: '500+',
    label: 'Active Clients',
    description: 'Across corporate, residential, and institutional sectors',
    order: 0,
    isActive: true,
  },
  {
    number: '10K+',
    label: 'Devices Deployed',
    description: 'CCTV cameras, sensors, and access control systems',
    order: 1,
    isActive: true,
  },
  {
    number: '99.9%',
    label: 'System Uptime',
    description: 'Reliable 24/7 monitoring with redundant infrastructure',
    order: 2,
    isActive: true,
  },
  {
    number: '250+',
    label: 'Security Officers',
    description: 'PSQCA-licensed trained professionals nationwide',
    order: 3,
    isActive: true,
  },
]

const testimonials = [
  {
    name: 'Ahmed Hassan',
    role: 'Facility Manager',
    company: 'Lahore Corporate Tower',
    content: 'SDSSS transformed our security operations. Their 24/7 monitoring and rapid response team have significantly reduced security incidents across our facility.',
    rating: 5,
    order: 0,
    isActive: true,
  },
  {
    name: 'Fatima Khan',
    role: 'Operations Director',
    company: 'Karachi Shopping Mall',
    content: "The biometric access control system is seamless and reliable. We've seen a 40% improvement in access management efficiency since implementation.",
    rating: 5,
    order: 1,
    isActive: true,
  },
  {
    name: 'Khalid Ahmed',
    role: 'Security Head',
    company: 'Islamabad Tech Park',
    content: 'Professional team, cutting-edge technology, and exceptional service. SDSSS is our trusted security partner for all our facilities.',
    rating: 5,
    order: 2,
    isActive: true,
  },
  {
    name: 'Samina Iqbal',
    role: 'Building Administrator',
    company: 'Multan Medical Center',
    content: 'The CCTV system quality is outstanding. Crystal clear footage and intuitive dashboard make monitoring effortless. Highly recommended!',
    rating: 5,
    order: 3,
    isActive: true,
  },
]

async function seedDatabase() {
  try {
    const mongoUri = await getMongoUri()
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✓ Connected to MongoDB')

    // Clear existing data
    await HeroSlide.deleteMany({})
    await Product.deleteMany({})
    await Feature.deleteMany({})
    await Stat.deleteMany({})
    await Testimonial.deleteMany({})
    console.log('✓ Cleared existing data')

    // Seed data
    await HeroSlide.insertMany(heroSlides)
    console.log(`✓ Seeded ${heroSlides.length} hero slides`)

    await Product.insertMany(products)
    console.log(`✓ Seeded ${products.length} products`)

    await Feature.insertMany(features)
    console.log(`✓ Seeded ${features.length} features`)

    await Stat.insertMany(stats)
    console.log(`✓ Seeded ${stats.length} stats`)

    await Testimonial.insertMany(testimonials)
    console.log(`✓ Seeded ${testimonials.length} testimonials`)

    console.log('\n✅ Database seeding complete!')
    process.exit(0)
  } catch (error) {
    console.error('✗ Seeding error:', error.message)
    process.exit(1)
  }
}

seedDatabase()
