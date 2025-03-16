'use client';

import * as React from 'react';
import { ImagePlus, Loader2, Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddProduct } from '@/actions/product';

export function ProductForm({
  categories,
}: {
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([
    '/placeholder.svg?height=200&width=200',
  ]);

  // Handle form submission

  const formSchema = z.object({
    name: z.string().min(1, { message: 'Product name is required.' }),
    description: z.string(),
    price: z.coerce
      .number()
      .min(0, { message: 'Price must be a positive number.' }),
    reductionPrice: z.coerce.number().min(0),
    inventory: z.number().min(0),
    weight: z.number().min(0).optional(),
    length: z.number().min(0).optional(),
    width: z.number().min(0).optional(),
    height: z.number().min(0).optional(),
    status: z.enum(['active', 'draft', 'archived']),
    category: z.string(),
    tags: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      reductionPrice: 0,
      inventory: 0,
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      status: 'draft',
      category: '',
      tags: '',
    },
  });

  // Handle image upload
  const handleImageUpload = () => {
    // In a real app, this would open a file picker and upload the image
    const newImage = `/placeholder.svg?height=200&width=200&text=Image ${
      images.length + 1
    }`;
    setImages([...images, newImage]);
  };

  // Handle image removal
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitting(true);
    const result = await AddProduct({
      name: values.name,
      description: values.description,
      price: values.price,
      reductionprice: values.reductionPrice,
      inventory: values.inventory,
      category: values.category,
      images: images[0],
    });

    console.log(result.message);
    setIsSubmitting(false);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6 md:grid-cols-6">
          {/* Left column - Main product info */}
          <div className="col-span-6 space-y-6 lg:col-span-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <FormField
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter product description"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Product Images</h3>
                      <p className="text-sm text-muted-foreground">
                        first image is main image
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="aspect-square flex-col gap-1 rounded-md border border-dashed"
                      onClick={handleImageUpload}
                    >
                      <ImagePlus className="h-4 w-4" />
                      <span className="text-xs">Add Image</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-md border bg-muted"
                      >
                        <img
                          src={image || '/placeholder.svg'}
                          alt={`Product image ${index + 1}`}
                          className="h-full w-full rounded-md object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2 h-6 w-6"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="pricing">
                  <TabsList className="mb-4">
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  </TabsList>

                  <TabsContent value="pricing" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">
                                  $
                                </span>
                                <Input
                                  type="number"
                                  step="0.01"
                                  min={0}
                                  className="pl-7"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="reductionPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>reduction Price</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5 text-muted-foreground">
                                  $
                                </span>
                                <Input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  className="pl-7"
                                  {...field}
                                />
                              </div>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="inventory" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        name="sku"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Inventory</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="shipping" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <FormField
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight (kg)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder={'0.00'}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="length"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Length (cm)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                min="0"
                                placeholder="0.0"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="width"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Width (cm)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                min="0"
                                placeholder="0.0"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="0.0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Organization and images */}

          <Card className="col-span-6 lg:col-span-2">
            <CardContent className="p-6 w-full">
              <div className="space-y-4">
                <FormField
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        defaultValue="draft"
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        required
                        defaultValue={categories[0].id}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="summer, sale, new" {...field} />
                      </FormControl>
                      <FormDescription>
                        Separate tags with commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <Button
            type="reset"
            variant="outline"
            onClick={() => router.push('/admin/products')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Product
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
