'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { accounts, transactions, user } from "@/lib/data"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { DollarSign } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SpendingOverview from "./spending-overview"
import QuickTransfer from "./quick-transfer"

function formatCurrency(amount: number) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));

  if (amount < 0) {
    return `-${formattedAmount}`;
  }
  if (amount > 0) {
    return `+${formattedAmount}`;
  }
  return formattedAmount;
}

export default function OverviewPage() {
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)
    const recentTransactions = transactions.slice(0, 5);
  
    return (
      <div className="space-y-8">
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalBalance)}</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(accounts[0].availableBalance)}</div>
              <p className="text-xs text-muted-foreground">in Primary Checking</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings Account</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(accounts[1].balance)}</div>
              <p className="text-xs text-muted-foreground">in High-Yield Savings</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SpendingOverview />
          </div>
          <div className="lg:col-span-2">
            <QuickTransfer />
          </div>
        </div>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline">Recent Transactions</CardTitle>
                <Button asChild variant="ghost" size="sm">
                    <Link href="/dashboard/history">View all</Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        {recentTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{format(new Date(transaction.date), "MMM d")}</TableCell>
                                <TableCell className="font-medium">{transaction.description}</TableCell>
                                <TableCell>{transaction.status}</TableCell>
                                <TableCell className="text-right">
                                    <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-foreground'}>
                                        {formatCurrency(transaction.amount)}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

      </div>
    )
  }
