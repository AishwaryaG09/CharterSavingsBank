import { calculateRewards } from "./rewardUtils";

describe("Reward Calculation Tests", () => {
  test("No rewards for amount <= 50", () => {
    expect(calculateRewards(50)).toBe(0);
    expect(calculateRewards(30)).toBe(0);
  });

  test("Rewards for amount between 51 and 100", () => {
    expect(calculateRewards(70)).toBe(20);
    expect(calculateRewards(99)).toBe(49);
  });

  test("Rewards for amount > 100", () => {
    expect(calculateRewards(120)).toBe(90); // 50 + (20 * 2)
    expect(calculateRewards(200)).toBe(250); // 50 + (100 * 2)
  });

  test("Fractional values are floored", () => {
    expect(calculateRewards(99.99)).toBe(49);
    expect(calculateRewards(100.75)).toBe(51); // 50 + (0.75 * 2) = 51.5 → 51
  });

  test("Negative amount returns error", () => {
    expect(() => calculateRewards(-10)).toThrow("Invalid amount");
  });

  test("Zero amount returns 0", () => {
    expect(calculateRewards(0)).toBe(0);
  });

  test("Non-numeric input throws error", () => {
    expect(() => calculateRewards("abc")).toThrow("Invalid amount");
    expect(() => calculateRewards(null)).toThrow("Invalid amount");
  });
});
