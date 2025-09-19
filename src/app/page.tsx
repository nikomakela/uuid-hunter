import { UuidForm } from '@/components/uuid-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-headline font-bold text-primary">
            UUID Hunter
          </h1>
          <p className="text-muted-foreground">
            Your mission: Guess the secret UUID.
          </p>
        </div>
        <UuidForm />
      </div>
    </main>
  );
}
