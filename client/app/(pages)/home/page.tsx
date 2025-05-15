"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Search, LogOut, Heart, Bell, X, Trash2 } from "lucide-react";

const FALLBACK_IMAGE = "https://media.istockphoto.com/id/1180410208/vector/landscape-image-gallery-with-the-photos-stack-up.jpg?s=1024x1024&w=is&k=20&c=K7aMfr_Jo47WnPlHw0cJYWM218xerTeFDsy122LSHu0=";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/product/all", {
        credentials: "include",
      });
      const result = await res.json();

      if (res.ok) {
        setProducts(result.data);
        setShowSearchResults(false);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchProducts();
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`http://localhost:5000/api/product/filter/${searchQuery}`, {
        method: "GET",
        credentials: "include"
      });

      const result = await res.json();
      console.log(result);
      if (res.ok) {
        setProducts(result.data);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error("Failed to search products", error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    fetchProducts();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-blue-600 p-2 rounded-lg shadow-sm group-hover:shadow transition-shadow">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-blue-600">MarketMate</h1>
            </Link>

            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button
                onClick={handleSearch}
                className="ml-2 bg-blue-600 hover:opacity-90 transition-opacity rounded-full shadow-sm"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <Link href="#" className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors">
                <Heart className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors">
                <Bell className="h-5 w-5" />
              </Link>
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:opacity-90 transition-opacity shadow-sm">
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="md:hidden px-4 pb-4">
          <div className="flex">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              onClick={handleSearch}
              className="ml-2 bg-blue-600 hover:opacity-90 transition-opacity rounded-full shadow-sm"
              disabled={isSearching}
            >
              Search
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <section className="mb-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Find Everything You Need
                </h2>
                <p className="text-gray-600 mb-6">
                  Browse our marketplace for quality products at great prices.
                </p>
                <Button className="self-start bg-blue-600 hover:opacity-90 transition-opacity shadow-sm rounded-full px-6">
                  Shop Now
                </Button>
              </div>
              <div className="md:w-1/2 h-48 md:h-auto relative bg-blue-50">
                <div className="w-full h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="inline-block p-3 bg-white rounded-full shadow-md mb-4">
                      <ShoppingBag className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-blue-600 font-semibold text-xl">
                      Welcome to MarketMate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {showSearchResults && (
          <div className="bg-white rounded-lg shadow-sm mb-6 p-4 flex justify-between items-center border-l-4 border-blue-500">
            <div>
              <h3 className="font-medium text-gray-800">
                Search Results for &quot;{searchQuery}&quot;
              </h3>
              <p className="text-sm text-gray-500">
                Found {products.length} product{products.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Button
              onClick={clearSearch}
              variant="outline"
              className="flex items-center border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Search
            </Button>
          </div>
        )}

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">
              {showSearchResults ? "Search Results" : "Latest Products"}
            </span>
            {isLoading && (
              <div className="ml-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            )}
          </h3>

          {isLoading || isSearching ? (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {[...Array(10)].map((_, index) => (
                <Card key={index} className="overflow-hidden border shadow-sm">
                  <div className="aspect-square w-full bg-gray-100 animate-pulse"></div>
                  <div className="p-3">
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3 mb-2"></div>
                    <div className="h-5 bg-gray-100 rounded animate-pulse w-1/4 mt-2"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow transition-shadow border border-gray-100 group">
                  <div className="aspect-square w-full relative bg-gray-50">
                    <Image
                      src={product.imageUrl || FALLBACK_IMAGE}
                      alt={product.name}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    />
                    <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white">
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-gray-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-1 mb-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-md font-semibold text-blue-600">
                        ₹{product.price.toFixed(2)}
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:opacity-90 transition-opacity text-xs px-3 py-1 h-auto">
                        Add
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="inline-block p-3 bg-gray-50 rounded-full mb-4">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-3">No products found for &quot;{searchQuery}&quot;</p>
              <Button
                variant="outline"
                onClick={clearSearch}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Clear Search
              </Button>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-600 p-1.5 rounded-md mr-2">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-blue-600">MarketMate</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            </div>
            <p className="text-sm text-gray-500 mt-4 md:mt-0">© 2025 MarketMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
