import { Activity, AlertTriangle, Clock, Zap } from 'lucide-react';
import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getPerformanceMonitor } from '@/lib/performance';

export default function PerformanceMonitor() {
  const monitor = React.useMemo(() => getPerformanceMonitor(), []);
  const [metrics, setMetrics] = React.useState(monitor.getMetrics());
  const [showDetails, setShowDetails] = React.useState(false);
  const [slowAPIs, setSlowAPIs] = React.useState(monitor.getSlowAPICalls(1000));
  const [slowComponents, setSlowComponents] = React.useState(monitor.getSlowComponents(16));

  const refreshMetrics = React.useCallback(() => {
    setMetrics(monitor.getMetrics());
    setSlowAPIs(monitor.getSlowAPICalls(1000));
    setSlowComponents(monitor.getSlowComponents(16));
  }, [monitor]);

  React.useEffect(() => {
    const interval = setInterval(refreshMetrics, 5000);

    return () => clearInterval(interval);
  }, [refreshMetrics]);

  const getPerformanceScore = React.useCallback(() => {
    let score = 100;

    if (metrics.pageLoadTime > 3000) {
score -= 20;
}

    if (metrics.firstContentfulPaint > 1800) {
score -= 15;
}

    if (metrics.largestContentfulPaint > 2500) {
score -= 15;
}

    if (metrics.cumulativeLayoutShift > 0.1) {
score -= 20;
}

    if (metrics.firstInputDelay > 100) {
score -= 15;
}

    if (metrics.timeToInteractive > 3800) {
score -= 15;
}

    return Math.max(0, score);
  }, [metrics]);

  const score = getPerformanceScore();
  const scoreColor = score >= 80 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500';

  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Performance
            </CardTitle>
            <Badge variant={score >= 80 ? 'default' : score >= 50 ? 'secondary' : 'destructive'}>
              {score}/100
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Score: <span className={scoreColor}>{score >= 80 ? 'Good' : score >= 50 ? 'Needs Improvement' : 'Poor'}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Page Load</span>
              <span className={metrics.pageLoadTime > 3000 ? 'text-red-500' : 'text-green-500'}>
                {metrics.pageLoadTime.toFixed(0)}ms
              </span>
            </div>
            <Progress value={Math.min(100, (metrics.pageLoadTime / 3000) * 100)} className="h-1" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">FCP</span>
              <span className={metrics.firstContentfulPaint > 1800 ? 'text-red-500' : 'text-green-500'}>
                {metrics.firstContentfulPaint.toFixed(0)}ms
              </span>
            </div>
            <Progress value={Math.min(100, (metrics.firstContentfulPaint / 1800) * 100)} className="h-1" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">LCP</span>
              <span className={metrics.largestContentfulPaint > 2500 ? 'text-red-500' : 'text-green-500'}>
                {metrics.largestContentfulPaint.toFixed(0)}ms
              </span>
            </div>
            <Progress value={Math.min(100, (metrics.largestContentfulPaint / 2500) * 100)} className="h-1" />
          </div>

          {(slowAPIs.length > 0 || slowComponents.length > 0) && (
            <div className="pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="w-full text-xs"
              >
                {showDetails ? 'Hide' : 'Show'} Details
                {slowAPIs.length > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5">
                    {slowAPIs.length}
                  </Badge>
                )}
                {slowComponents.length > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5">
                    {slowComponents.length}
                  </Badge>
                )}
              </Button>

              {showDetails && (
                <div className="mt-3 space-y-2">
                  {slowAPIs.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs font-medium text-red-500">
                        <AlertTriangle className="h-3 w-3" />
                        Slow API Calls
                      </div>
                      {slowAPIs.slice(0, 3).map((api, i) => (
                        <div key={i} className="text-xs text-muted-foreground truncate">
                          {api.endpoint} ({api.duration.toFixed(0)}ms)
                        </div>
                      ))}
                    </div>
                  )}

                  {slowComponents.length > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs font-medium text-yellow-500">
                        <Clock className="h-3 w-3" />
                        Slow Components
                      </div>
                      {slowComponents.slice(0, 3).map((comp, i) => (
                        <div key={i} className="text-xs text-muted-foreground truncate">
                          {comp.componentName} ({comp.renderTime.toFixed(0)}ms)
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <Button variant="outline" size="sm" onClick={refreshMetrics} className="w-full">
            <Zap className="mr-2 h-3 w-3" />
            Refresh
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
