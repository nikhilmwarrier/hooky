export function getSkipDays(present, total, threshold) {
  const meetsThreshold = present / total >= threshold;
  let incr = 0;

  if (meetsThreshold) {
    while (present / (total + incr) >= threshold) incr++;
    return incr - 1;
  } else {
    while ((present + incr) / (total + incr) < threshold) incr++;
    return -incr;
  }
}

export function getSkipDaysExtrapolated(present, total, threshold) {
  return -Math.round(total * threshold - present);
}
