const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: any
}

export async function apiCall<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body } = options

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (body && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error)
    throw error
  }
}

// Hero Slides API
export const heroSlidesAPI = {
  getAll: () => apiCall<any[]>('/hero-slides'),
  getById: (id: string) => apiCall<any>(`/hero-slides/${id}`),
  create: (data: any) => apiCall<any>('/hero-slides', { method: 'POST', body: data }),
  update: (id: string, data: any) => apiCall<any>(`/hero-slides/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => apiCall<any>(`/hero-slides/${id}`, { method: 'DELETE' }),
}

// Products API
export const productsAPI = {
  getAll: () => apiCall<any[]>('/products'),
  getById: (id: string) => apiCall<any>(`/products/${id}`),
  create: (data: any) => apiCall<any>('/products', { method: 'POST', body: data }),
  update: (id: string, data: any) => apiCall<any>(`/products/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => apiCall<any>(`/products/${id}`, { method: 'DELETE' }),
}

// Features API
export const featuresAPI = {
  getAll: () => apiCall<any[]>('/features'),
  getById: (id: string) => apiCall<any>(`/features/${id}`),
  create: (data: any) => apiCall<any>('/features', { method: 'POST', body: data }),
  update: (id: string, data: any) => apiCall<any>(`/features/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => apiCall<any>(`/features/${id}`, { method: 'DELETE' }),
}

// Stats API
export const statsAPI = {
  getAll: () => apiCall<any[]>('/stats'),
  getById: (id: string) => apiCall<any>(`/stats/${id}`),
  create: (data: any) => apiCall<any>('/stats', { method: 'POST', body: data }),
  update: (id: string, data: any) => apiCall<any>(`/stats/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => apiCall<any>(`/stats/${id}`, { method: 'DELETE' }),
}

// Testimonials API
export const testimonialsAPI = {
  getAll: () => apiCall<any[]>('/testimonials'),
  getById: (id: string) => apiCall<any>(`/testimonials/${id}`),
  create: (data: any) => apiCall<any>('/testimonials', { method: 'POST', body: data }),
  update: (id: string, data: any) => apiCall<any>(`/testimonials/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => apiCall<any>(`/testimonials/${id}`, { method: 'DELETE' }),
}
