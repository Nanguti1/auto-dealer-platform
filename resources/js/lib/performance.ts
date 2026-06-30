import * as React from 'react';

export interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  timeToInteractive: number;
}

export interface ComponentRenderMetrics {
  componentName: string;
  renderTime: number;
  mountTime: number;
  updateCount: number;
}

export interface APIMetrics {
  endpoint: string;
  method: string;
  duration: number;
  status: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    pageLoadTime: 0,
    domContentLoaded: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0,
    timeToInteractive: 0,
  };

  private componentMetrics: Map<string, ComponentRenderMetrics> = new Map();
  private apiMetrics: APIMetrics[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined' && window.performance) {
      this.initializeObservers();
    }
  }

  private initializeObservers() {
    // LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.largestContentfulPaint = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (e) {
      console.warn('LCP observer not supported', e);
    }

    // FCP (First Contentful Paint)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');

        if (fcpEntry) {
          this.metrics.firstContentfulPaint = fcpEntry.startTime;
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(fcpObserver);
    } catch (e) {
      console.warn('FCP observer not supported', e);
    }

    // CLS (Cumulative Layout Shift)
    try {
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;

        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }

        this.metrics.cumulativeLayoutShift = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (e) {
      console.warn('CLS observer not supported', e);
    }

    // FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.firstInputDelay = (entry as any).processingStart - entry.startTime;
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (e) {
      console.warn('FID observer not supported', e);
    }
  }

  measurePageLoad() {
    if (typeof window === 'undefined' || !window.performance) {
return;
}

    const timing = window.performance.timing;
    const navigation = window.performance.getEntriesByType('navigation')[0] as any;

    if (navigation) {
      this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
      this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      this.metrics.timeToInteractive = navigation.domInteractive - navigation.fetchStart;
    } else if (timing) {
      this.metrics.pageLoadTime = timing.loadEventEnd - timing.fetchStart;
      this.metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.fetchStart;
      this.metrics.timeToInteractive = timing.domInteractive - timing.fetchStart;
    }
  }

  getMetrics(): PerformanceMetrics {
    this.measurePageLoad();

    return { ...this.metrics };
  }

  recordComponentRender(componentName: string, renderTime: number, mountTime: number) {
    const existing = this.componentMetrics.get(componentName);
    this.componentMetrics.set(componentName, {
      componentName,
      renderTime,
      mountTime,
      updateCount: existing ? existing.updateCount + 1 : 1,
    });
  }

  getComponentMetrics(): ComponentRenderMetrics[] {
    return Array.from(this.componentMetrics.values());
  }

  recordAPICall(endpoint: string, method: string, duration: number, status: number) {
    this.apiMetrics.push({
      endpoint,
      method,
      duration,
      status,
      timestamp: Date.now(),
    });

    // Keep only last 100 API calls
    if (this.apiMetrics.length > 100) {
      this.apiMetrics = this.apiMetrics.slice(-100);
    }
  }

  getAPIMetrics(): APIMetrics[] {
    return [...this.apiMetrics];
  }

  getAverageAPIDuration(): number {
    if (this.apiMetrics.length === 0) {
return 0;
}

    const total = this.apiMetrics.reduce((sum, metric) => sum + metric.duration, 0);

    return total / this.apiMetrics.length;
  }

  getSlowAPICalls(threshold: number = 1000): APIMetrics[] {
    return this.apiMetrics.filter((metric) => metric.duration > threshold);
  }

  getSlowComponents(threshold: number = 16): ComponentRenderMetrics[] {
    return Array.from(this.componentMetrics.values()).filter(
      (metric) => metric.renderTime > threshold
    );
  }

  clear() {
    this.componentMetrics.clear();
    this.apiMetrics = [];
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }

  generateReport(): string {
    const metrics = this.getMetrics();
    const slowAPIs = this.getSlowAPICalls(1000);
    const slowComponents = this.getSlowComponents(16);

    return `
Performance Report
==================
Page Load Time: ${metrics.pageLoadTime.toFixed(2)}ms
DOM Content Loaded: ${metrics.domContentLoaded.toFixed(2)}ms
First Contentful Paint: ${metrics.firstContentfulPaint.toFixed(2)}ms
Largest Contentful Paint: ${metrics.largestContentfulPaint.toFixed(2)}ms
Cumulative Layout Shift: ${metrics.cumulativeLayoutShift.toFixed(3)}
First Input Delay: ${metrics.firstInputDelay.toFixed(2)}ms
Time to Interactive: ${metrics.timeToInteractive.toFixed(2)}ms

Average API Duration: ${this.getAverageAPIDuration().toFixed(2)}ms
Slow API Calls (${slowAPIs.length}): ${slowAPIs.map((api) => `${api.endpoint} (${api.duration.toFixed(2)}ms)`).join(', ')}

Slow Components (${slowComponents.length}): ${slowComponents.map((comp) => `${comp.componentName} (${comp.renderTime.toFixed(2)}ms)`).join(', ')}
    `.trim();
  }
}

// Singleton instance
let monitorInstance: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!monitorInstance) {
    monitorInstance = new PerformanceMonitor();
  }

  return monitorInstance;
}

// React Hook for performance monitoring
export function usePerformanceMonitor(componentName: string) {
  const monitor = getPerformanceMonitor();
  const renderStartTime = React.useRef<number>(0);
  const mountStartTime = React.useRef<number>(Date.now());

  React.useEffect(() => {
    renderStartTime.current = performance.now();
  });

  React.useEffect(() => {
    const renderTime = performance.now() - renderStartTime.current;
    const mountTime = Date.now() - mountStartTime.current;
    monitor.recordComponentRender(componentName, renderTime, mountTime);
  });

  return monitor;
}

// Hook to track API calls
export function useAPIMonitor() {
  const monitor = getPerformanceMonitor();

  const trackAPICall = React.useCallback(
    async <T,>(fn: () => Promise<T>, endpoint: string, method: string = 'GET'): Promise<T> => {
      const startTime = performance.now();

      try {
        const result = await fn();
        const duration = performance.now() - startTime;
        monitor.recordAPICall(endpoint, method, duration, 200);

        return result;
      } catch (error: any) {
        const duration = performance.now() - startTime;
        monitor.recordAPICall(endpoint, method, duration, error.response?.status || 500);

        throw error;
      }
    },
    [monitor]
  );

  return { trackAPICall, monitor };
}

// Higher-order component for performance monitoring
export function withPerformanceMonitor<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
): React.ComponentType<P> {
  return function WithPerformanceMonitor(props: P) {
    usePerformanceMonitor(componentName);

    return React.createElement(WrappedComponent, props);
  };
}

// Utility to measure function execution time
export function measureExecutionTime<T>(fn: () => T, label: string): T {
  const start = performance.now();
  const result = fn();
  const duration = performance.now() - start;
  console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);

  return result;
}

// Async version of measureExecutionTime
export async function measureExecutionTimeAsync<T>(
  fn: () => Promise<T>,
  label: string
): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const duration = performance.now() - start;
  console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);

  return result;
}
