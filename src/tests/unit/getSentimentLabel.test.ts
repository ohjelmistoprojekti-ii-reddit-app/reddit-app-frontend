import { getSentimentLabel } from "@/lib/helpers/getSentimentLabel";
import { describe, it, expect } from "vitest";

describe('getSentimentLabel', () => {
    it('should return "positive" for compound >= 0.05', () => {
        expect(getSentimentLabel(0.1)).toBe('positive');
        expect(getSentimentLabel(0.05)).toBe('positive');
    });

    it('should return "negative" for compound <= -0.05', () => {
        expect(getSentimentLabel(-0.1)).toBe('negative');
        expect(getSentimentLabel(-0.05)).toBe('negative');
    });
    it('should return "neutral" for -0.05 < compound < 0.05', () => {
        expect(getSentimentLabel(0)).toBe('neutral');
        expect(getSentimentLabel(0.03)).toBe('neutral');
        expect(getSentimentLabel(-0.03)).toBe('neutral');
    });
});