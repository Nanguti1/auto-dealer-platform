import * as React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[];
  height?: number;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

function LineChartComponent({ className, data, height = 300, ...props }: ChartProps) {
  return (
    <div className={cn('w-full', className)} {...props}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function AreaChartComponent({ className, data, height = 300, ...props }: ChartProps) {
  return (
    <div className={cn('w-full', className)} {...props}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function BarChartComponent({ className, data, height = 300, ...props }: ChartProps) {
  return (
    <div className={cn('w-full', className)} {...props}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function PieChartComponent({ className, data, height = 300, ...props }: ChartProps) {
  return (
    <div className={cn('w-full', className)} {...props}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export {
  LineChartComponent,
  AreaChartComponent,
  BarChartComponent,
  PieChartComponent,
};
