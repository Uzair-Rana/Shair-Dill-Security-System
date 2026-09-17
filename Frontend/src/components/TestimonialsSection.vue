<script setup lang="ts">
interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: 'Ahmed Hassan',
    role: 'Facility Manager',
    company: 'Lahore Corporate Tower',
    content:
      'SDSSS transformed our security operations. Their 24/7 monitoring and rapid response team have significantly reduced security incidents across our facility.',
    rating: 5,
  },
  {
    name: 'Fatima Khan',
    role: 'Operations Director',
    company: 'Karachi Shopping Mall',
    content:
      'The biometric access control system is seamless and reliable. We\'ve seen a 40% improvement in access management efficiency since implementation.',
    rating: 5,
  },
  {
    name: 'Khalid Ahmed',
    role: 'Security Head',
    company: 'Islamabad Tech Park',
    content:
      'Professional team, cutting-edge technology, and exceptional service. SDSSS is our trusted security partner for all our facilities.',
    rating: 5,
  },
  {
    name: 'Samina Iqbal',
    role: 'Building Administrator',
    company: 'Multan Medical Center',
    content:
      'The CCTV system quality is outstanding. Crystal clear footage and intuitive dashboard make monitoring effortless. Highly recommended!',
    rating: 5,
  },
]
</script>

<template>
  <section class="testimonials-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">What Our Clients Say</h2>
        <p class="section-subtitle">
          Trusted by leading organizations across Pakistan
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="testimonials-grid">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card">
          <!-- Rating Stars -->
          <div class="stars">
            <span v-for="i in 5" :key="i" class="star">★</span>
          </div>

          <!-- Quote -->
          <p class="quote">{{ testimonial.content }}</p>

          <!-- Author Info -->
          <div class="author-info">
            <div class="author-avatar">
              {{ testimonial.name.charAt(0) }}
            </div>
            <div class="author-details">
              <p class="author-name">{{ testimonial.name }}</p>
              <p class="author-role">{{ testimonial.role }}</p>
              <p class="author-company">{{ testimonial.company }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  width: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: #0f172a;
  margin: 0 0 16px 0;
  font-family: 'Playfair Display', serif;
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #475569;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
  font-weight: 500;
}

/* Testimonials Grid */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  width: 100%;
  perspective: 1200px;
}

/* Testimonial Card */
.testimonial-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 40px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow:
    0 50px 100px rgba(0, 0, 0, 8%),
    0 0 40px rgba(59, 130, 246, 0.15);
  transform-style: preserve-3d;
  transform: translateZ(10px);
}

.testimonial-card:hover {
  border-color: #3b82f6;
  box-shadow:
    0 60px 120px rgba(59, 130, 246, 0.15),
    0 0 50px rgba(59, 130, 246, 0.2);
  transform: translateZ(20px) translateY(-8px);
}

/* Stars */
.stars {
  display: flex;
  gap: 4px;
}

.star {
  font-size: 1.25rem;
  color: #fbbf24;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Quote */
.quote {
  font-size: 1rem;
  line-height: 1.7;
  color: #334155;
  margin: 0;
  font-style: italic;
}

/* Author Info */
.author-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.author-name {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.author-role {
  font-size: 0.8125rem;
  color: #475569;
  margin: 0;
}

.author-company {
  font-size: 0.75rem;
  color: #3b82f6;
  margin: 0;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .testimonials-section {
    padding: 40px 0;
  }

  .container {
    padding: 0 16px;
  }

  .section-header {
    margin-bottom: 32px;
  }

  .section-title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .testimonial-card {
    padding: 24px;
  }
}
</style>
