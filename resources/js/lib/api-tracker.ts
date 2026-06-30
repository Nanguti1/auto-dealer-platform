import { router } from '@inertiajs/react';
import { getPerformanceMonitor } from './performance';

export interface APICall {
  url: string;
  method: string;
  duration: number;
  status: number;
  timestamp: number;
}

class APITracker {
  private calls: APICall[] = [];
  private startTimes: Map<string, number> = new Map();
  private monitor = getPerformanceMonitor();

  constructor() {
    this.initialize();
  }

  private initialize() {
    // Track Inertia visits
    router.on('start', (event) => {
      const url = event.detail.visit.url;
      const method = event.detail.visit.method.toUpperCase();
      this.startTimes.set(url, performance.now());
    });

    router.on('finish', (event) => {
      const url = event.detail.visit.url;
      const method = event.detail.visit.method.toUpperCase();
      const startTime = this.startTimes.get(url);

      if (startTime) {
        const duration = performance.now() - startTime;
        const status = event.detail.visit.response?.status || 200;

        this.recordCall({
          url,
          method,
          duration,
          status,
          timestamp: Date.now(),
        });

        this.startTimes.delete(url);

        // Also record in performance monitor
        this.monitor.recordAPICall(url, method, duration, status);

        // Log slow API calls in development
        if (import.meta.env.DEV && duration > 1000) {
          console.warn(`[API Tracker] Slow API call: ${method} ${url} took ${duration.toFixed(2)}ms`);
        }
      }
    });

    router.on('error', (errors) => {
      console.error('[API Tracker] API error:', errors);
    });
  }

  private recordCall(call: APICall) {
    this.calls.push(call);

    // Keep only last 100 calls
    if (this.calls.length > 100) {
      this.calls = this.calls.slice(-100);
    }
  }

  getCalls(): APICall[] {
    return [...this.calls];
  }

  getSlowCalls(threshold: number = 1000): APICall[] {
    return this.calls.filter((call) => call.duration > threshold);
  }

  getAverageDuration(): number {
    if (this.calls.length === 0) {
return 0;
}

    const total = this.calls.reduce((sum, call) => sum + call.duration, 0);

    return total / this.calls.length;
  }

  getMedianDuration(): number {
    if (this.calls.length === 0) {
return 0;
}

    const sorted = [...this.calls].map((call) => call.duration).sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  getP95Duration(): number {
    if (this.calls.length === 0) {
return 0;
}

    const sorted = [...this.calls].map((call) => call.duration).sort((a, b) => a - b);
    const index = Math.floor(sorted.length * 0.95);

    return sorted[index] || 0;
  }

  getCallsByEndpoint(endpoint: string): APICall[] {
    return this.calls.filter((call) => call.url.includes(endpoint));
  }

  getCallsByMethod(method: string): APICall[] {
    return this.calls.filter((call) => call.method === method.toUpperCase());
  }

  getErrorRate(): number {
    if (this.calls.length === 0) {
return 0;
}

    const errors = this.calls.filter((call) => call.status >= 400).length;

    return (errors / this.calls.length) * 100;
  }

  clear() {
    this.calls = [];
    this.startTimes.clear();
  }

  generateReport(): string {
    return `
API Performance Report
======================
Total Calls: ${this.calls.length}
Average Duration: ${this.getAverageDuration().toFixed(2)}ms
Median Duration: ${this.getMedianDuration().toFixed(2)}ms
P95 Duration: ${this.getP95Duration().toFixed(2)}ms
Error Rate: ${this.getErrorRate().toFixed(2)}%
Slow Calls (>1000ms): ${this.getSlowCalls().length}
    `.trim();
  }
}

// Singleton instance
let trackerInstance: APITracker | null = null;

export function getAPITracker(): APITracker {
  if (!trackerInstance) {
    trackerInstance = new APITracker();
  }

  return trackerInstance;
}

// Hook for using API tracker in components
export function useAPITracker() {
  const tracker = React.useMemo(() => getAPITracker(), []);

  return {
    tracker,
    calls: tracker.getCalls(),
    slowCalls: tracker.getSlowCalls(),
    averageDuration: tracker.getAverageDuration(),
    errorRate: tracker.getErrorRate(),
  };
}
