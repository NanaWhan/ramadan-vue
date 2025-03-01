/**
 * Class for handling donation counter functionality
 */
export class DonationCounter {
    private totalDonations: number
    private donationGoal: number
    private totalDonors: number
    private mealsServed: number
    private onUpdate: () => void

    /**
     * Create a donation counter
     * @param initialDonations - Initial donation amount
     * @param donationGoal - Goal amount to reach
     * @param initialDonors - Initial number of donors
     * @param initialMeals - Initial number of meals served
     * @param onUpdate - Callback to run when values update
     */
    constructor(
        initialDonations: number,
        donationGoal: number,
        initialDonors: number,
        initialMeals: number,
        onUpdate: () => void
    ) {
        this.totalDonations = initialDonations
        this.donationGoal = donationGoal
        this.totalDonors = initialDonors
        this.mealsServed = initialMeals
        this.onUpdate = onUpdate
    }

    /**
     * Get current total donations
     */
    getTotalDonations(): number {
        return this.totalDonations
    }

    /**
     * Get current donation goal
     */
    getDonationGoal(): number {
        return this.donationGoal
    }

    /**
     * Get current total donors
     */
    getTotalDonors(): number {
        return this.totalDonors
    }

    /**
     * Get current number of meals served
     */
    getMealsServed(): number {
        return this.mealsServed
    }

    /**
     * Get progress percentage
     */
    getProgressPercentage(): number {
        return Math.min(100, Math.round((this.totalDonations / this.donationGoal) * 100))
    }

    /**
     * Add a new donation
     * @param amount - Donation amount
     */
    addDonation(amount: number): void {
        this.totalDonations += amount
        this.totalDonors += 1
        this.mealsServed += Math.floor(amount / 50) // Roughly calculate meals served
        this.onUpdate()
    }

    /**
     * Format number with commas for thousands separators
     * @param num - Number to format
     */
    formatNumber(num: number): string {
        return num.toLocaleString()
    }

    /**
     * Simulate a random donation
     */
    simulateRandomDonation(): void {
        // Random donation between GHS 50 and GHS 2000
        const randomAmount = Math.floor(Math.random() * 1950) + 50
        this.addDonation(randomAmount)
    }

    /**
     * Start periodic donation simulation
     * @param minInterval - Minimum interval in milliseconds
     * @param maxInterval - Maximum interval in milliseconds
     * @param chance - Chance of donation occurring (0-1)
     */
    startSimulation(
        minInterval: number = 30000,
        maxInterval: number = 120000,
        chance: number = 0.5
    ): number {
        return window.setInterval(() => {
            if (Math.random() < chance) {
                this.simulateRandomDonation()
            }
        }, Math.floor(Math.random() * (maxInterval - minInterval)) + minInterval)
    }

    /**
     * Stop donation simulation
     * @param intervalId - Interval ID returned from startSimulation
     */
    stopSimulation(intervalId: number): void {
        clearInterval(intervalId)
    }
}

/**
 * Create a new donation counter with default values
 * @param onUpdate - Callback to run when values update
 */
export function createDonationCounter(onUpdate: () => void): DonationCounter {
    return new DonationCounter(148765, 300000, 324, 5642, onUpdate)
}