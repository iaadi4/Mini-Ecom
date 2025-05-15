"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";

const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-3 group">
        <div className="bg-blue-600 p-2 rounded-lg shadow-sm group-hover:shadow transition-shadow">
          <ShoppingBag className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-blue-600">MarketMate</h1>
      </Link>
      <div className="space-x-4">
        <Link href="/login" passHref>
          <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium">
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const router = useRouter();

  type SignupData = Omit<z.infer<typeof signupSchema>, "confirmPassword"> & {
    confirmPassword?: string;
  };

  const onSubmit = async (data: SignupData) => {
    try {
      const body = { ...data };
      delete body.confirmPassword;
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success("Signup successful");
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Signup failed");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-white border-0 shadow-md rounded-2xl">
          <CardHeader className="text-center space-y-1 pt-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Create an Account
            </CardTitle>
            <p className="text-sm text-gray-500">
              Join us and get started today
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-gray-700">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name")}
                  className="mt-1"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  {...register("password")}
                  className="mt-1"
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  {...register("confirmPassword")}
                  className="mt-1"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Signup"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center py-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
