"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, UserPlus } from "lucide-react";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Regular Customer",
      content:
        "MarketMate has completely changed how I shop. The interface is intuitive and finding what I need is a breeze!",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxrd4dsitg-Rhwx0aUZsGjzqkZn34JbVC9-w&s",
    },
    {
      id: 2,
      name: "Raj Patel",
      role: "Small Business Owner",
      content:
        "As a seller, the platform makes it easy to list products and connect with customers. The analytics are invaluable.",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvZRzCOTmTpG-0zKoHeoNr8J-LeI_ihfZO3Q&s",
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Tech Enthusiast",
      content:
        "The product recommendations are spot on! It's like the platform knows what I want before I do.",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEz1ve3QQhGM3EKWe1dDjnQAOqyMv0RUEcnw&s",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header
        className={`sticky top-0 z-10 transition-all duration-200 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-blue-600 p-2 rounded-lg shadow-sm group-hover:shadow transition-shadow">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-blue-600">MarketMate</h1>
            </Link>

            <div className="hidden md:flex space-x-8">
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                FAQ
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:opacity-90 transition-opacity shadow-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="pt-10 pb-16 md:pt-16 md:pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Your One-Stop Marketplace for All Your Needs
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Join thousands of satisfied customers who find exactly what
                  they&apos;re looking for at prices they love.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Link href="/signup">
                    <Button className="w-full sm:w-auto bg-blue-600 hover:opacity-90 transition-opacity shadow-sm text-lg px-8 py-3 h-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-blue-200 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 h-auto"
                    >
                      Browse Products
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 p-4">
                  <div className="bg-blue-50 rounded-lg aspect-video relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="inline-block p-4 bg-white rounded-full shadow-md mb-4">
                          <ShoppingBag className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="text-blue-600 font-bold text-2xl mb-2">
                          MarketMate
                        </h3>
                        <p className="text-blue-800 font-medium">
                          The smarter way to shop online
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {[
                      "https://thumbs.dreamstime.com/b/comic-cartoon-cleaning-product-retro-book-style-52915863.jpg",
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNHngT-VYvS5Zm4NjShSDq1l3hqp5-1ixmFA&s",
                      "https://media.istockphoto.com/id/1362717505/vector/milk-product-natural-ingredient-butter-or-margarine-icon-concept-cartoon-organic-dairy.jpg?s=612x612&w=0&k=20&c=lsNoweI2yrj5PyED5YZ5gELk_worcwYEP0vuA8ekHN0=",
                    ].map((src, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 rounded-md aspect-square relative overflow-hidden"
                      >
                        <Image
                          src={src}
                          alt={`Product preview ${index + 1}`}
                          className="object-cover"
                          fill
                          sizes="(max-width: 768px) 33vw, 15vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md text-sm font-medium">
                  <span className="flex items-center">
                    <Star className="h-4 w-4 mr-1" fill="currentColor" /> 4.9/5
                    Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold mb-1">10K+</div>
                <div className="text-blue-100">Products</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold mb-1">5K+</div>
                <div className="text-blue-100">Happy Customers</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-blue-100">Vendors</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold mb-1">99%</div>
                <div className="text-blue-100">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                What Our Users Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don&apos;t just take our word for it. See what our community has
                to say about their MarketMate experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden relative mr-3">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="object-cover"
                        fill
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Got questions? We have answers.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Can I sell my products on MarketMate?",
                  answer:
                    "Absolutely! You'll need to sign up for a Business account to list and sell products. Our Business plan includes all the tools you need to manage your inventory, track sales, and grow your business.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, debit cards, UPI, net banking, and popular digital wallets. All transactions are secured with industry-standard encryption to keep your information safe.",
                },
                {
                  question: "What is your return policy?",
                  answer:
                    "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Some categories may have different return policies, which will be clearly indicated on the product page.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Shopping Experience?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have already discovered
              the MarketMate difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <Button className="px-8 py-3 h-auto bg-white text-blue-600 hover:bg-blue-50 transition-colors shadow-md text-lg">
                  <UserPlus className="h-5 w-5 mr-2" /> Create Account
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="px-8 py-3 h-auto border-white text-blue-600 hover:bg-blue-500 transition-colors text-lg"
                >
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-600 p-2 rounded-md mr-2">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">MarketMate</span>
            </div>

            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500 border-t border-gray-800 pt-4">
            © 2025 MarketMate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
