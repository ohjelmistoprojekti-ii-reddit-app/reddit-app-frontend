import { getTimeframeDays } from "@/lib/utils/timeframe";
import { describe, it, expect } from "vitest";

describe('getTimeframeDays', () => {
    it('should return correct days for valid timeframe', () => {
        expect(getTimeframeDays("3d")).toBe(3);
        expect(getTimeframeDays("7d")).toBe(7);
        expect(getTimeframeDays("14d")).toBe(14);
        expect(getTimeframeDays("30d")).toBe(30);
        expect(getTimeframeDays("60d")).toBe(60);
        expect(getTimeframeDays("90d")).toBe(90);
    });

    it('should return default days (7) for invalid or undefined timeframe', () => {
        expect(getTimeframeDays("invalid")).toBe(7);
        expect(getTimeframeDays(undefined)).toBe(7);
    });
});