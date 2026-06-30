import { Activity, AlertTriangle, Clock, Cpu, Database, Zap } from 'lucide-react';
import * as React from 'react';
import ModuleShell from '@/components/admin/shared/ModuleShell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAPITracker } from '@/lib/api-tracker';
import { getPerformanceMonitor } from '@/lib/performance';

export default function PerformanceIndex() {
  const monitor = React.useMemo(() => getPerformanceMonitor(), []);
  const apiTracker = React.useMemo(() => getAPITracker(), []);
  const [metrics, setMetrics] = React.useState(monitor.getMetrics());
  const [apiMetrics, setApiMetrics] = React.useState(apiTracker.getCalls());
  const [refreshing, setRefreshing] = React.useState(false);

  const refreshData = React.useCallback(async () => {
    setRefreshing(true);
    setMetrics(monitor.getMetrics());
    setApiMetrics(apiTracker.getCalls());
    await new Promise((resolve) => setTimeout(resolve, 500));
    setRefreshing(false);
  }, [monitor, apiTracker]);

  React.useEffect(() => {
    const interval = setInterval(refreshData, 5000);

    return () => clearInterval(interval);
  }, [refreshData]);

  const performanceScore = React.useMemo(() => {
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

  const slowAPIs = React.useMemo(() => apiTracker.getSlowCalls(1000), [apiTracker]);
  const slowComponents = React.useMemo(() => monitor.getSlowComponents(16), [monitor]);

  return (
    <ModuleShell
      title="Performance Dashboard"
      description="Monitor application performance metrics, API response times, and component render performance."
      actions={
        <Button onClick={refreshData} disabled={refreshing}>
          <Zap className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      }
    >
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="web-vitals">Web Vitals</TabsTrigger>
          <TabsTrigger value="api">API Performance</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceScore}/100</div>
                <p className="text-xs text-muted-foreground">
                  {performanceScore >= 80 ? 'Good' : performanceScore >= 50 ? 'Needs Improvement' : 'Poor'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Load Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.pageLoadTime.toFixed(0)}ms</div>
                <Progress value={Math.min(100, (metrics.pageLoadTime / 3000) * 100)} className="mt-2 h-1" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Calls</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{apiMetrics.length}</div>
                <p className="text-xs text-muted-foreground">
                  Avg: {apiTracker.getAverageDuration().toFixed(0)}ms
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Slow Components</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{slowComponents.length}</div>
                <p className="text-xs text-muted-foreground">
                  {slowComponents.length > 0 ? 'Needs optimization' : 'All good'}
                </p>
              </CardContent>
            </Card>
          </div>

          {(slowAPIs.length > 0 || slowComponents.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Performance Issues
                </CardTitle>
                <CardDescription>
                  Items that may need optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {slowAPIs.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Slow API Calls</h4>
                    <div className="space-y-2">
                      {slowAPIs.slice(0, 5).map((api, i) => (
                        <div key={i} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                          <span className="truncate flex-1">{api.url}</span>
                          <Badge variant="destructive" className="ml-2">
                            {api.duration.toFixed(0)}ms
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {slowComponents.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Slow Components</h4>
                    <div className="space-y-2">
                      {slowComponents.slice(0, 5).map((comp, i) => (
                        <div key={i} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                          <span className="truncate flex-1">{comp.componentName}</span>
                          <Badge variant="secondary" className="ml-2">
                            {comp.renderTime.toFixed(0)}ms
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="web-vitals" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>First Contentful Paint (FCP)</CardTitle>
                <CardDescription>Time when first content is painted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.firstContentfulPaint.toFixed(0)}ms</div>
                <Progress value={Math.min(100, (metrics.firstContentfulPaint / 1800) * 100)} className="mt-4 h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Target: &lt; 1800ms
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Largest Contentful Paint (LCP)</CardTitle>
                <CardDescription>Time when largest content is painted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.largestContentfulPaint.toFixed(0)}ms</div>
                <Progress value={Math.min(100, (metrics.largestContentfulPaint / 2500) * 100)} className="mt-4 h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Target: &lt; 2500ms
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cumulative Layout Shift (CLS)</CardTitle>
                <CardDescription>Measure of visual stability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.cumulativeLayoutShift.toFixed(3)}</div>
                <Progress value={Math.min(100, (metrics.cumulativeLayoutShift / 0.1) * 100)} className="mt-4 h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Target: &lt; 0.1
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>First Input Delay (FID)</CardTitle>
                <CardDescription>Time from first interaction to response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.firstInputDelay.toFixed(0)}ms</div>
                <Progress value={Math.min(100, (metrics.firstInputDelay / 100) * 100)} className="mt-4 h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Target: &lt; 100ms
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time to Interactive (TTI)</CardTitle>
                <CardDescription>Time when page is fully interactive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.timeToInteractive.toFixed(0)}ms</div>
                <Progress value={Math.min(100, (metrics.timeToInteractive / 3800) * 100)} className="mt-4 h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Target: &lt; 3800ms
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DOM Content Loaded</CardTitle>
                <CardDescription>Time when DOM is fully parsed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metrics.domContentLoaded.toFixed(0)}ms</div>
                <p className="text-xs text-muted-foreground mt-2">
                  {metrics.domContentLoaded < 1000 ? 'Good' : 'Needs improvement'}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total API Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{apiMetrics.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{apiTracker.getAverageDuration().toFixed(0)}ms</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{apiTracker.getErrorRate().toFixed(1)}%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent API Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {apiMetrics.slice(-20).reverse().map((call, i) => (
                  <div key={i} className="flex items-center justify-between text-sm p-2 border-b">
                    <div className="flex-1 truncate">
                      <span className="font-medium">{call.method}</span>
                      <span className="text-muted-foreground ml-2">{call.url}</span>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge variant={call.status >= 400 ? 'destructive' : 'secondary'}>
                        {call.status}
                      </Badge>
                      <span className={call.duration > 1000 ? 'text-red-500' : 'text-muted-foreground'}>
                        {call.duration.toFixed(0)}ms
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Component Render Metrics</CardTitle>
              <CardDescription>
                Track component render times and identify performance bottlenecks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {monitor.getComponentMetrics().map((metric, i) => (
                  <div key={i} className="flex items-center justify-between text-sm p-2 border-b">
                    <span className="flex-1">{metric.componentName}</span>
                    <div className="flex items-center gap-4 ml-4">
                      <span className="text-muted-foreground">Updates: {metric.updateCount}</span>
                      <span className={metric.renderTime > 16 ? 'text-red-500' : 'text-muted-foreground'}>
                        {metric.renderTime.toFixed(2)}ms
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ModuleShell>
  );
}
