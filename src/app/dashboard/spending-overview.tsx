'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTooltip, ChartTooltipContent, ChartContainer } from '@/components/ui/chart';

const data = [
  { month: 'May', spending: 2500 },
  { month: 'Jun', spending: 3200 },
  { month: 'Jul', spending: 2800 },
  { month: 'Aug', spending: 4100 },
  { month: 'Sep', spending: 3500 },
  { month: 'Oct', spending: 3800 },
];

export default function SpendingOverview() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Spending Overview</CardTitle>
        <CardDescription>Your spending over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }} />
            <YAxis
              tickFormatter={(value) => `$${value / 1000}k`}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--accent))', opacity: 0.1 }}
              content={({ active, payload, label }) =>
                active && payload && payload.length ? (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col space-y-1">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                        <span className="font-bold text-foreground">
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(payload[0].value as number)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null
              }
            />
            <Bar dataKey="spending" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
