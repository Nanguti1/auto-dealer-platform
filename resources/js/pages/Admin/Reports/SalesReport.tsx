import { Link, router } from '@inertiajs/react';
import { ArrowLeft, Download, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ReportsShell, { ReportsBackButton } from '@/components/admin/reports/reports-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SalesData {
  date: string;
  count: number;
  total: number;
}

interface SalesByMake {
  make_id: number;
  count: number;
  make?: {
    name: string;
  };
}

interface Filters {
  start_date: string;
  end_date: string;
}

interface Props {
  salesData: SalesData[];
  salesByMake: SalesByMake[];
  filters: Filters;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function SalesReport({ salesData, salesByMake, filters }: Props) {
  const [startDate, setStartDate] = React.useState(filters.start_date);
  const [endDate, setEndDate] = React.useState(filters.end_date);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/admin/reports/sales', { start_date: startDate, end_date: endDate }, { preserveState: true });
  };

  const handleExport = (format: 'csv' | 'excel') => {
    window.location.href = `/admin/reports/export?type=sales&format=${format}&start_date=${startDate}&end_date=${endDate}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const totalSales = salesData.reduce((sum, item) => sum + item.count, 0);
  const totalRevenue = salesData.reduce((sum, item) => sum + Number(item.total), 0);

  const pieData = salesByMake.map((item) => ({
    name: item.make?.name || 'Unknown',
    value: item.count,
  }));

  return (
    <ReportsShell title="Sales Report" description="Track sales performance and revenue trends">
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
            <CardDescription>Filter sales data by date range</CardDescription>
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
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSales}</div>
              <p className="text-xs text-muted-foreground">Vehicles sold in period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">Revenue in period</p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Over Time Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
            <CardDescription>Daily sales count and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="count" fill="#8884d8" name="Sales Count" />
                <Bar yAxisId="right" dataKey="total" fill="#82ca9d" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Make Chart */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Make</CardTitle>
              <CardDescription>Distribution of sales by vehicle make</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
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
              <CardTitle>Sales by Make Table</CardTitle>
              <CardDescription>Detailed breakdown by make</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {salesByMake.map((item) => (
                  <div key={item.make_id} className="flex justify-between items-center p-2 border rounded">
                    <span className="font-medium">{item.make?.name || 'Unknown'}</span>
                    <Badge variant="secondary">{item.count} sales</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Data</CardTitle>
            <CardDescription>Detailed sales data by date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Sales Count</th>
                    <th className="text-left p-2">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((item) => (
                    <tr key={item.date} className="border-b">
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">{item.count}</td>
                      <td className="p-2">{formatCurrency(Number(item.total))}</td>
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
