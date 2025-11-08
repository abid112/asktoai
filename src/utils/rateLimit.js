/**
 * Client-side rate limiting utility
 */

const STORAGE_KEY = 'askai_rate_limit';

/**
 * Check if user has exceeded rate limit
 * @param {number} maxRequests - Maximum number of requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {object} - { allowed: boolean, remaining: number, resetAt: number }
 */
export function checkRateLimit(maxRequests = 10, windowMs = 900000) {
  try {
    const now = Date.now();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"requests":[],"count":0}');
    
    // Filter out requests outside the time window
    const validRequests = data.requests.filter(timestamp => now - timestamp < windowMs);
    
    // Check if limit exceeded
    if (validRequests.length >= maxRequests) {
      const oldestRequest = Math.min(...validRequests);
      const resetAt = oldestRequest + windowMs;
      return {
        allowed: false,
        remaining: 0,
        resetAt,
        resetIn: Math.ceil((resetAt - now) / 1000), // seconds
      };
    }
    
    return {
      allowed: true,
      remaining: maxRequests - validRequests.length,
      resetAt: null,
      resetIn: null,
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // On error, allow the request
    return { allowed: true, remaining: maxRequests, resetAt: null };
  }
}

/**
 * Record a new request
 */
export function recordRequest() {
  try {
    const now = Date.now();
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"requests":[],"count":0}');
    
    data.requests.push(now);
    data.count = (data.count || 0) + 1;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error recording request:', error);
  }
}

/**
 * Clear rate limit data (for testing)
 */
export function clearRateLimit() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing rate limit:', error);
  }
}

