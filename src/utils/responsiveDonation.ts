// src/utils/responsiveDonation.ts

import { ref, onMounted, onUnmounted, computed } from 'vue'

/**
 * Hook to handle responsive behavior for donation components
 * Returns reactive state and utilities for adapting UI to different screen sizes
 */
export function useResponsiveDonation() {
    // Screen size breakpoints
    const BREAKPOINTS = {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536
    }

    // Current screen width
    const screenWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

    // Current screen size label
    const screenSize = computed(() => {
        if (screenWidth.value >= BREAKPOINTS['2xl']) return '2xl'
        if (screenWidth.value >= BREAKPOINTS.xl) return 'xl'
        if (screenWidth.value >= BREAKPOINTS.lg) return 'lg'
        if (screenWidth.value >= BREAKPOINTS.md) return 'md'
        if (screenWidth.value >= BREAKPOINTS.sm) return 'sm'
        return 'xs'
    })

    // Compute if current screen is mobile
    const isMobile = computed(() => screenWidth.value < BREAKPOINTS.md)

    // Compute if current screen is tablet
    const isTablet = computed(() =>
        screenWidth.value >= BREAKPOINTS.md && screenWidth.value < BREAKPOINTS.lg
    )

    // Compute if current screen is desktop
    const isDesktop = computed(() => screenWidth.value >= BREAKPOINTS.lg)

    // Handle window resize
    const handleResize = () => {
        screenWidth.value = window.innerWidth
    }

    // Dynamic grid columns based on screen size
    const getGridCols = (mobile = 1, tablet = 2, desktop = 3) => {
        if (isDesktop.value) return desktop
        if (isTablet.value) return tablet
        return mobile
    }

    // Dynamic padding based on screen size
    const getPadding = () => {
        if (isDesktop.value) return 'px-6 py-4'
        if (isTablet.value) return 'px-4 py-3'
        return 'px-3 py-2'
    }

    // Dynamic font size based on screen size
    const getFontSize = (base = 'text-base') => {
        if (isDesktop.value) return base
        if (isTablet.value) {
            // Convert text-{size} to one size smaller
            if (base === 'text-xl') return 'text-lg'
            if (base === 'text-lg') return 'text-base'
            if (base === 'text-base') return 'text-sm'
            if (base === 'text-sm') return 'text-xs'
            return base
        }
        // Convert text-{size} to two sizes smaller for mobile
        if (base === 'text-2xl') return 'text-lg'
        if (base === 'text-xl') return 'text-base'
        if (base === 'text-lg') return 'text-sm'
        if (base === 'text-base') return 'text-xs'
        return base
    }

    // Setup window resize listener
    onMounted(() => {
        window.addEventListener('resize', handleResize)
        handleResize() // Call once to initialize
    })

    // Cleanup window resize listener
    onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
    })

    // Donation-specific form helpers for mobile 
    const getFormLayout = () => {
        return {
            labelClass: isMobile.value ? 'text-sm mb-1' : 'mb-2',
            inputClass: isMobile.value ? 'p-2 text-sm' : 'p-3',
            buttonClass: isMobile.value ? 'py-2 px-4 text-sm' : 'py-3 px-6',
            stackFields: isMobile.value, // Stack fields vertically on mobile
            compactLabels: isMobile.value // Show more compact labels on mobile
        }
    }

    return {
        screenWidth,
        screenSize,
        isMobile,
        isTablet,
        isDesktop,
        getGridCols,
        getPadding,
        getFontSize,
        getFormLayout
    }
}

/**
 * Utility to format currency for display based on screen size
 * Will abbreviate larger numbers on small screens
 */
export function formatCurrency(amount: number, currency = 'GHS'): string {
    // Regular formatting for all amounts
    const formatted = amount.toLocaleString()

    // For mobile, abbreviate larger numbers
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        if (amount >= 1000000) {
            return `${currency} ${(amount / 1000000).toFixed(1)}M`
        }
        if (amount >= 1000) {
            return `${currency} ${(amount / 1000).toFixed(1)}K`
        }
    }

    return `${currency} ${formatted}`
}

/**
 * Get appropriate dimensions for buttons based on screen size
 */
export function getDonationButtonSize() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    return {
        padding: isMobile ? 'px-4 py-2' : 'px-6 py-3',
        text: isMobile ? 'text-sm' : 'text-base',
        rounded: 'rounded-full'
    }
}

export default { useResponsiveDonation, formatCurrency, getDonationButtonSize }