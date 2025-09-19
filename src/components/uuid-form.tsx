'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { guessUuidAction } from '@/app/actions';
import { UuidSchema } from '@/lib/schemas';

type FormValues = z.infer<typeof UuidSchema>;

type GuessResult = {
  success: boolean;
  message: string;
} | null;

export function UuidForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<GuessResult>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(UuidSchema),
    defaultValues: {
      uuid: '',
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    setResult(null);

    const res = await guessUuidAction(data);

    setResult(res);
    setIsSubmitting(false);

    if (res.success) {
      form.reset();
    }
  }

  return (
    <Card className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Enter Your Guess</CardTitle>
            <CardDescription>
              Submit a UUID and see if you're right.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {result && (
              <Alert
                variant={result.success ? 'default' : 'destructive'}
                className="animate-in fade-in-0 zoom-in-95"
              >
                {result.success ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {result.success ? 'Success!' : 'Incorrect'}
                </AlertTitle>
                <AlertDescription>{result.message}</AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="uuid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="uuid-input">Insert UUID</FormLabel>
                  <FormControl>
                    <Input
                      id="uuid-input"
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      {...field}
                      aria-describedby="uuid-error"
                    />
                  </FormControl>
                  <FormMessage id="uuid-error" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                'Guess UUID'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
