const rateLimitMap = new Map();

export default function rateLimit(ip, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const timestamps = rateLimitMap.get(ip);
  const validTimestamps = timestamps.filter(ts => ts > windowStart);
  
  if (validTimestamps.length >= limit) {
    return false; // Rate limit exceeded
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true; // Allowed
}