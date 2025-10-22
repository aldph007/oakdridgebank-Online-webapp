'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { accounts } from "@/lib/data"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

const transferFormSchema = z.object({
  fromAccount: z.string().min(1, { message: "Please select an account." }),
  toAccount: z.string().min(1, { message: "Please enter a recipient account number." }),
  amount: z.coerce.number().positive({ message: "Amount must be positive." }),
  memo: z.string().optional(),
})

type TransferFormValues = z.infer<typeof transferFormSchema>;

export default function TransfersPage() {
    const { toast } = useToast()
    const [isConfirming, setIsConfirming] = useState(false);
    const [formData, setFormData] = useState<TransferFormValues | null>(null);

    const form = useForm<TransferFormValues>({
        resolver: zodResolver(transferFormSchema),
        defaultValues: {
          fromAccount: "",
          toAccount: "",
          amount: undefined,
          memo: "",
        },
      })
    
    function onSubmit(values: TransferFormValues) {
        setFormData(values);
        setIsConfirming(true);
    }

    function handleConfirmTransfer() {
        if (!formData) return;
        console.log("Transfer Confirmed:", formData)
        toast({
            title: "Transfer Submitted",
            description: `Successfully initiated transfer of $${formData.amount}.`,
        })
        form.reset();
        setIsConfirming(false);
        setFormData(null);
    }

  const renderTransferForm = (title: string, description: string) => (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fromAccount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From Account</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an account to transfer from" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accounts.map(acc => (
                    <SelectItem key={acc.id} value={acc.id}>
                      {`${acc.name} (${acc.accountNumber}) - Available: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(acc.availableBalance)}`}
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
              <FormLabel>Recipient Account Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter account number" {...field} />
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
         <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Memo (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="What's this transfer for?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto">Review Transfer</Button>
      </form>
    </Form>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-3xl font-bold font-headline">Fund Transfers</h1>
          <p className="text-muted-foreground">Move money securely between your accounts or to others.</p>
        </div>
      <Tabs defaultValue="local" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="local">Local Transfer</TabsTrigger>
          <TabsTrigger value="international">International</TabsTrigger>
          <TabsTrigger value="inter-account">Inter-Account</TabsTrigger>
        </TabsList>
        <TabsContent value="local">
            {renderTransferForm("Local Transfer", "Send money to another bank account within the country.")}
        </TabsContent>
        <TabsContent value="international">
            {renderTransferForm("International Transfer", "Send money to a bank account in another country. Additional fees may apply.")}
        </TabsContent>
        <TabsContent value="inter-account">
            {renderTransferForm("Inter-Account Transfer", "Move money between your own OAKridgebank accounts.")}
        </TabsContent>
      </Tabs>
      <AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Transfer</AlertDialogTitle>
            <AlertDialogDescription>
                Please review the details below before confirming the transfer. This action cannot be undone.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="text-sm space-y-2">
                <div className="flex justify-between"><span className="text-muted-foreground">Amount:</span> <span className="font-medium">{formData?.amount ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(formData.amount) : ''}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">From:</span> <span className="font-medium">{accounts.find(a => a.id === formData?.fromAccount)?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">To:</span> <span className="font-medium">{formData?.toAccount}</span></div>
                {formData?.memo && <div className="flex justify-between"><span className="text-muted-foreground">Memo:</span> <span className="font-medium">{formData.memo}</span></div>}
            </div>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmTransfer}>Confirm Transfer</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    </div>
  )
}
