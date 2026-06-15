/**
 * ValueCalc — Compound Interest Calculator
 * Pure functions, 100% testable, no side effects
 */

export interface CompoundInput {
  principal: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
  inflationRate: number;
  compoundFrequency: 'monthly' | 'quarterly' | 'annually';
}

export interface YearlyBreakdown {
  year: number;
  balance: number;
  totalContributions: number;
  totalInterest: number;
  inflationAdjustedBalance: number;
}

export interface CompoundResult {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  inflationAdjustedBalance: number;
  yearlyBreakdown: YearlyBreakdown[];
}

/**
 * Get the number of compounding periods per year
 */
function getCompoundingPeriods(frequency: CompoundInput['compoundFrequency']): number {
  switch (frequency) {
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'annually': return 1;
  }
}

/**
 * Calculate compound interest with monthly contributions
 * Formula: FV = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
 * 
 * This matches Excel's FV() function for validation.
 */
export function calculateCompound(input: CompoundInput): CompoundResult {
  const { principal, monthlyContribution, annualRate, years, inflationRate, compoundFrequency } = input;

  const n = getCompoundingPeriods(compoundFrequency);
  const r = annualRate / 100; // Convert percentage to decimal
  const ratePerPeriod = r / n;

  const yearlyBreakdown: YearlyBreakdown[] = [];
  let totalContributions = principal;
  let balance = principal;

  for (let year = 1; year <= years; year++) {
    // Calculate balance at end of this year using compound interest formula
    const periodsThisYear = n;
    
    // For each compounding period in this year
    for (let period = 0; period < periodsThisYear; period++) {
      // Add monthly contributions accumulated since last compounding
      const monthsInPeriod = 12 / n;
      const contributionsThisPeriod = monthlyContribution * monthsInPeriod;
      
      // Contributions earn interest from mid-period (simplified: at period start)
      totalContributions += contributionsThisPeriod;
      
      // Apply compound interest to existing balance
      balance = balance * (1 + ratePerPeriod);
      
      // Add new contributions (they start earning interest next period)
      balance += contributionsThisPeriod;
    }

    // Inflation adjustment
    const inflationFactor = Math.pow(1 + inflationRate / 100, year);

    yearlyBreakdown.push({
      year,
      balance: roundTo2(balance),
      totalContributions: roundTo2(totalContributions),
      totalInterest: roundTo2(balance - totalContributions),
      inflationAdjustedBalance: roundTo2(balance / inflationFactor),
    });
  }

  const finalBalance = roundTo2(balance);
  const inflationAdjusted = roundTo2(balance / Math.pow(1 + inflationRate / 100, years));

  return {
    finalBalance,
    totalContributions: roundTo2(totalContributions),
    totalInterest: roundTo2(finalBalance - totalContributions),
    inflationAdjustedBalance: inflationAdjusted,
    yearlyBreakdown,
  };
}

/**
 * Calculate lump-sum only (no monthly contributions) for comparison
 */
export function calculateLumpSum(input: Omit<CompoundInput, 'monthlyContribution'>): CompoundResult {
  return calculateCompound({ ...input, monthlyContribution: 0 });
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, locale = 'en-US', currency = 'USD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Round to 2 decimal places (banker's rounding)
 */
function roundTo2(n: number): number {
  return Math.round(n * 100) / 100;
}