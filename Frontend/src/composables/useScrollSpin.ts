import { onBeforeUnmount, onMounted, ref, type CSSProperties, type Ref } from 'vue'

interface Options {
    /** Viewport fraction where a card starts turning (1 = bottom edge). */
    enter?: number
    /** Viewport fraction where it finishes, fully settled. */
    settle?: number
    /** Degrees turned across the whole travel. */
    spin?: number
    /** Px of extra delay per card, so a row turns as a wave rather than together. */
    stagger?: number
    /** How many cards before the stagger offset repeats (i.e. columns). */
    columns?: number
}

/**
 * Rotation scrubbed by scroll position: each direct child of `container`
 * turns in proportion to how far it has risen through the viewport. Unlike a
 * one-shot reveal this replays every time, and reverses when scrolling back.
 */
export function useScrollSpin(container: Ref<HTMLElement | null>, options: Options = {}) {
    // A narrow enter→settle band means the turn completes in less scrolling,
    // which is what reads as a quicker motion when it is scroll-driven.
    const { enter = 0.88, settle = 0.58, spin = 360, stagger = 18, columns = 4 } = options

    const progress = ref<number[]>([])
    let raf = 0
    let queued = false
    let enabled = true

    const measure = () => {
        const el = container.value
        if (!el || !enabled) return
        const viewport = window.innerHeight || 1
        const from = viewport * enter
        const to = viewport * settle

        progress.value = (Array.from(el.children) as HTMLElement[]).map((child, i) => {
            const offset = (i % columns) * stagger
            const top = child.getBoundingClientRect().top + offset
            return Math.min(1, Math.max(0, (from - top) / (from - to)))
        })
    }

    const onScroll = () => {
        if (queued) return
        queued = true
        raf = requestAnimationFrame(() => {
            queued = false
            measure()
        })
    }

    /**
     * Once settled this returns nothing, handing the transform back to CSS so
     * hover effects still work. While turning it also kills the element's
     * transition, which would otherwise lag the per-frame updates.
     */
    const styleFor = (index: number): CSSProperties => {
        const p = progress.value[index] ?? 0
        if (!enabled || p >= 0.999) return {}
        return {
            transform: `translateY(${(1 - p) * 30}px) rotateY(${p * spin}deg) scale(${0.93 + p * 0.07})`,
            opacity: String(Math.min(1, p * 1.7)),
            transition: 'none',
        }
    }

    onMounted(() => {
        enabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!enabled) return
        measure()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
    })

    onBeforeUnmount(() => {
        cancelAnimationFrame(raf)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
    })

    return { styleFor, measure }
}
