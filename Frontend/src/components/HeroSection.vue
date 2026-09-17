<script setup lang="ts">
import BeltHeroSlider from './BeltHeroSlider.vue'

import dahuaDomeImg from '../assets/products/Dahua_dome_security_camera_isolated_202609052309.jpeg'
import biometricTerminalImg from '../assets/products/Biometric_scanner_terminal_photo…_202609052309.jpeg'
import commandCenterImg from '../assets/products/Security_dashboard_UI_displaying…_202609052309.jpeg'
import guardImg from '../assets/Backgrounds/security_guard.png'

interface Slide {
  id: number
  image: string
  heading: string
  description: string
  ctaText: string
  ctaLink: string
}

const heroSlides: Slide[] = [
  {
    id: 1,
    image: dahuaDomeImg,
    heading: 'Dome CCTV Systems',
    description: 'High-definition surveillance cameras equipped with smart night vision and 360-degree coverage for complete facility protection.',
    ctaText: 'Explore CCTV Solutions',
    ctaLink: '#cctv',
  },
  {
    id: 2,
    image: biometricTerminalImg,
    heading: 'Biometric Access Control',
    description: 'Advanced facial recognition and fingerprint technology for secure access management with real-time alerts and comprehensive audit logs.',
    ctaText: 'Learn About Access Control',
    ctaLink: '#biometric',
  },
  {
    id: 3,
    image: commandCenterImg,
    heading: 'Command Center Interface',
    description: 'Centralized monitoring dashboard with real-time telemetry, threat detection, and remote system management in one intuitive platform.',
    ctaText: 'View Dashboard',
    ctaLink: '#dashboard',
  },
  {
    id: 4,
    image: guardImg,
    heading: 'On-Site Security Officers',
    description: 'Trained static guards and patrol officers dedicated to immediate threat response and facility protection with professional expertise.',
    ctaText: 'Hire Security Staff',
    ctaLink: '#security-staff',
  },
]
</script>

<template>
  <BeltHeroSlider :slides="heroSlides" :duration="60" />
</template>
