import * as React from 'react';
import { router } from '@inertiajs/react';
import { Download, Users, TrendingUp, Target, Calendar } from 'lucide-react';
import ReportsShell, { ReportsBackButton } from '@/components/admin/reports/reports-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface LeadsByStage {
  crm_stage_id: number;
  count: number;
  crmStage?: {
    name: string;
  };
}

interface LeadsBySource {
  source: string;
  count: number;
}

interface ConversionData {
  date: string;
  total: number;
  converted: number;
}

interface Filters {
  start_date: string;
  end_date: string;
}

interface Props {
  leadsByStage: LeadsByStage[];
  leadsBySource: LeadsBySource[];
  conversionData: ConversionData[];
  filters: Filters;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function LeadReport({ leadsByStage, leadsBySource, conversionData, filters }: Props) {
  const [startDate, setStartDate] = React.useState(filters.start_date);
  const [endDate, setEndDate] = React.useState(filters.end_date);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/admin/reports/leads', { start_date: startDate, end_date: endDate }, { preserveState: true });
  };

  const handleExport = (format: 'csv' | 'excel') => {
    window.location.href = `/admin/reports/export?type=leads&format=${format}&start_date=${startDate}&end_date=${endDate}`;
  };

  const totalLeads = leadsByStage.reduce((sum, item) => sum + item.count, 0);
  const totalConverted = conversionData.reduce((sum, item) => sum + item.converted, 0);
  const overallConversionRate = totalLeads > 0 ? (totalConverted / totalLeads) * 100 : 0;

  const stagePieData = leadsByStage.map((item) => ({
    name: item.crmStage?.name || 'Unknown',
    value: item.count,
  }));

  const sourcePieData = leadsBySource.map((item) => ({
    name: item.source || 'Unknown',
    value: item.count,
  }));

  const conversionLineData = conversionData.map((item) => ({
    ...item,
    rate: item.total > 0 ? ((item.converted / item.total) * 100).toFixed(1) : 0,
  }));

  return (
    <ReportsShell title="Lead Report" description="Monitor lead conversion and pipeline performance">
      <div className="space-y-6">
        {/* Header with Back Button and Actions */}
        <div className="flex items-center justify-between">
          <ReportsBackButton />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport('csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => handleExport('excel')}>
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>

        {/* Date Range Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Date Range Filter</CardTitle>
            <CardDescription>Filter lead data by date range</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFilterSubmit} className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <Button type="submit">
                <Calendar className="h-4 w-4 mr-2" />
                Apply Filter
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads}</div>
              <p className="text-xs text-muted-foreground">Leads in pipeline</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Converted</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConverted}</div>
              <p className="text-xs text-muted-foreground">Leads converted to sales</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallConversionRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Overall conversion rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Pipeline</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads - totalConverted}</div>
              <p className="text-xs text-muted-foreground">Active leads</p>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Over Time Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Over Time</CardTitle>
            <CardDescription>Daily lead generation and conversion trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionLineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="total" stroke="#8884d8" name="Total Leads" />
                <Line yAxisId="left" type="monotone" dataKey="converted" stroke="#82ca9d" name="Converted" />
                <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#ffc658" name="Conversion Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leads by Stage Chart */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Leads by Stage</CardTitle>
              <CardDescription>Distribution of leads by pipeline stage</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stagePieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stagePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stage Breakdown</CardTitle>
              <CardDescription>Detailed breakdown by stage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leadsByStage.map((item) => (
                  <div key={item.crm_stage_id} className="flex justify-between items-center p-2 border rounded">
                    <span className="font-medium">{item.crmStage?.name || 'Unknown'}</span>
                    <Badge variant="secondary">{item.count} leads</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads by Source Chart */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Leads by Source</CardTitle>
              <CardDescription>Distribution of leads by source</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourcePieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sourcePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Source Breakdown</CardTitle>
              <CardDescription>Detailed breakdown by source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leadsBySource.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border rounded">
                    <span className="font-medium">{item.source || 'Unknown'}</span>
                    <Badge variant="secondary">{item.count} leads</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Conversion Data</CardTitle>
            <CardDescription>Detailed conversion data by date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Total Leads</th>
                    <th className="text-left p-2">Converted</th>
                    <th className="text-left p-2">Conversion Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {conversionData.map((item) => (
                    <tr key={item.date} className="border-b">
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">{item.total}</td>
                      <td className="p-2">{item.converted}</td>
                      <td className="p-2">{item.total > 0 ? ((item.converted / item.total) * 100).toFixed(1) : 0}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ReportsShell>
  );
}
