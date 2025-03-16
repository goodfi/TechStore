'use client';

import * as React from 'react';
import {
  ArrowUpDown,
  MoreHorizontal,
  Package,
  Pencil,
  Search,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const categories = [
  'All Categories',
  'Clothing',
  'Electronics',
  'Home Goods',
  'Accessories',
  'Fitness',
];
const statuses = ['All Statuses', 'In Stock', 'Low Stock', 'Out of Stock'];

export function ProductsTable({
  products,
}: {
  products:
    | {
        products: {
          id: string;
          img: string;
          name: string;
          slug: string;
          status: string;
          rating: number;
          price: number;
          lowestPrice: number;
          reductionPrice: number;
          desc: string;
          quantity: number;
          createdAt: string;
          updatedAt: string;
        };
        product_to_category: {
          productId: string;
          categoryId: string;
        };
        category: {
          id: string;
          name: string;
          slug: string;
        };
      }[]
    | [];
}) {
  const [sortBy, setSortBy] = React.useState('name');
  const [sortOrder, setSortOrder] = React.useState('asc');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('All Categories');
  const [statusFilter, setStatusFilter] = React.useState('All Statuses');
  let filteredProducts;
  if (!products) {
    filteredProducts = null;
  }

  // Sort and filter products
  filteredProducts = React.useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.products.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.products.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== 'All Categories') {
      result = result.filter(
        (product) => product.category.name === categoryFilter
      );
    }

    // Apply status filter
    if (statusFilter !== 'All Statuses') {
      result = result.filter(
        (product) => product.products.status === statusFilter
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a.products[sortBy as keyof typeof a.products];
      const bValue = b.products[sortBy as keyof typeof b.products];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    return result;
  }, [products, sortBy, sortOrder, searchQuery, categoryFilter, statusFilter]);

  // Toggle sort order
  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'InStock':
        return 'bg-green-100 text-green-800 hover:bg-green-100/80';
      case 'LowStock':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80';
      case 'OutofStock':
        return 'bg-red-100 text-red-800 hover:bg-red-100/80';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100/80';
    }
  };

  return (
    <Card>
      <CardContent className="p-0 flex-1">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="rounded-md ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => toggleSort('name')}
                    className="flex items-center gap-1 px-0 font-medium"
                  >
                    Product
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => toggleSort('price')}
                    className="flex items-center gap-1 px-0 font-medium"
                  >
                    Price
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => toggleSort('quantity')}
                    className="flex items-center gap-1 px-0 font-medium"
                  >
                    Inventory
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts === null ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <Package className="h-8 w-8 text-muted-foreground" />
                      <p className="text-lg font-medium">No products found</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.products.id}>
                    <TableCell>
                      <Image
                        src={product.products.img || '/placeholder.svg'}
                        alt={product.products.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {product.products.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {product.products.id}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>${product.products.price}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(product.products.status)}
                      >
                        {product.products.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.products.quantity}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
