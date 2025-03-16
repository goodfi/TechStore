'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { BookCopy } from 'lucide-react';
import { AddCategory } from '@/actions/category';

const formSchema = z.object({
  name: z.string().nonempty(),
  slug: z.string().nonempty(),
});

export function CategoryForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await AddCategory({ ...values });

    console.log(result.message);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center w-full justify-center"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  onKeyUp={(e) => {
                    const slugString = '/' + e.currentTarget.value;

                    form.setValue(
                      'slug',
                      slugString.replaceAll(' ', '-').toLowerCase().trim()
                    );
                  }}
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Slug <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <BookCopy />
          Add new Category
        </Button>
      </form>
    </Form>
  );
}
