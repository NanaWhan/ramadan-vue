// src/services/donationService.ts

import { ref } from 'vue'
import ApiService from './apiService'
import type { MobileMoneyFormData, CardPaymentFormData } from '@/types'

// Types
export interface DonationResponse {
    success: boolean
    transactionId?: string
    message: string
    paymentLink?: string
}

export interface DonationDetails {
    method: string
    amount: number
    transactionId: string
    date: Date
    details: any
    status: string
}

export interface DonationCallbackResult {
    transactionId: string
    amount: number
    success: boolean
    status: string
    message: string
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
            details: {},
            status: 'pending'
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
            // Prepare data for API
            const donationData = {
                amount: formData.amount,
                paymentMethod: 'mobile_money',
                donorName: formData.name || 'Anonymous',
                donorEmail: formData.email || 'anonymous@example.com',
                donorPhone: formData.phone,
                campaignSource: 'website'
            }

            // Call API
            const response = await ApiService.createDonation(donationData)

            if (response && response.isSuccess) {
                // Update current donation
                if (currentDonation.value) {
                    currentDonation.value.details = formData
                    currentDonation.value.transactionId = response.result?.reference || ''

                    // Store in history
                    donationHistory.value.push({ ...currentDonation.value })
                }

                processingDonation.value = false

                // Check if there's a payment link to redirect to
                if (response.result?.paymentLink) {
                    return {
                        success: true,
                        transactionId: response.result.reference,
                        message: 'Redirecting to payment gateway...',
                        paymentLink: response.result.paymentLink
                    }
                }

                return {
                    success: true,
                    transactionId: response.result?.reference,
                    message: 'Mobile money payment processed successfully'
                }
            } else {
                throw new Error(response.message || 'Failed to process mobile money payment')
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
            // Prepare data for API
            const donationData = {
                amount: formData.amount,
                paymentMethod: 'card_payment',
                donorName: formData.name,
                donorEmail: formData.email,
                donorPhone: formData.phone,
                campaignSource: 'website'
            }

            // Call API
            const response = await ApiService.createDonation(donationData)

            if (response && response.isSuccess) {
                // Update current donation
                if (currentDonation.value) {
                    currentDonation.value.details = formData
                    currentDonation.value.transactionId = response.result?.reference || ''

                    // Store in history
                    donationHistory.value.push({ ...currentDonation.value })
                }

                processingDonation.value = false

                // Check if there's a payment link to redirect to
                if (response.result?.paymentLink) {
                    return {
                        success: true,
                        transactionId: response.result.reference,
                        message: 'Redirecting to payment gateway...',
                        paymentLink: response.result.paymentLink
                    }
                }

                return {
                    success: true,
                    transactionId: response.result?.reference,
                    message: 'Card payment processed successfully'
                }
            } else {
                throw new Error(response.message || 'Failed to process card payment')
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
     * Process a bank transfer donation
     */
    async processBankTransfer(details: any): Promise<DonationResponse> {
        processingDonation.value = true
        donationError.value = null

        try {
            // Prepare data for API
            const donationData = {
                amount: details.amount,
                paymentMethod: 'bank_transfer',
                donorName: details.name,
                donorEmail: details.email,
                donorPhone: details.phone,
                campaignSource: 'website'
            }

            // Call API
            const response = await ApiService.createDonation(donationData)

            if (response && response.isSuccess) {
                // Update current donation
                if (currentDonation.value) {
                    currentDonation.value.details = details
                    currentDonation.value.transactionId = response.result?.reference || ''

                    // Store in history
                    donationHistory.value.push({ ...currentDonation.value })
                }

                processingDonation.value = false

                // Check if there's a payment link to redirect to
                if (response.result?.paymentLink) {
                    return {
                        success: true,
                        transactionId: response.result.reference,
                        message: 'Redirecting to payment gateway...',
                        paymentLink: response.result.paymentLink
                    }
                }

                return {
                    success: true,
                    transactionId: response.result?.reference,
                    message: 'Bank transfer recorded successfully'
                }
            } else {
                throw new Error(response.message || 'Failed to record bank transfer')
            }
        } catch (error) {
            processingDonation.value = false
            donationError.value = 'Failed to record bank transfer. Please try again.'
            return {
                success: false,
                message: donationError.value
            }
        }
    },

    /**
     * Handle donation callback (after payment gateway return)
     * This can be called when user is redirected back from a payment gateway
     */
    handleDonationCallback(params: URLSearchParams): DonationCallbackResult {
        // Extract parameters from URL
        const transactionId = params.get('transaction_id') || params.get('tx_ref') || params.get('reference') || ''
        const status = params.get('status') || params.get('payment_status') || ''
        const amount = Number(params.get('amount') || '0')
        const message = params.get('message') || ''

        // Determine if payment was successful based on status
        const isSuccess = status.toLowerCase() === 'success' ||
            status.toLowerCase() === 'completed' ||
            status.toLowerCase() === 'approved'

        // If we have a transaction ID in history, update its status
        if (transactionId) {
            const existingDonation = donationHistory.value.find(d => d.transactionId === transactionId)
            if (existingDonation) {
                existingDonation.status = isSuccess ? 'success' : 'failed'
            }
        }

        return {
            transactionId,
            amount,
            success: isSuccess,
            status,
            message: message || (isSuccess ? 'Payment successful' : 'Payment failed')
        }
    },

    /**
     * Verify donation status
     * This can be used to check the status of a donation with the backend
     */
    async verifyDonationStatus(transactionId: string): Promise<DonationCallbackResult> {
        try {
            // Here you would call an API endpoint to verify the payment status
            // For now, we'll check our local donation history
            const existingDonation = donationHistory.value.find(d => d.transactionId === transactionId)

            if (existingDonation) {
                return {
                    transactionId,
                    amount: existingDonation.amount,
                    success: existingDonation.status === 'success',
                    status: existingDonation.status,
                    message: existingDonation.status === 'success' ? 'Payment verified' : 'Payment verification failed'
                }
            } else {
                // If not found in history, try to fetch from API
                try {
                    const donations = await ApiService.getDonationList()

                    if (donations && donations.isSuccess && donations.result.length > 0) {
                        const matchingDonation = donations.result.find(d => d.reference === transactionId)

                        if (matchingDonation) {
                            return {
                                transactionId,
                                amount: matchingDonation.amount,
                                success: matchingDonation.status.toLowerCase() === 'success',
                                status: matchingDonation.status,
                                message: 'Payment verified from API'
                            }
                        }
                    }
                } catch (apiError) {
                    console.error('Error fetching donation details from API:', apiError)
                }

                // If not found in API either, return unknown status
                return {
                    transactionId,
                    amount: 0,
                    success: false,
                    status: 'unknown',
                    message: 'Cannot verify payment status'
                }
            }
        } catch (error) {
            console.error('Error verifying donation status:', error)
            return {
                transactionId,
                amount: 0,
                success: false,
                status: 'error',
                message: 'Error verifying payment status'
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