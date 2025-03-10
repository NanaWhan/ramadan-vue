<template>
  <div class="payment-callback">
    <!-- Payment Processing State -->
    <div v-if="isProcessing" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-xl max-w-md w-full text-center">
        <svg class="animate-spin h-12 w-12 text-accent-color mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 class="text-xl font-bold mb-2">Processing Payment</h3>
        <p class="text-gray-600">Please wait while we process your donation...</p>
      </div>
    </div>

    <!-- Payment Success State -->
    <div v-else-if="paymentSuccess">
      <section class="relative py-20 text-white">
        <!-- Background with overlay -->
        <div class="absolute inset-0 bg-dark-color/60 z-0"></div>
        <img 
          :src="bannerImage" 
          class="absolute inset-0 object-cover w-full h-full z-[-1]"
          alt="Banner" 
        />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-3xl mx-auto text-center">
            <div class="mb-6">
              <div class="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Thank You!</h1>
            <p class="text-xl text-white">
              Your donation has been successfully processed
            </p>
          </div>
        </div>
      </section>

      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto">
            <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
              <div class="text-center mb-8">
                <h2 class="text-3xl font-bold">Payment Successful</h2>
                <p class="text-gray-600">
                  Reference ID: {{ transactionId }}
                </p>
              </div>
              
              <div class="space-y-4 mb-8">
                <div class="flex justify-between py-3 border-b">
                  <span class="text-gray-600">Amount:</span>
                  <span class="font-bold text-xl">GHS {{ amount ? formatNumber(amount) : '0.00' }}</span>
                </div>
                
                <div class="flex justify-between py-3 border-b">
                  <span class="text-gray-600">Status:</span>
                  <span class="text-green-600 font-medium">Completed</span>
                </div>
              </div>
              
              <div class="flex flex-col sm:flex-row justify-center gap-4">
                <RouterLink 
                  to="/donate" 
                  class="bg-accent-color text-dark-color rounded-full px-6 py-3 font-bold hover:bg-yellow-600 transition-colors text-center"
                >
                  View Receipt
                </RouterLink>
                
                <RouterLink 
                  to="/" 
                  class="border border-gray-300 text-gray-700 rounded-full px-6 py-3 font-medium hover:bg-gray-50 transition-colors text-center"
                >
                  Return Home
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Payment Error State -->
    <div v-else-if="paymentError">
      <section class="relative py-20 text-white">
        <!-- Background with overlay -->
        <div class="absolute inset-0 bg-dark-color/60 z-0"></div>
        <img 
          :src="bannerImage" 
          class="absolute inset-0 object-cover w-full h-full z-[-1]"
          alt="Banner" 
        />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-3xl mx-auto text-center">
            <div class="mb-6">
              <div class="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Payment Failed</h1>
            <p class="text-xl text-white">
              We encountered an issue processing your donation
            </p>
          </div>
        </div>
      </section>

      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto">
            <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
              <div class="text-center mb-8">
                <h2 class="text-3xl font-bold">Payment Error</h2>
                <p class="text-gray-600">
                  {{ errorMessage }}
                </p>
              </div>
              
              <div class="flex flex-col sm:flex-row justify-center gap-4">
                <RouterLink 
                  to="/donate" 
                  class="bg-accent-color text-dark-color rounded-full px-6 py-3 font-bold hover:bg-yellow-600 transition-colors text-center"
                >
                  Try Again
                </RouterLink>
                
                <RouterLink 
                  to="/" 
                  class="border border-gray-300 text-gray-700 rounded-full px-6 py-3 font-medium hover:bg-gray-50 transition-colors text-center"
                >
                  Return Home
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import ApiService from '@/services/apiService';
import DonationService from '@/services/donationService';
import bannerImage from '@/assets/images/banner.jpg';

// State management
const isProcessing = ref(true);
const paymentSuccess = ref(false);
const paymentError = ref(false);
const errorMessage = ref('An error occurred while processing your payment.');
const transactionId = ref('');
const amount = ref(0);
const router = useRouter();

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

// Process payment callback
const processPaymentCallback = async () => {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  
  try {
    // Check if this is a payment callback
    const txRef = urlParams.get('tx_ref') || urlParams.get('transaction_id') || urlParams.get('reference');
    const status = urlParams.get('status') || urlParams.get('payment_status');
    
    if (!txRef) {
      throw new Error('No transaction reference found.');
    }
    
    // Determine if payment was successful
    const isSuccess = status ? 
      (status.toLowerCase() === 'success' || 
       status.toLowerCase() === 'completed' || 
       status.toLowerCase() === 'approved') : 
      false;
    
    // Save transaction ID
    transactionId.value = txRef;
    
    // Get amount from URL or default to 0
    amount.value = Number(urlParams.get('amount') || 0);
    
    // Process callback with DonationService
    const callbackResult = DonationService.handleDonationCallback(urlParams);
    
    // Verify transaction with backend if possible
    if (txRef) {
      try {
        const verificationResult = await DonationService.verifyDonationStatus(txRef);
        
        // Update with more accurate information if available
        if (verificationResult.amount) {
          amount.value = verificationResult.amount;
        }
        
        if (verificationResult.success) {
          paymentSuccess.value = true;
        } else {
          paymentError.value = true;
          errorMessage.value = verificationResult.message || 'Payment verification failed.';
        }
      } catch (verifyError) {
        console.error('Error verifying payment:', verifyError);
        
        // Fall back to using the status from URL
        if (isSuccess) {
          paymentSuccess.value = true;
        } else {
          paymentError.value = true;
          errorMessage.value = 'Payment verification failed. Please contact support.';
        }
      }
    } else {
      // No verification possible, use status from URL
      if (isSuccess) {
        paymentSuccess.value = true;
      } else {
        paymentError.value = true;
        errorMessage.value = 'Payment was not completed successfully.';
      }
    }
  } catch (error) {
    console.error('Error processing payment callback:', error);
    paymentError.value = true;
    errorMessage.value = error instanceof Error ? error.message : 'An error occurred while processing your payment.';
  } finally {
    isProcessing.value = false;
  }
};

// Redirect to donation page after delay if successful
const redirectAfterSuccess = () => {
  if (paymentSuccess.value) {
    // Redirect after a delay to allow user to see success message
    setTimeout(() => {
      router.push({
        path: '/donate',
        query: { 
          transaction_id: transactionId.value,
          amount: amount.value,
          status: 'success'
        }
      });
    }, 3000);
  }
};

// Process callback when component mounts
onMounted(async () => {
  await processPaymentCallback();
  redirectAfterSuccess();
});
</script>

<style scoped>
.text-accent-color {
  color: var(--accent-color);
}

.bg-accent-color {
  background-color: var(--accent-color);
}

.text-dark-color {
  color: var(--dark-color);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>