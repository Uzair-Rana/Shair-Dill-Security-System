<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  image: string
  title?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  name?: string
  price?: string
  tag?: string
}

const props = withDefaults(defineProps<Props>(), {
  ctaText: 'Learn More',
  ctaLink: '#',
  name: '',
  price: '',
  tag: '',
})

const emit = defineEmits<{
  addToCart: [{ name: string; price: string }]
}>()

const isAdding = ref(false)

const handleAddToCart = () => {
  isAdding.value = true
  emit('addToCart', {
    name: props.name || props.title || '',
    price: props.price || '',
  })
  setTimeout(() => {
    isAdding.value = false
  }, 1500)
}

// Determine if this is a shop product card or regular product card
const isShopProduct = computed(() => !!props.price)
</script>

<template>
  <div class="product-card" :class="{ 'shop-card': isShopProduct }">
    <!-- Image Section -->
    <div class="card-image">
      <img :src="image" :alt="name || title" class="image" />

      <!-- Tag Badge (Shop Products Only) -->
      <div v-if="isShopProduct && tag" class="tag-badge">
        {{ tag }}
      </div>
    </div>

    <!-- Content Section -->
    <div class="card-content">
      <!-- Shop Product View -->
      <template v-if="isShopProduct">
        <h3 class="card-title">{{ name }}</h3>
        <p class="card-price">{{ price }}</p>
        <button
          @click="handleAddToCart"
          :disabled="isAdding"
          :class="{ 'adding': isAdding }"
          class="add-to-cart-btn"
        >
          <span v-if="isAdding">✓ Added to Cart</span>
          <span v-else>Add to Cart</span>
        </button>
      </template>

      <!-- Regular Product View -->
      <template v-else>
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-description">{{ description }}</p>
        <a :href="ctaLink" class="card-link">
          {{ ctaText }} →
        </a>
      </template>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  height: 100%;
}

.product-card:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  transform: translateY(-6px);
}

/* Card Image */
.card-image {
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: linear-gradient(to br, #f1f5f9, #e2e8f0);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .image {
  transform: scale(1.08);
}

/* Card Content */
.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.3;
  font-family: 'Playfair Display', serif;
  margin: 0;
}

.card-description {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;
  margin: 0;
  flex-grow: 1;
}

.card-link {
  display: inline-block;
  margin-top: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #3b82f6;
  text-decoration: none;
  transition: all 0.3s ease;
  align-self: flex-start;
}

.card-link:hover {
  color: #1e40af;
  gap: 4px;
  letter-spacing: 1px;
}

/* Shop Product Card Styles */
.product-card.shop-card .card-image {
  position: relative;
}

.tag-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #3b82f6;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.product-card.shop-card .card-title {
  font-size: 1rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-price {
  font-size: 1.5rem;
  font-weight: 900;
  color: #3b82f6;
  margin: 8px 0 0 0;
}

.add-to-cart-btn {
  width: 100%;
  padding: 12px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #2563eb;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

.add-to-cart-btn:active:not(:disabled) {
  transform: translateY(0);
}

.add-to-cart-btn.adding {
  background: #10b981;
}

.add-to-cart-btn:disabled {
  opacity: 0.9;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .product-card {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  }

  .card-image {
    height: 180px;
  }

  .card-content {
    padding: 16px;
  }

  .card-title {
    font-size: 1rem;
  }
}
</style>
