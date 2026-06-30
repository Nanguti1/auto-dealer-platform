import { router } from '@inertiajs/react';
import { Download, DollarSign, TrendingUp, CreditCard, Calendar, CheckCircle } from 'lucide-react';
import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import ReportsShell, { ReportsBackButton } from '@/components/admin/reports/reports-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FinanceData {
  date: string;
  count: number;
  total_requested: number;
  total_approved: number;
}

interface FinanceByStatus {
  status: string;
  count: number;
}

interface FinanceByLender {
  lender_id: number;
  count: number;
  lender?: {
    name: string;
  };
}

interface Filters {
  start_date: string;
  end_date: string;
}

interface Props {
  financeData: FinanceData[];
  financeByStatus: FinanceByStatus[];
  financeByLender: FinanceByLender[];
  filters: Filters;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function FinanceReport({ financeData, financeByStatus, financeByLender, filters }: Props) {
  const [startDate, setStartDate] = React.useState(filters.start_date);
  const [endDate, setEndDate] = React.useState(filters.end_date);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/admin/reports/finance', { start_date: startDate, end_date: endDate }, { preserveState: true });
  };

  const handleExport = (format: 'csv' | 'excel') => {
    window.location.href = `/admin/reports/export?type=finance&format=${format}&start_date=${startDate}&end_date=${endDate}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const totalApplications = financeData.reduce((sum, item) => sum + item.count, 0);
  const totalRequested = financeData.reduce((sum, item) => sum + Number(item.total_requested), 0);
  const totalApproved = financeData.reduce((sum, item) => sum + Number(item.total_approved), 0);
  const approvalRate = totalApplications > 0 ? (totalApproved / totalRequested) * 100 : 0;

  const statusPieData = financeByStatus.map((item) => ({
    name: item.status,
    value: item.count,
  }));

  const lenderPieData = financeByLender.map((item) => ({
    name: item.lender?.name || 'Unknown',
    value: item.count,
  }));

  const financeLineData = financeData.map((item) => ({
    ...item,
    approval_rate: item.total_requested > 0 ? ((item.total_approved / item.total_requested) * 100).toFixed(1) : 0,
  }));

  return (
    <ReportsShell title="Finance Report" description="Review finance applications and approval performance">
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
            <CardDescription>Filter finance data by date range</CardDescription>
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
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications}</div>
              <p className="text-xs text-muted-foreground">Finance applications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requested</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalRequested)}</div>
              <p className="text-xs text-muted-foreground">Total amount requested</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalApproved)}</div>
              <p className="text-xs text-muted-foreground">Total amount approved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvalRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Overall approval rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Finance Over Time Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Finance Applications Over Time</CardTitle>
            <CardDescription>Daily application volume and approval trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={financeLineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="count" stroke="#8884d8" name="Applications" />
                <Line yAxisId="right" type="monotone" dataKey="total_requested" stroke="#82ca9d" name="Requested" />
                <Line yAxisId="right" type="monotone" dataKey="total_approved" stroke="#ffc658" name="Approved" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Finance by Status Chart */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Applications by Status</CardTitle>
              <CardDescription>Distribution of applications by status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
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
              <CardTitle>Status Breakdown</CardTitle>
              <CardDescription>Detailed breakdown by status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {financeByStatus.map((item) => (
                  <div key={item.status} className="flex justify-between items-center p-2 border rounded">
                    <span className="font-medium">{item.status}</span>
                    <Badge variant="secondary">{item.count} applications</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Finance by Lender Chart */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Applications by Lender</CardTitle>
              <CardDescription>Distribution of applications by lender</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={lenderPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {lenderPieData.map((entry, index) => (
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
              <CardTitle>Lender Breakdown</CardTitle>
              <CardDescription>Detailed breakdown by lender</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {financeByLender.map((item) => (
                  <div key={item.lender_id} className="flex justify-between items-center p-2 border rounded">
                    <span className="font-medium">{item.lender?.name || 'Unknown'}</span>
                    <Badge variant="secondary">{item.count} applications</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Finance Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Finance Data</CardTitle>
            <CardDescription>Detailed finance data by date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Applications</th>
                    <th className="text-left p-2">Total Requested</th>
                    <th className="text-left p-2">Total Approved</th>
                    <th className="text-left p-2">Approval Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {financeData.map((item) => (
                    <tr key={item.date} className="border-b">
                      <td className="p-2">{item.date}</td>
                      <td className="p-2">{item.count}</td>
                      <td className="p-2">{formatCurrency(Number(item.total_requested))}</td>
                      <td className="p-2">{formatCurrency(Number(item.total_approved))}</td>
                      <td className="p-2">
                        {item.total_requested > 0 ? ((item.total_approved / item.total_requested) * 100).toFixed(1) : 0}%
                      </td>
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
