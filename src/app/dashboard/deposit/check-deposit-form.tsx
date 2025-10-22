'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { depositCheck } from '@/ai/flows/check-deposit';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, XCircle, Loader2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { accounts } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const depositConfirmationSchema = z.object({
  accountNumber: z.string().min(1, 'Account number is required.'),
  routingNumber: z.string().min(1, 'Routing number is required.'),
  checkNumber: z.string().min(1, 'Check number is required.'),
  amount: z.coerce.number().positive('Amount must be positive.'),
  payee: z.string().min(1, 'Payee is required.'),
  date: z.string().min(1, 'Date is required.'),
  depositToAccount: z.string().min(1, 'Please select an account to deposit into.'),
});

type DepositState = 'idle' | 'processing' | 'confirming' | 'error' | 'depositing' | 'success';

export default function CheckDepositForm() {
  const [state, setState] = useState<DepositState>('idle');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof depositConfirmationSchema>>({
    resolver: zodResolver(depositConfirmationSchema),
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) { // 4MB limit
        setErrorMessage('File size must be less than 4MB.');
        setState('error');
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const imageDataUri = reader.result as string;
      setImagePreview(imageDataUri);
      setState('processing');
      setErrorMessage(null);

      try {
        const result = await depositCheck({ checkImageDataUri: imageDataUri });
        form.reset({
          ...result,
          depositToAccount: '',
        });
        setState('confirming');
      } catch (error) {
        console.error('AI processing failed:', error);
        setErrorMessage('Failed to read check details. Please try again with a clearer image.');
        setState('error');
      }
    };
  };

  const onSubmit = async (data: z.infer<typeof depositConfirmationSchema>) => {
    setState('depositing');
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Depositing:', data);
    setState('success');
  };

  const onSuccessfulDeposit = (amount: number) => {
    toast({
      title: 'Deposit Successful',
      description: `Successfully deposited ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)} into your account.`,
      variant: 'default',
    });
  }

  const resetState = () => {
    setState('idle');
    setImagePreview(null);
    setErrorMessage(null);
    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (state === 'success') {
    onSuccessfulDeposit(form.getValues('amount'));
    return (
      <Card className="text-center">
        <CardContent className="p-8">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold font-headline mb-2">Deposit Successful!</h2>
          <p className="text-muted-foreground mb-6">The funds will be available in your account shortly.</p>
          <Button onClick={resetState}>Deposit Another Check</Button>
        </CardContent>
      </Card>
    );
  }
  
  if (state === 'idle' || state === 'error') {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-center hover:border-primary transition-colors">
                    <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload a check image</h3>
                    <p className="text-sm text-muted-foreground mb-4">PNG, JPG, or WEBP. Max size 4MB.</p>
                    <Button onClick={() => fileInputRef.current?.click()}>
                        Choose File
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/png, image/jpeg, image/webp"
                    />
                     {state === 'error' && errorMessage && (
                        <div className="mt-4 text-destructive flex items-center gap-2">
                            <XCircle className="h-4 w-4" />
                            <span>{errorMessage}</span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
  }

  if (state === 'processing') {
    return (
      <Card>
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
          <h2 className="text-2xl font-bold font-headline">Analyzing Check...</h2>
          <p className="text-muted-foreground">Our AI is extracting the details. Please wait.</p>
        </CardContent>
      </Card>
    );
  }

  if (state === 'confirming' || state === 'depositing') {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={resetState} disabled={state === 'depositing'}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="font-headline">Confirm Deposit Details</CardTitle>
              <CardDescription>Please verify the information extracted from the check.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                {imagePreview && (
                    <div className="relative aspect-[16/7] w-full rounded-lg overflow-hidden border">
                        <Image src={imagePreview} alt="Check preview" fill objectFit="contain" />
                    </div>
                )}
            </div>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField control={form.control} name="depositToAccount" render={({ field }) => (
                    <FormItem><FormLabel>Deposit To</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={state === 'depositing'}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select an account" /></SelectTrigger></FormControl>
                            <SelectContent>{accounts.map(acc => (<SelectItem key={acc.id} value={acc.id}>{acc.name} ({acc.accountNumber})</SelectItem>))}</SelectContent>
                        </Select><FormMessage />
                    </FormItem>)} />
                <FormField control={form.control} name="amount" render={({ field }) => (<FormItem><FormLabel>Amount</FormLabel><FormControl><Input type="number" {...field} disabled={state === 'depositing'} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="payee" render={({ field }) => (<FormItem><FormLabel>Payee</FormLabel><FormControl><Input {...field} disabled={state === 'depositing'} /></FormControl><FormMessage /></FormItem>)}/>
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="accountNumber" render={({ field }) => (<FormItem><FormLabel>Account Number</FormLabel><FormControl><Input {...field} disabled={state === 'depositing'} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="routingNumber" render={({ field }) => (<FormItem><FormLabel>Routing Number</FormLabel><FormControl><Input {...field} disabled={state === 'depositing'} /></FormControl><FormMessage /></FormItem>)}/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="checkNumber" render={({ field }) => (<FormItem><FormLabel>Check Number</FormLabel><FormControl><Input {...field} disabled={state === 'depositing'} /></FormControl><FormMessage /></FormItem>)}/>
                    <FormField control={form.control} name="date" render={({ field }) => (<FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} disabled={state === 'depositing'} /></FormControl><FormMessage /></FormItem>)}/>
                </div>
                <CardFooter className="px-0 pt-4">
                    <Button type="submit" className="w-full" disabled={state === 'depositing'}>
                        {state === 'depositing' ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Depositing...</>) : 'Confirm and Deposit'}
                    </Button>
                </CardFooter>
                </form>
            </Form>
        </CardContent>
      </Card>
    );
  }
}
