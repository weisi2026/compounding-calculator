import { describe, it, expect } from 'vitest';
import { calculateCompound, calculateLumpSum, formatCurrency } from '../calculator';

describe('calculateCompound', () => {
  it('basic lump-sum: $10000 at 7% for 10 years, monthly compounding', () => {
    const result = calculateCompound({
      principal: 10000,
      monthlyContribution: 0,
      annualRate: 7,
      years: 10,
      inflationRate: 0,
      compoundFrequency: 'monthly',
    });
    // Excel: =FV(7%/12, 120, 0, -10000) = $20,096.61
    expect(result.finalBalance).toBeCloseTo(20096.61, 0);
    expect(result.totalContributions).toBe(10000);
    expect(result.totalInterest).toBeCloseTo(10096.61, 0);
  });

  it('with monthly contributions: $10000 + $500/mo at 7% for 10 years', () => {
    const result = calculateCompound({
      principal: 10000,
      monthlyContribution: 500,
      annualRate: 7,
      years: 10,
      inflationRate: 0,
      compoundFrequency: 'monthly',
    });
    // Excel: =FV(7%/12, 120, -500, -10000) = $105,076.02
    expect(result.finalBalance).toBeCloseTo(105076.02, -1);
    expect(result.totalContributions).toBe(70000); // 10000 + 500*120
  });

  it('zero rate: no growth', () => {
    const result = calculateCompound({
      principal: 5000,
      monthlyContribution: 100,
      annualRate: 0,
      years: 5,
      inflationRate: 0,
      compoundFrequency: 'monthly',
    });
    expect(result.finalBalance).toBe(11000); // 5000 + 100*60
    expect(result.totalInterest).toBe(0);
  });

  it('inflation adjustment reduces real value', () => {
    const result = calculateCompound({
      principal: 10000,
      monthlyContribution: 0,
      annualRate: 7,
      years: 10,
      inflationRate: 3,
      compoundFrequency: 'monthly',
    });
    expect(result.inflationAdjustedBalance).toBeLessThan(result.finalBalance);
    expect(result.inflationAdjustedBalance).toBeGreaterThan(10000);
  });

  it('yearly breakdown has correct number of entries', () => {
    const result = calculateCompound({
      principal: 1000,
      monthlyContribution: 100,
      annualRate: 5,
      years: 20,
      inflationRate: 2,
      compoundFrequency: 'annually',
    });
    expect(result.yearlyBreakdown.length).toBe(20);
    expect(result.yearlyBreakdown[0].year).toBe(1);
    expect(result.yearlyBreakdown[19].year).toBe(20);
  });

  it('quarterly compounding yields more than annually', () => {
    const quarterly = calculateCompound({
      principal: 10000,
      monthlyContribution: 0,
      annualRate: 8,
      years: 10,
      inflationRate: 0,
      compoundFrequency: 'quarterly',
    });
    const annually = calculateCompound({
      principal: 10000,
      monthlyContribution: 0,
      annualRate: 8,
      years: 10,
      inflationRate: 0,
      compoundFrequency: 'annually',
    });
    expect(quarterly.finalBalance).toBeGreaterThan(annually.finalBalance);
  });

  it('monthly compounding yields more than quarterly', () => {
    const monthly = calculateCompound({
      principal: 10000,
      monthlyContribution: 0,
      annualRate: 8,
      years: 10,
      inflationRate: 0,
      compoundFrequency: 'monthly',
    });
    const quarterly = calculateCompound({
      principal: 10000,
      monthlyContribution: 0,
      annualRate: 8,
      years: 10,
      inflationRate: 0,
      compoundFrequency: 'quarterly',
    });
    expect(monthly.finalBalance).toBeGreaterThan(quarterly.finalBalance);
  });
});

describe('calculateLumpSum', () => {
  it('equals calculateCompound with zero contributions', () => {
    const lumpSum = calculateLumpSum({
      principal: 5000,
      annualRate: 6,
      years: 15,
      inflationRate: 2,
      compoundFrequency: 'monthly',
    });
    const compound = calculateCompound({
      principal: 5000,
      monthlyContribution: 0,
      annualRate: 6,
      years: 15,
      inflationRate: 2,
      compoundFrequency: 'monthly',
    });
    expect(lumpSum.finalBalance).toBe(compound.finalBalance);
  });
});

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats large numbers', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
  });
});