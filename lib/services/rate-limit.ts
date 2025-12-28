import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

let redis: Redis | null = null
let ratelimit: Ratelimit | null = null

function getRedis(): Redis | null {
  if (redis) return redis

  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    console.warn("Upstash Redis not configured, rate limiting disabled")
    return null
  }

  redis = new Redis({ url, token })
  return redis
}

function getRatelimit(): Ratelimit | null {
  if (ratelimit) return ratelimit

  const redisClient = getRedis()
  if (!redisClient) return null

  ratelimit = new Ratelimit({
    redis: redisClient,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
    prefix: "carmr:ratelimit",
  })

  return ratelimit
}

export type RateLimitResult = {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export async function checkRateLimit(
  identifier: string,
  endpoint: string = "api"
): Promise<RateLimitResult> {
  const limiter = getRatelimit()

  if (!limiter) {
    return { success: true, limit: 0, remaining: 0, reset: 0 }
  }

  const key = `${endpoint}:${identifier}`
  const result = await limiter.limit(key)

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  }
}

export async function checkStrictRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): Promise<RateLimitResult> {
  const redisClient = getRedis()

  if (!redisClient) {
    return { success: true, limit: maxRequests, remaining: maxRequests, reset: 0 }
  }

  const strictLimiter = new Ratelimit({
    redis: redisClient,
    limiter: Ratelimit.slidingWindow(maxRequests, `${windowMs} ms`),
    prefix: "carmr:strict",
  })

  const result = await strictLimiter.limit(identifier)

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  }
}

export function getClientIdentifier(request: Request, userId?: string): string {
  if (userId) {
    return `user:${userId}`
  }

  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const ip = forwarded?.split(",")[0].trim() || realIp || "anonymous"

  return `ip:${ip}`
}
