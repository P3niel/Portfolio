export const DEMO_RUNTIME_REASON =
  "Backend intentionally offline to control infrastructure costs.";

export function isDemoRuntime() {
  return process.env.PORTFOLIO_RUNTIME_MODE !== "live";
}
