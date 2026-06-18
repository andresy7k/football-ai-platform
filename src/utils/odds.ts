export type OddsFormat = "decimal" | "fractional" | "american";

export function decimalToFractional(decimal: number): string {
  const fraction = decimal - 1;
  const denominator = 100;
  const numerator = Math.round(fraction * denominator);
  const gcd = findGCD(numerator, denominator);
  return `${numerator / gcd}/${denominator / gcd}`;
}

export function decimalToAmerican(decimal: number): string {
  if (decimal >= 2) {
    return `+${Math.round((decimal - 1) * 100)}`;
  }
  return `${Math.round(-100 / (decimal - 1))}`;
}

export function formatOdds(odds: number, format: OddsFormat = "decimal"): string {
  switch (format) {
    case "fractional":
      return decimalToFractional(odds);
    case "american":
      return decimalToAmerican(odds);
    default:
      return odds.toFixed(2);
  }
}

function findGCD(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function calculateProfit(stake: number, odds: number): number {
  return stake * (odds - 1);
}
