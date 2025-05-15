"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/product/all", {
          credentials: "include",
        });
        const result = await res.json();
        console.log(result);
        if (res.ok) setProducts(result.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          <h1 className="text-xl font-semibold tracking-wide text-gray-800">
            MarketMate
          </h1>
        </div>
        <div>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </nav>

      <main className="py-10 px-4 md:px-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Explore Products
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg truncate">
                  {product.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="aspect-square w-full relative rounded-lg overflow-hidden">
                  <Image
                    src={product.imageUrl || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.description.length > 60
                    ? product.description.slice(0, 60) + "..."
                    : product.description}
                </p>
                <p className="text-md font-semibold text-gray-800">
                  ₹{product.price.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
