import { Link } from '@inertiajs/react';
import { BarChart3, TrendingUp, Users, DollarSign, FileText, Download, Star, Trash2 } from 'lucide-react';
import * as React from 'react';
import ReportsShell from '@/components/admin/reports/reports-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SummaryData {
  totalSales: number;
  totalRevenue: number;
  totalVehicles: number;
  totalLeads: number;
  conversionRate: number;
  avgFinanceAmount: number;
}

interface SavedReport {
  id: number;
  name: string;
  type: string;
  is_favorite: boolean;
  created_at: string;
  user?: {
    name: string;
  };
}

interface Props {
  savedReports: SavedReport[];
  summary: SummaryData;
}

export default function Index({ savedReports, summary }: Props) {
  const reportCards = [
    {
      title: 'Sales Report',
      description: 'Track sales performance, revenue trends, and sales by vehicle make',
      icon: <BarChart3 className="h-6 w-6" />,
      href: '/admin/reports/sales',
      color: 'bg-blue-500',
    },
    {
      title: 'Inventory Report',
      description: 'Analyze inventory levels, aging vehicles, and stock by category',
      icon: <FileText className="h-6 w-6" />,
      href: '/admin/reports/inventory',
      color: 'bg-green-500',
    },
    {
      title: 'Lead Report',
      description: 'Monitor lead conversion rates, sources, and pipeline performance',
      icon: <Users className="h-6 w-6" />,
      href: '/admin/reports/leads',
      color: 'bg-purple-500',
    },
    {
      title: 'Finance Report',
      description: 'Review finance applications, approval rates, and lender performance',
      icon: <DollarSign className="h-6 w-6" />,
      href: '/admin/reports/finance',
      color: 'bg-orange-500',
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <ReportsShell title="Reports" description="View and manage business analytics reports">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(summary.totalSales)}</div>
              <p className="text-xs text-muted-foreground">Vehicles sold in period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(summary.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">Revenue in period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(summary.totalVehicles)}</div>
              <p className="text-xs text-muted-foreground">Vehicles in inventory</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(summary.totalLeads)}</div>
              <p className="text-xs text-muted-foreground">Leads in system</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.conversionRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Lead to sale conversion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Finance Amount</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(summary.avgFinanceAmount)}</div>
              <p className="text-xs text-muted-foreground">Average approved amount</p>
            </CardContent>
          </Card>
        </div>

        {/* Report Type Cards */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Available Reports</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {reportCards.map((card) => (
              <Link key={card.href} href={card.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${card.color} text-white`}>{card.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{card.title}</CardTitle>
                        <CardDescription>{card.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Saved Reports */}
        {savedReports.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Saved Reports</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {savedReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {report.is_favorite && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                        <div>
                          <h3 className="font-medium">{report.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            <Badge variant="outline" className="mr-2">
                              {report.type}
                            </Badge>
                            {report.user?.name && <span>By {report.user.name}</span>}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/reports/${report.type}`}>
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => {/* Delete handler */}}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ReportsShell>
  );
}
