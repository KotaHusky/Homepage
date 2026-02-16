import { NextRequest, NextResponse } from 'next/server';

// How long we wait before re-checking “expensive” resources
const HEALTH_CHECK_INTERVAL_MS = 5000;

// Simple in-memory cache
let lastCheckTime: number | null = null;
let lastCheckStatus: number = 503;
let lastCheckResponse: string = 'Service Unavailable';

// Perform your real health checks here
// e.g. check database connectivity, queue health, external APIs, etc.
async function performHealthChecks(): Promise<{ code: number; message: string }> {
  try {
    // Example: Some pseudo-check that might take time or resources
    const dbIsHealthy = await fakeDatabaseCheck();
    const externalApiHealthy = await fakeExternalApiCheck();

    if (!dbIsHealthy) {
      return { code: 503, message: 'DB Unhealthy' };
    }

    if (!externalApiHealthy) {
      return { code: 503, message: 'External API Unhealthy' };
    }

    // If all checks pass
    return { code: 200, message: 'OK' };
  } catch (error) {
    console.error('Health check failed:', error);
    return { code: 500, message: 'Internal Server Error' };
  }
}

// Example stubs to simulate your checks
async function fakeDatabaseCheck(): Promise<boolean> {
  // Suppose we do an actual DB query or connection check
  // For demonstration, we’ll just pretend it's always up
  return true;
}
async function fakeExternalApiCheck(): Promise<boolean> {
  // Possibly do a fetch() to an external service
  // For demonstration, we’ll just pretend it's always up
  return true;
}

/**
 * The actual route handler in Next.js 13 (App Router).
 * For Pages Router in Next.js 12, you'd do:
 *    export default async function handler(req, res) { ... }
 */
export async function GET(req: NextRequest) {
  const now = Date.now();

  // If we’ve done a check recently, return cached result
  if (lastCheckTime && now - lastCheckTime < HEALTH_CHECK_INTERVAL_MS) {
    return new NextResponse(lastCheckResponse, { status: lastCheckStatus });
  }

  try {
    // Otherwise, run our checks and cache the results
    const { code, message } = await performHealthChecks();
    lastCheckTime = now;
    lastCheckStatus = code;
    lastCheckResponse = message;

    return new NextResponse(message, { status: code });
  } catch (error) {
    console.error('Failed to handle request:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}