"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import imagesExamples from "../generated_images_example";
import { nanoid } from "nanoid";
import {
  ArrowRight,
  Sparkles,
  MessageSquare,
  Clock,
  Download,
  PlayCircle,
} from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { Poetsen_One } from "next/font/google";

const poetsenOne = Poetsen_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const HomePage = () => {
  const steps = [
    {
      number: 1,
      title: "Enter your prompt",
      description: "Describe what you want to create with the AI",
      icon: MessageSquare,
    },
    {
      number: 2,
      title: "Wait for generation",
      description: "The AI takes a few seconds to create your images",
      icon: Clock,
    },
    {
      number: 3,
      title: "Download results",
      description: "Save your generated images to your device",
      icon: Download,
    },
  ];

  return (
    <main className="container text-black mx-auto max-w-7xl py-12 px-4 dark:text-white">
      <section className="flex flex-col items-center text-center mb-16">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          <h1
            className={`text-4xl ${poetsenOne.className} md:text-5xl font-bold mb-6`}
          >
            <Typewriter
              words={[
                "Welcome to AI-IMAGE-CREATOR",
                "Express Your Imagination",
              ]}
              loop={1}
              cursor
              cursorStyle="/"
              typeSpeed={55}
            />
          </h1>
        </div>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-700 dark:text-gray-500 ">
          Create stunning, unique visuals that bring your wildest ideas to life
          with our AI image generator.
        </p>

        <section className="py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="flex flex-1 flex-col items-center text-center dark:text-gray-500"
                >
                  <div className="mb-4 bg-blue-100 rounded-full p-4 text-blue-600">
                    <step.icon size={28} />
                  </div>
                  <div className="mb-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>

                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute transform translate-x-full">
                      <ArrowRight className="text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="py-8 px-4 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md overflow-hidden dark:from-gray-950 dark:to-gray-900 dark:border dark:border-gray-800">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <PlayCircle className="text-blue-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-500">
                  Demo Video
                </h2>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Watch how our AI image generator works in this quick
                demonstration
              </p>

              <div className="rounded-lg overflow-hidden shadow-lg aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/IbmKTiq8yns?si=gZIxxpOar-_hLEAR"
                  title="AI Image Generator Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/home/ai-image-creator"
          className="flex flex-row mt-10 text-xl items-center border border-black gap-2 bg-transparent dark:bg-transparent text-black dark:text-white dark:border-white px-6 py-3 rounded-full font-medium transition-all hover:opacity-90 hover:scale-105"
        >
          <span className=" self-center">Start Creating</span>
          <ArrowRight className=" self-center" size={30} />
        </Link>
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Sparkles className="text-yellow-500" size={24} />
          <h2 className="text-3xl font-bold text-center">Gallery Showcase</h2>
          <Sparkles className="text-yellow-500" size={24} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {imagesExamples.map((image, index) => (
            <Link key={nanoid(10)} href={`/image/${index}`}>
              <div className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all dark:border dark:border-gray-700 hover:shadow-xl">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={image.src}
                    alt={`AI Generated Example ${index + 1}`}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <p className="text-white font-medium p-4">{image.prompt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/home/ai-image-creator"
            className="flex items-center gap-2 text-lg font-medium text-purple-600 dark:text-purple-400 hover:underline"
          >
            <span>Create your own</span>
            <ArrowRight className=" self-center" size={28} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
