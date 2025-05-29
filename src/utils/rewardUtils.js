
export function calculateRewards(amount) {
    if (typeof amount !== "number" || isNaN(amount) || amount < 0) {
        throw new Error("Invalid amount");
    }

    if (amount <= 50) return 0;
    if (amount <= 100) return Math.floor(amount - 50);
    return Math.floor((amount - 100) * 2 + 50);
}
