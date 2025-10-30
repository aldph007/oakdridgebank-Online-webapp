'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Landmark } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const router = useRouter();

  const handleVerify = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically handle OTP verification
    // For this scaffold, we'll just navigate to the dashboard
    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
                <Landmark className="h-10 w-10 text-primary" />
                <h1 className="text-3xl font-bold font-headline text-primary">OAKridgebank</h1>
            </div>
            <CardTitle className="text-2xl font-headline">Enter Verification Code</CardTitle>
            <CardDescription>
              A 6-digit code has been sent to your registered device.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleVerify}>
            <CardContent className="flex flex-col items-center space-y-4">
                <InputOTP maxLength={6}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full">Verify Code</Button>
              <p className="text-sm text-center text-muted-foreground">
                Didn't receive a code?{' '}
                <Link href="#" className="underline text-primary hover:text-primary/80">
                  Resend
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
