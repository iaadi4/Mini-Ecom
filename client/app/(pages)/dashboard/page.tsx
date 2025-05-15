// app/dashboard/page.tsx (or wherever your dashboard page is)
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { PlusCircle, Package, ArrowLeft, Tag } from "lucide-react";

const FALLBACK_IMAGE =
  "https://media.istockphoto.com/id/1180410208/vector/landscape-image-gallery-with-the-photos-stack-up.jpg?s=1024x1024&w=is&k=20&c=K7aMfr_Jo47WnPlHw0cJYWM218xerTeFDsy122LSHu0=";

export default function DashboardPage() {
  interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl?: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/product/user", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProducts(data.data);
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err);
      else console.error("Failed to fetch products, please refresh");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price) {
      toast.error("Name and Price are required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/product/list", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          imageUrl: form.imageUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Product listed successfully");
      setForm({ name: "", description: "", price: "", imageUrl: "" });
      fetchProducts();
      setOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err);
      else console.error("Failed to list product, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-8 py-5 bg-white border-b shadow-sm">
        <div className="flex items-center space-x-2">
          <Package className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
        </div>
        <Link
          href="/home"
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-md border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Products
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">
                    {products.length}
                  </h3>
                </div>
                <div className="bg-blue-50 p-3 rounded-full">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Average Price
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">
                    ₹
                    {products.length > 0
                      ? (
                          products.reduce(
                            (sum, product) =>
                              sum + parseFloat(product.price || "0"),
                            0
                          ) / products.length
                        ).toFixed(2)
                      : "0.00"}
                  </h3>
                </div>
                <div className="bg-blue-50 p-3 rounded-full">
                  <Tag className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-md border-0">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-white/80">
                    Add New Product
                  </p>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-white mt-1 hover:bg-blue-700 pl-0 font-medium"
                      >
                        <PlusCircle className="w-5 h-5 mr-1" />
                        List Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-white">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                          List a New Product
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-2">
                        <div>
                          <Label className="text-gray-700">Product Name</Label>
                          <Input
                            name="name"
                            placeholder="Enter product name"
                            value={form.name}
                            onChange={handleChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-700">Description</Label>
                          <Textarea
                            name="description"
                            placeholder="Describe your product"
                            value={form.description}
                            onChange={handleChange}
                            className="mt-1 min-h-24"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-700">Price (₹)</Label>
                          <Input
                            name="price"
                            type="number"
                            placeholder="29.99"
                            value={form.price}
                            onChange={handleChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-700">Image URL</Label>
                          <Input
                            name="imageUrl"
                            placeholder="https://example.com/image.jpg"
                            value={form.imageUrl}
                            onChange={handleChange}
                            className="mt-1"
                          />
                        </div>
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : "List Product"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="bg-white p-3 rounded-full">
                  <PlusCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Products
          </h2>

          {products.length === 0 ? (
            <Card className="bg-white shadow border-0 p-12">
              <div className="text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Start by listing your first product to see it here.
                </p>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add Your First Product
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-0 bg-white"
                >
                  <div className="relative w-full h-52 overflow-hidden bg-gray-100">
                    <Image
                      src={product.imageUrl || FALLBACK_IMAGE}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                    />
                  </div>
                  <CardHeader className="py-4 px-5">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 pt-0">
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
                      {product.description || "No description provided."}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-semibold text-blue-600 text-lg">
                        ₹{parseFloat(product.price).toFixed(2)}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                      >
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
