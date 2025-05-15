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

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/product/user", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProducts(data.data);
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch products");
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
      fetchProducts(); // Refresh list
    } catch (err: any) {
      toast.error(err.message || "Failed to list product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Your Dashboard</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">List New Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>List a Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  placeholder="Product name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  name="description"
                  placeholder="Product description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  name="price"
                  type="number"
                  placeholder="e.g., 29.99"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={form.imageUrl}
                  onChange={handleChange}
                />
              </div>
              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500">No products listed yet.</p>
        ) : (
          products.map((product: any) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {product.imageUrl && (
                  <div className="relative w-full h-40 rounded-md overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
                <p className="font-semibold text-blue-600">${product.price}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
