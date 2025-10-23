'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { month: 'May', spending: 0 },
  { month: 'Jun', spending: 0 },
  { month: 'Jul', spending: 0 },
  { month: 'Aug', spending: 0 },
  { month: 'Sep', spending: 0 },
  { month: 'Oct', spending: 15 },
];

export default function SpendingOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Spending Overview</CardTitle>
        <CardDescription>Your spending over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis
              tickFormatter={(value) => `$${value / 1000}k`}
              tickLine={false}
              axisLine={false}
              domain={[0, 16]}
              ticks={[0, 4, 8, 12, 16]}
            />
            <Bar dataKey="spending" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
