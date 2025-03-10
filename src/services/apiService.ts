// src/services/apiService.ts

const API_BASE_URL = 'https://ramadan-relief.azurewebsites.net/api';

// Response types
export interface ApiResponse<T> {
    statusCode: number;
    isSuccess: boolean;
    message: string | null;
    result: T;
    errors: string[] | null;
}

// DTO types for requests
export interface CreateDonationRequest {
    amount: number;
    paymentMethod: string;
    donorName: string;
    donorEmail: string;
    donorPhone: string;
    campaignSource: string;
}

export interface DonationResponse {
    reference: string;
    paymentLink?: string;
    status: string;
    amount: number;
    currency: string;
}

export interface DonationStatistics {
    id: number;
    totalDonations: number;
    totalDonors: number;
    mealsServed: number;
    lastUpdated: string;
}

export interface EventRegistrationRequest {
    fullName: string;
    email: string;
    phoneNumber: string;
    numberOfPeople: number;
    eventId: string;
}

export interface NewsletterRequest {
    phoneNumber: string;
}

export interface PartnerRegistrationRequest {
    organizationName: string;
    contactPerson: string;
    email: string;
    phone: string;
    city: string;
    message: string;
}

export interface VolunteerRegistrationRequest {
    name: string;
    email: string;
    phone: string;
    city: string;
    message: string;
}

// API client
const ApiService = {
    /**
     * Create a donation and generate a payment link
     */
    async createDonation(donationData: CreateDonationRequest): Promise<ApiResponse<DonationResponse>> {
        try {
            const response = await fetch(`${API_BASE_URL}/donations/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify(donationData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create donation');
            }

            return data;
        } catch (error) {
            console.error('Error creating donation:', error);
            throw error;
        }
    },

    /**
     * Get donation statistics
     */
    async getDonationStatistics(): Promise<ApiResponse<DonationStatistics>> {
        try {
            const response = await fetch(`${API_BASE_URL}/donations/statistics`, {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch donation statistics');
            }

            return data;
        } catch (error) {
            console.error('Error fetching donation statistics:', error);
            throw error;
        }
    },

    /**
     * Get donation list
     */
    async getDonationList(): Promise<ApiResponse<any[]>> {
        try {
            const response = await fetch(`${API_BASE_URL}/donations`, {
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch donation list');
            }

            return data;
        } catch (error) {
            console.error('Error fetching donation list:', error);
            throw error;
        }
    },

    /**
     * Recalculate donation statistics
     */
    async recalculateDonationStatistics(authToken: string): Promise<ApiResponse<DonationStatistics>> {
        try {
            const response = await fetch(`${API_BASE_URL}/donations/statistics/recalculate`, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to recalculate donation statistics');
            }

            return data;
        } catch (error) {
            console.error('Error recalculating donation statistics:', error);
            throw error;
        }
    },

    /**
     * Register for an event
     */
    async registerForEvent(registrationData: EventRegistrationRequest): Promise<any> {
        try {
            const response = await fetch(`${API_BASE_URL}/events/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify(registrationData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to register for event');
            }

            return data;
        } catch (error) {
            console.error('Error registering for event:', error);
            throw error;
        }
    },

    /**
     * Subscribe to newsletter
     */
    async subscribeToNewsletter(newsletterData: NewsletterRequest): Promise<any> {
        try {
            const response = await fetch(`${API_BASE_URL}/newsletter/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify(newsletterData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to subscribe to newsletter');
            }

            return data;
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            throw error;
        }
    },

    /**
     * Register as a partner
     */
    async registerPartner(partnerData: PartnerRegistrationRequest): Promise<any> {
        try {
            const response = await fetch(`${API_BASE_URL}/partners/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify(partnerData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to register partner');
            }

            return data;
        } catch (error) {
            console.error('Error registering partner:', error);
            throw error;
        }
    },

    /**
     * Register as a volunteer
     */
    async registerVolunteer(volunteerData: VolunteerRegistrationRequest): Promise<any> {
        try {
            const response = await fetch(`${API_BASE_URL}/volunteers/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify(volunteerData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to register volunteer');
            }

            return data;
        } catch (error) {
            console.error('Error registering volunteer:', error);
            throw error;
        }
    }
};

export default ApiService;