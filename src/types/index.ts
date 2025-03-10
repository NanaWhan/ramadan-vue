/**
 * Team member type definition
 */
export interface TeamMember {
    name: string
    role: string
    organization: string
    image: string
}

/**
 * News item type definition
 */
export interface NewsItem {
    title: string
    description: string
    image: string
}

/**
 * Donation option type definition
 */
export interface DonationOption {
    title: string
    price: string
    amount: number
}

/**
 * Contact form data type definition
 */
export interface ContactFormData {
    name: string
    email: string
    message: string
}

/**
 * Volunteer form data type definition
 */
export interface VolunteerFormData {
    name: string
    email: string
    phone: string
    message: string
}

/**
 * Mobile money form data type definition
 */
export interface MobileMoneyFormData {
    email: string
    name: string
    name: string
    email: string
    network: string
    phone: string
    amount: number
}

/**
 * Card payment form data type definition
 */
export interface CardPaymentFormData {
    phone: any
    email: any
    email: any
    phone: any
    number: string
    expiry: string
    cvv: string
    name: string
    amount: number
}

/**
 * Event registration form data type definition
 */
export interface RegistrationFormData {
    name: string
    email: string
    phone: string
    numberOfPeople: number
}

/**
 * Resource item type definition
 */
export interface ResourceItem {
    title: string
    items: string[]
    link: string
}