import CheckDepositForm from "./check-deposit-form";

export default function DepositPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Check Deposit</h1>
        <p className="text-muted-foreground">
          Deposit checks by uploading an image. Powered by AI.
        </p>
      </div>
      <CheckDepositForm />
    </div>
  );
}
