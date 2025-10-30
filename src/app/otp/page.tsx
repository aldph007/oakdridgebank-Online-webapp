'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Landmark, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function OtpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleVerify = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (otp.length !== 6) {
        setError("Please enter the complete 6-digit code.");
        return;
    }

    const isValidOtp = /[OAK]/i.test(otp);

    if (isValidOtp) {
      toast({
        title: "Login Successful",
        description: "Welcome to your dashboard.",
      });
      router.push('/dashboard');
    } else {
      setError("Invalid OTP. The code must contain 'O', 'A', or 'K'.");
    }
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
                <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value.toUpperCase())}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
                {error && (
                    <div className="mt-4 text-destructive flex items-center gap-2 text-sm">
                        <XCircle className="h-4 w-4" />
                        <span>{error}</span>
                    </div>
                )}
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
