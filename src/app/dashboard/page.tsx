import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { accounts, transactions, user } from "@/lib/data"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { DollarSign, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export default function OverviewPage() {
    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)
    const pendingTransactions = transactions.filter(t => t.status === 'Pending');
    const recentTransactions = transactions.slice(0, 5);
  
    return (
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(accounts[0].availableBalance)}</div>
              <p className="text-xs text-muted-foreground">in Primary Checking</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTransactions.length}</div>
              <p className="text-xs text-muted-foreground">{formatCurrency(pendingTransactions.reduce((sum, t) => sum + t.amount, 0))} total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings Account</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(accounts[1].balance)}</div>
              <p className="text-xs text-muted-foreground">in High-Yield Savings</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {accounts.map((account) => (
                            <div key={account.id} className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <p className="font-medium">{account.name}</p>
                                    <p className="text-sm text-muted-foreground">{account.type} &middot; {account.accountNumber}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-lg">{formatCurrency(account.balance)}</p>
                                    <p className="text-sm text-muted-foreground">Available: {formatCurrency(account.availableBalance)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-headline">Recent Transactions</CardTitle>
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/dashboard/transactions">View all</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            {recentTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">{transaction.description}</TableCell>
                                    <TableCell>{format(new Date(transaction.date), "MMM d")}</TableCell>
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

      </div>
    )
  }
