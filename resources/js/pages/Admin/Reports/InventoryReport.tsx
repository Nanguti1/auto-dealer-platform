import * as React from 'react';
import { router } from '@inertiajs/react';
import { Download, Package, AlertTriangle, DollarSign, Car } from 'lucide-react';
import ReportsShell, { ReportsBackButton } from '@/components/admin/reports/reports-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface InventoryData {
  status: string;
  count: number;
  avg_price: number;
}

interface InventoryByMake {
  make_id: number;
  count: number;
  make?: {
    name: string;
  };
}

interface InventoryByBodyType {
  body_type_id: number;
  count: number;
  bodyType?: {
    name: string;
  };
}

interface Props {
  inventoryData: InventoryData[];
  inventoryByMake: InventoryByMake[];
  inventoryByBodyType: InventoryByBodyType[];
  agedInventory: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function InventoryReport({ inventoryData, inventoryByMake, inventoryByBodyType, agedInventory }: Props) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const totalVehicles = inventoryData.reduce((sum, item) => sum + item.count, 0);
  const avgInventoryPrice = inventoryData.reduce((sum, item) => sum + (item.avg_price * item.count), 0) / totalVehicles || 0;

  const statusPieData = inventoryData.map((item) => ({
    name: item.status,
    value: item.count,
  }));

  const makePieData = inventoryByMake.map((item) => ({
    name: item.make?.name || 'Unknown',
    value: item.count,
  }));

  const bodyTypePieData = inventoryByBodyType.map((item) => ({
    name: item.bodyType?.name || 'Unknown',
    value: item.count,
  }));

  const handleExport = (format: 'csv' | 'excel') => {
    window.location.href = `/admin/reports/export?type=inventory&format=${format}`;
  };

  return (
    <ReportsShell title="Inventory Report" description="Analyze inventory levels and vehicle aging">
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

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVehicles}</div>
              <p className="text-xs text-muted-foreground">Vehicles in inventory</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(avgInventoryPrice)}</div>
              <p className="text-xs text-muted-foreground">Average vehicle price</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aged Inventory</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agedInventory}</div>
              <p className="text-xs text-muted-foreground">Vehicles over 90 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(avgInventoryPrice * totalVehicles)}</div>
              <p className="text-xs text-muted-foreground">Total inventory value</p>
            </CardContent>
          </Card>
        </div>

        {/* Inventory by Status Chart */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Inventory by Status</CardTitle>
              <CardDescription>Distribution of vehicles by status</CardDescription>
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
                {inventoryData.map((item) => (
                  <div key={item.status} className="flex justify-between items-center p-2 border rounded">
                    <span className="font-medium">{item.status}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{item.count} vehicles</Badge>
                      <span className="text-sm text-muted-foreground">{formatCurrency(item.avg_price)} avg</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory by Make Chart */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Inventory by Make</CardTitle>
              <CardDescription>Distribution of vehicles by make</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={makePieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {makePieData.map((entry, index) => (
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
              <CardTitle>Make Breakdown</CardTitle>
              <CardDescription>Detailed breakdown by make</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {inventoryByMake.map((item) => (
                  <div key={item.make_id} className="flex justify-between items-center p-2 border rounded">
                    <span className="font-medium">{item.make?.name || 'Unknown'}</span>
                    <Badge variant="secondary">{item.count} vehicles</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory by Body Type Chart */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Inventory by Body Type</CardTitle>
              <CardDescription>Distribution of vehicles by body type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={bodyTypePieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bodyTypePieData.map((entry, index) => (
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
              <CardTitle>Body Type Breakdown</CardTitle>
              <CardDescription>Detailed breakdown by body type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {inventoryByBodyType.map((item) => (
                  <div key={item.body_type_id} className="flex justify-between items-center p-2 border rounded">
                    <span className="font-medium">{item.bodyType?.name || 'Unknown'}</span>
                    <Badge variant="secondary">{item.count} vehicles</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Aged Inventory Alert */}
        {agedInventory > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800">Aged Inventory Alert</CardTitle>
              <CardDescription className="text-orange-600">
                {agedInventory} vehicles have been in inventory for more than 90 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-orange-700">
                Consider reviewing pricing strategies or marketing efforts for these vehicles to improve turnover.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </ReportsShell>
  );
}
