import { describe, expect, it } from 'vitest';
import { UTILS } from '.';

describe('function generateRandomArray', () => {
  it('should return an array with 8 elements', () => {
    const randomArray = UTILS.generateRandomArray();
    expect(randomArray.length).toBe(8);
  });
});

describe('function formatCurrency', () => {
  it('should return a string with the currency format', () => {
    const currency = UTILS.formatCurrency(1000);
    expect(currency).toBe('$1,000.00');
  });

  it('should return a string with the decimal format', () => {
    const currency = UTILS.formatCurrency(1000, false);
    expect(currency).toBe('1,000');
  });
});
