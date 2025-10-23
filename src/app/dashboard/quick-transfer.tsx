'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { accounts } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const quickTransferSchema = z.object({
  fromAccount: z.string().min(1, { message: "Please select an account." }),
  toAccount: z.string().min(1, { message: "Please enter a recipient." }),
  amount: z.coerce.number().positive({ message: "Amount must be positive." }),
});

export default function QuickTransfer() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof quickTransferSchema>>({
    resolver: zodResolver(quickTransferSchema),
    defaultValues: {
      fromAccount: accounts[0].id,
      toAccount: "",
      amount: 0,
    },
  });

  function onSubmit(values: z.infer<typeof quickTransferSchema>) {
    console.log(values);
    toast({
      title: "Transfer Sent",
      description: `You sent ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(values.amount)} to account ${values.toAccount}.`,
    });
    form.reset({
        ...values,
        toAccount: "",
        amount: 0,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Quick Transfer</CardTitle>
        <CardDescription>Send money in a snap.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fromAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts.map(acc => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input placeholder="Recipient account number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                      <Input type="number" placeholder="0.00" className="pl-7" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Send Money <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
