import { router } from '@inertiajs/react';
import * as React from 'react';

export interface PageTimingMetrics {
  navigationStart: number;
  domContentLoaded: number;
  loadComplete: number;
  totalTime: number;
  renderTime: number;
}

export function usePerformanceTiming() {
  const [metrics, setMetrics] = React.useState<PageTimingMetrics | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.performance) {
return;
}

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    if (!navigation) {
return;
}

    const renderStartTime = performance.now();

    const measureMetrics = () => {
      const renderEndTime = performance.now();
      const newMetrics: PageTimingMetrics = {
        navigationStart: navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        loadComplete: navigation.loadEventEnd - navigation.fetchStart,
        totalTime: navigation.loadEventEnd - navigation.fetchStart,
        renderTime: renderEndTime - renderStartTime,
      };

      setMetrics(newMetrics);

      // Log to console in development
      if (import.meta.env.DEV) {
        console.log('[Performance Timing]', newMetrics);
      }
    };

    // Wait for page to fully load
    if (document.readyState === 'complete') {
      measureMetrics();
    } else {
      window.addEventListener('load', measureMetrics);

      return () => window.removeEventListener('load', measureMetrics);
    }
  }, []);

  const trackNavigation = React.useCallback(() => {
    setIsLoading(true);
    const startTime = performance.now();

    router.on('success', () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      setIsLoading(false);

      if (import.meta.env.DEV) {
        console.log(`[Navigation] Page transition took ${duration.toFixed(2)}ms`);
      }
    });

    router.on('error', (errors) => {
      setIsLoading(false);
      console.error('[Navigation Error]', errors);
    });
  }, []);

  return { metrics, isLoading, trackNavigation };
}

// Hook to track Inertia visit performance
export function useInertiaPerformance() {
  const [visitMetrics, setVisitMetrics] = React.useState<Record<string, number>>({});

  React.useEffect(() => {
    const visitStartTimes = new Map<string, number>();

    router.on('start', (event) => {
      const url = event.detail.visit.url;
      visitStartTimes.set(url, performance.now());
    });

    router.on('finish', (event) => {
      const url = event.detail.visit.url;
      const startTime = visitStartTimes.get(url);

      if (startTime) {
        const duration = performance.now() - startTime;
        setVisitMetrics((prev) => ({
          ...prev,
          [url]: duration,
        }));
        visitStartTimes.delete(url);

        if (import.meta.env.DEV) {
          console.log(`[Inertia] Visit to ${url} took ${duration.toFixed(2)}ms`);
        }
      }
    });

    return () => {
      router.off('start');
      router.off('finish');
    };
  }, []);

  return visitMetrics;
}

// Hook to track component render count and time
export function useRenderTracking(componentName: string) {
  const renderCount = React.useRef(0);
  const lastRenderTime = React.useRef<number>(0);
  const totalRenderTime = React.useRef<number>(0);

  React.useEffect(() => {
    renderCount.current += 1;
    const now = performance.now();

    if (lastRenderTime.current > 0) {
      const renderDuration = now - lastRenderTime.current;
      totalRenderTime.current += renderDuration;

      if (import.meta.env.DEV && renderDuration > 16) {
        console.warn(
          `[Render Tracking] ${componentName} took ${renderDuration.toFixed(2)}ms (render #${renderCount.current})`
        );
      }
    }

    lastRenderTime.current = now;
  });

  return {
    renderCount: renderCount.current,
    averageRenderTime: renderCount.current > 0 ? totalRenderTime.current / renderCount.current : 0,
  };
}
