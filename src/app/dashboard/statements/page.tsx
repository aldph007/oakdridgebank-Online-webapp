'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon, Download } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { accounts } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const statementFormSchema = z.object({
  accountId: z.string().min(1, { message: 'Please select an account.' }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

type StatementFormValues = z.infer<typeof statementFormSchema>;

export default function StatementsPage() {
  const { toast } = useToast();

  const form = useForm<StatementFormValues>({
    resolver: zodResolver(statementFormSchema),
    defaultValues: {
      accountId: '',
      dateRange: {
        from: new Date(2025, 8, 23),
        to: new Date(2025, 9, 23),
      },
    },
  });

  function onSubmit(values: StatementFormValues) {
    console.log(values);
    toast({
      title: 'Statement Downloaded',
      description: `Your statement for account ${
        accounts.find((a) => a.id === values.accountId)?.name
      } has been downloaded.`,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Account Statements</h1>
        <p className="text-muted-foreground">
          Generate and download your statements for record-keeping.
        </p>
      </div>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline">Generate Statement</CardTitle>
          <CardDescription>
            Select an account and date range to generate a PDF statement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="accountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts.map((acc) => (
                          <SelectItem key={acc.id} value={acc.id}>
                            {`${acc.name} (${acc.accountNumber})`}
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
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date range</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            id="date"
                            variant={'outline'}
                            className={cn(
                              'justify-start text-left font-normal',
                              !field.value.from && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, 'LLL dd, y')} -{' '}
                                  {format(field.value.to, 'LLL dd, y')}
                                </>
                              ) : (
                                format(field.value.from, 'LLL dd, y')
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={{ from: field.value.from, to: field.value.to }}
                          onSelect={(range) => field.onChange(range || { from: new Date(), to: new Date()})}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Statement
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
