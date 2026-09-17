import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Lightweight IntersectionObserver-based scroll reveal.
 * Adds the class `is-visible` to observed elements when they enter the viewport.
 *
 * Usage:
 *   const el = ref<HTMLElement | null>(null)
 *   useScrollReveal(el)
 *   // In template: <div ref="el" class="reveal-up"> ... </div>
 *
 * Or pass a selector string to observe all matching children of a container.
 */
export function useScrollReveal(
    target: Ref<HTMLElement | null>,
    options: IntersectionObserverInit = {},
) {
    let observer: IntersectionObserver | null = null

    onMounted(() => {
        const defaults: IntersectionObserverInit = {
            threshold: 0.12,
            rootMargin: '0px 0px -48px 0px',
            ...options,
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible')
                    observer?.unobserve(entry.target)
                }
            })
        }, defaults)

        if (target.value) {
            observer.observe(target.value)
        }
    })

    onUnmounted(() => {
        observer?.disconnect()
    })
}

/**
 * Observe all children of a container that have a `[data-reveal]` attribute.
 */
export function useChildReveal(
    container: Ref<HTMLElement | null>,
    options: IntersectionObserverInit = {},
) {
    let observer: IntersectionObserver | null = null

    onMounted(() => {
        const defaults: IntersectionObserverInit = {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px',
            ...options,
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible')
                    observer?.unobserve(entry.target)
                }
            })
        }, defaults)

        if (container.value) {
            const children = container.value.querySelectorAll('[data-reveal]')
            children.forEach((el) => observer?.observe(el))
        }
    })

    onUnmounted(() => {
        observer?.disconnect()
    })
}
