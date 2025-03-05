// src/services/donationService.ts

import { ref } from 'vue'
import type { MobileMoneyFormData, CardPaymentFormData } from '@/types'

// Types
export interface DonationResponse {
    success: boolean
    transactionId?: string
    message: string
}

export interface DonationDetails {
    method: string
    amount: number
    transactionId: string
    date: Date
    details: any
}

// Create a reactive state for donation history and donation progress
const donationHistory = ref<DonationDetails[]>([])
const currentDonation = ref<DonationDetails | null>(null)
const donationStep = ref(1)
const donationSteps = ['Payment Method', 'Enter Details', 'Confirm', 'Complete']
const processingDonation = ref(false)
const donationError = ref<string | null>(null)

/**
 * DonationService provides centralized functionality for handling donations across the application
 */
export const DonationService = {
    /**
     * Initialize a new donation process
     * @param amount - Initial donation amount
     * @param method - Payment method (optional)
     */
    initiateDonation(amount: number, method?: string) {
        currentDonation.value = {
            method: method || 'mobile-money',
            amount,
            transactionId: '',
            date: new Date(),
            details: {}
        }
        donationStep.value = 1
        donationError.value = null
        return { currentDonation, donationStep, donationSteps }
    },

    /**
     * Update donation amount
     */
    updateAmount(amount: number) {
        if (currentDonation.value) {
            currentDonation.value.amount = amount
        }
    },

    /**
     * Update payment method
     */
    updatePaymentMethod(method: string) {
        if (currentDonation.value) {
            currentDonation.value.method = method
        }
        return currentDonation
    },

    /**
     * Go to next donation step
     */
    nextStep() {
        if (donationStep.value < donationSteps.length) {
            donationStep.value++
        }
        return donationStep.value
    },

    /**
     * Go to previous donation step
     */
    prevStep() {
        if (donationStep.value > 1) {
            donationStep.value--
        }
        return donationStep.value
    },

    /**
     * Go to a specific step
     */
    goToStep(step: number) {
        if (step >= 1 && step <= donationSteps.length) {
            donationStep.value = step
        }
        return donationStep.value
    },

    /**
     * Process mobile money donation
     */
    async processMobileMoneyDonation(formData: MobileMoneyFormData): Promise<DonationResponse> {
        processingDonation.value = true
        donationError.value = null

        try {
            // In a real implementation, this would call your backend API
            // Simulating API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Generate mock transaction ID
            const transactionId = 'MM-' + Math.random().toString(36).substring(2, 10).toUpperCase()

            if (currentDonation.value) {
                currentDonation.value.details = formData
                currentDonation.value.transactionId = transactionId
                donationHistory.value.push({ ...currentDonation.value })
            }

            processingDonation.value = false
            return {
                success: true,
                transactionId,
                message: 'Mobile money payment processed successfully'
            }
        } catch (error) {
            processingDonation.value = false
            donationError.value = 'Failed to process mobile money payment. Please try again.'
            return {
                success: false,
                message: donationError.value
            }
        }
    },

    /**
     * Process card payment donation
     */
    async processCardPayment(formData: CardPaymentFormData): Promise<DonationResponse> {
        processingDonation.value = true
        donationError.value = null

        try {
            // In a real implementation, this would call your backend API
            // Simulating API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Generate mock transaction ID
            const transactionId = 'CP-' + Math.random().toString(36).substring(2, 10).toUpperCase()

            if (currentDonation.value) {
                currentDonation.value.details = formData
                currentDonation.value.transactionId = transactionId
                donationHistory.value.push({ ...currentDonation.value })
            }

            processingDonation.value = false
            return {
                success: true,
                transactionId,
                message: 'Card payment processed successfully'
            }
        } catch (error) {
            processingDonation.value = false
            donationError.value = 'Failed to process card payment. Please try again.'
            return {
                success: false,
                message: donationError.value
            }
        }
    },

    /**
     * Record bank transfer donation
     */
    recordBankTransfer(details: any): DonationResponse {
        try {
            // Generate mock transaction ID
            const transactionId = 'BT-' + Math.random().toString(36).substring(2, 10).toUpperCase()

            if (currentDonation.value) {
                currentDonation.value.details = details
                currentDonation.value.transactionId = transactionId
                donationHistory.value.push({ ...currentDonation.value })
            }

            return {
                success: true,
                transactionId,
                message: 'Bank transfer recorded successfully'
            }
        } catch (error) {
            donationError.value = 'Failed to record bank transfer. Please try again.'
            return {
                success: false,
                message: donationError.value
            }
        }
    },

    /**
     * Get current donation details
     */
    getCurrentDonation() {
        return {
            donation: currentDonation,
            step: donationStep,
            steps: donationSteps,
            processing: processingDonation,
            error: donationError
        }
    },

    /**
     * Get donation history
     */
    getDonationHistory() {
        return donationHistory
    },

    /**
     * Reset current donation
     */
    resetDonation() {
        currentDonation.value = null
        donationStep.value = 1
        donationError.value = null
        processingDonation.value = false
    }
}

export default DonationService