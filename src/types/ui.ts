export type BetStatus = "pending" | "win" | "loss" | "push";

export type MatchStatus = "scheduled" | "live" | "finished" | "cancelled";

export type Theme = "dark" | "light" | "system";

export type OddsFormat = "decimal" | "fractional" | "american";

export type BetMarket = "home" | "draw" | "away" | "over" | "under" | "btts";

export type ConfidenceLevel = "high" | "medium" | "low";

export function getConfidenceLevel(confidence: number): ConfidenceLevel {
  if (confidence >= 80) return "high";
  if (confidence >= 50) return "medium";
  return "low";
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 80) return "var(--color-confidence-high)";
  if (confidence >= 50) return "var(--color-confidence-medium)";
  return "var(--color-confidence-low)";
}

export function getStatusColor(status: BetStatus): string {
  switch (status) {
    case "win":
      return "var(--color-win)";
    case "loss":
      return "var(--color-loss)";
    case "push":
      return "var(--color-push)";
    default:
      return "var(--color-text-secondary)";
  }
}

export type TabId = "today" | "portfolio" | "analytics" | "profile" | "saved";

export interface TabItem {
  id: TabId;
  label: string;
  href: string;
  icon: string;
}
