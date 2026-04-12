/**
 * When `ONLINE_PAYMENTS` is `false` / `0` / `no`, the app skips Stripe entirely: no Checkout API, no catalog
 * sync, webhook returns 200 without calling Stripe. Default is on (unset) for production.
 */
export function isOnlinePaymentsEnabled(): boolean {
  const v = process.env.ONLINE_PAYMENTS?.trim().toLowerCase();
  if (!v) return true;
  return v !== 'false' && v !== '0' && v !== 'no';
}

/**
 * Client-safe: normalize JSON / query values. Unknown values default to on (same as server when env unset).
 * Avoids treating string `"false"` as truthy in `if (flag)` UI branches.
 */
export function parseOnlinePaymentsFlag(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const s = value.trim().toLowerCase();
    if (s === 'false' || s === '0' || s === 'no') return false;
    if (s === 'true' || s === '1' || s === 'yes') return true;
    return true;
  }
  if (typeof value === 'number') return value !== 0;
  return true;
}
