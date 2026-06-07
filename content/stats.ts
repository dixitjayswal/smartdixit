/**
 * Animated counter stats shown in the highlights strip.
 * `value` is the number the counter animates to; `prefix`/`suffix` frame it;
 * `decimals` controls precision (e.g. 2.5 needs 1 decimal).
 */

export type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  {
    value: 2.5,
    decimals: 1,
    suffix: "M+",
    label: "events/day handled",
  },
  {
    value: 80,
    suffix: "%",
    label: "reduction in reporting cycles",
  },
  {
    value: 50,
    suffix: "%",
    label: "MTTR reduction",
  },
  {
    value: 2.5,
    decimals: 1,
    suffix: " yrs",
    label: "production experience",
  },
];
