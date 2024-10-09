function calculateTotalPrice(dailyRate, daysRented) {
    let totalPrice = 0;

    for (let day = 1; day <= daysRented; day++) {
        let discount = 0;

        // Calculate the discount based on the week
        if (day >= 8 && day < 15) {
            discount = 0.05; // 5% discount from day 8 to day 14
        } else if (day >= 15 && day < 22) {
            discount = 0.10; // 10% discount from day 15 to day 21
        } else if (day >= 22 && day < 29) {
            discount = 0.15; // 15% discount from day 22 to day 28
        } else if (day >= 29 && day < 36) {
            discount = 0.20; // 20% discount from day 29 to day 35
        } else if (day >= 36 && day < 43) {
            discount = 0.25; // 25% discount from day 36 to day 42
        } else if (day >= 43 && day < 50) {
            discount = 0.30; // 30% discount from day 43 to day 49
        } else if (day >= 50 && day < 57) {
            discount = 0.35; // 35% discount from day 50 to day 56
        } else if (day >= 57 && day < 64) {
            discount = 0.40; // 40% discount from day 57 to day 63
        } else if (day >= 64 && day < 71) {
            discount = 0.45; // 45% discount from day 64 to day 70
        } else if (day >= 71) {
            discount = 0.50; // Cap at 50% discount after 11th week (71 days)
        }

        // Add the price for the day with discount applied
        totalPrice += dailyRate * (1 - discount);
    }

    return totalPrice;
}

// Example usage: Calculate the price for 30 days with a daily rate of $10
const dailyRate = 10;
const daysRented = 30;
const totalMonthlyPrice = calculateTotalPrice(dailyRate, daysRented);

console.log(`Total price for ${daysRented} days: $${totalMonthlyPrice.toFixed(2)}`);
