'use client';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import React, { useTransition } from 'react';
import { SignInSchema, SignUpSchema } from '@/lib/schema';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { signIn, signUp } from './action/auth';

interface Props {
  ButtonText: string;
  type: '/sign-in' | '/sign-up';
}
const FormSign = ({ ButtonText, type }: Props) => {
  const [isPending, startTransition] = useTransition();

  const formSchema = type === '/sign-in' ? SignInSchema : SignUpSchema;
  const defaultV =
    type === '/sign-in'
      ? { email: '', password: '' }
      : { email: '', password: '', username: '', name: '' };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultV,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let error: string;
    startTransition(async () => {
      if (type === '/sign-up') {
        error = await signUp(values);
      }
      if (type === '/sign-in') {
        error = await signIn(values);
      }

      if (error) form.setError('password', { message: error });
    });
  }

  switch (type) {
    case '/sign-in':
      return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
            suppressHydrationWarning
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="joe@doe.eu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {!isPending ? ButtonText : '...Login'}
            </Button>
          </form>
        </Form>
      );
      break;
    case '/sign-up':
      return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
            suppressHydrationWarning
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input placeholder="Johny Silverhand" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="StarLord" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="joe@doe.eu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {!isPending ? ButtonText : '...Login'}
            </Button>
          </form>
        </Form>
      );
  }
};

export default FormSign;
