"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import googleLogo from "../assets/google-logo.png";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const { status, data: session } = useSession();

  async function handleSignin() {
    try {
      await signIn("google", {
        callbackUrl: "/home",
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16">
        <div className="max-w-md mx-auto">
          
          <div className="mb-8">
            <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2 dark:text-white">
            Welcome to AI Image Generator
          </h1>
          <p className="text-lg text-gray-600 mb-8 dark:text-gray-100">
            Sign in and start creating stunning AI-generated images instantly
          </p>

          <div className="space-y-4">
            <button
              onClick={handleSignin}
              className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-gray-700 shadow-md hover:shadow-lg transition-all border border-gray-300"
            >
              <Image
                src={googleLogo}
                alt="Google"
                width={20}
                height={20}
                className="object-contain"
              />
              <span className="font-medium">Login with Google</span>
            </button>

            <p className="text-center text-sm text-gray-500 mt-6 dark:text-gray-200">
              By signing in, you agree to our{" "}
              <Link
                href="/terms-of-use-and-privacy-policy#terms-of-use"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/terms-of-use-and-privacy-policy#privacy-policy"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 bg-gradient-to-br from-purple-600 to-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative w-full max-w-lg">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="relative bg-white bg-opacity-10 rounded-2xl backdrop-filter backdrop-blur-sm p-8 border border-white border-opacity-20 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4">
                Create stunning AI images
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="aspect-square rounded-lg bg-gradient-to-br from-pink-500 to-purple-600"></div>
                <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400"></div>
                <div className="aspect-square rounded-lg bg-gradient-to-br from-amber-500 to-pink-500"></div>
                <div className="aspect-square rounded-lg bg-gradient-to-br from-green-400 to-blue-500"></div>
              </div>

              <p className="text-black font-semibold text-opacity-90">
                Transform your ideas into beautiful visuals with our advanced AI
                technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
