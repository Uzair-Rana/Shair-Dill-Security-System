<script setup lang="ts">
import BeltHeroSlider from './BeltHeroSlider.vue'

import dahuaDomeImg from '../assets/products/hikvision-ds-2de4225iw-de.jpg'
import biometricTerminalImg from '../assets/products/ChatGPT Image Sep 20, 2026, 02_36_23 AM.png'
import commandCenterImg from '../assets/products/ChatGPT Image Sep 20, 2026, 02_47_35 AM.png'
import guardImg from '../assets/Backgrounds/security_guard.png'

interface Slide {
  id: number
  image?: string
  video?: string
  heading: string
  description: string
  ctaText: string
  ctaLink: string
}

const heroSlides: Slide[] = [
  {
    id: 1,
    video: '/first-vision.mp4',
    heading: 'Advanced Security Solutions',
    description: 'Cutting-edge biometric access control and surveillance technology delivering unmatched facility protection and seamless entry management.',
    ctaText: 'Explore Our Solutions',
    ctaLink: '#solutions',
  },
  {
    id: 2,
    image: biometricTerminalImg,
    heading: 'Biometric Access Control',
    description: 'Advanced facial recognition and fingerprint technology for secure access management with real-time alerts.',
    ctaText: 'Learn More',
    ctaLink: '#biometric',
  },
  {
    id: 3,
    image: dahuaDomeImg,
    heading: 'Dome CCTV Systems',
    description: 'High-definition surveillance cameras equipped with smart night vision and 360-degree coverage for complete facility protection.',
    ctaText: 'Explore CCTV Solutions',
    ctaLink: '#cctv',
  },
  {
    id: 4,
    image: commandCenterImg,
    heading: 'Command Center Interface',
    description: 'Centralized monitoring dashboard with real-time telemetry, threat detection, and remote system management in one intuitive platform.',
    ctaText: 'View Dashboard',
    ctaLink: '#dashboard',
  },
  {
    id: 5,
    image: guardImg,
    heading: 'On-Site Security Officers',
    description: 'Trained static guards and patrol officers dedicated to immediate threat response and facility protection with professional expertise.',
    ctaText: 'Hire Security Staff',
    ctaLink: '#security-staff',
  },
]