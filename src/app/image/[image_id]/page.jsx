"use client";
import React from "react";
import { use } from "react";
import imagesExamples from "@/app/generated_images_example";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

const ShowcasedImagePage = ({ params }) => {
  const resolvedParams = use(params);
  const id = resolvedParams.image_id;
  const currentImage = imagesExamples[id];

  const hasPrevious = id > 0;
  const hasNext = id < imagesExamples.length - 1;

  const downloadImage = async (imageModule, timestamp) => {
    try {
      const response = await fetch(imageModule.src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `generated-image-${timestamp}.png`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/home"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-400 hover:text-black transition-colors dark:hover:text-white"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Gallery</span>
        </Link>

        <div className="text-sm font-medium text-gray-500">
          Image {Number(id) + 1} of {imagesExamples.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
          <div className="relative aspect-square">
            <Image
              src={currentImage.src}
              alt={`AI Generated Image ${id}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover dark:border dark:border-gray-800"
            />
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">AI Generated Artwork</h1>

          <div className="bg-gray-50 border border-gray-700 p-4 rounded-xl mb-6 dark:bg-gray-800">
            <h2 className="text-sm uppercase text-gray-500 mb-2 font-bold dark:text-gray-300">
              Prompt Used
            </h2>
            <p className="text-lg font-medium">{currentImage.prompt}</p>
          </div>

          <button
            onClick={() => downloadImage(currentImage.src, Date.now())}
            className="flex cursor-pointer items-center justify-center gap-2 border border-gray-700 rounded-lg py-3 font-medium hover:bg-gray-100 duration-500 transition-colors dark:hover:bg-gray-800"
          >
            <Download size={18} />
            <span>Download Image</span>
          </button>
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center">
        <Link
          href={hasPrevious ? `/image/${Number(id) - 1}` : "#"}
          className={`flex items-center font-semibold gap-2 px-5 py-2 rounded-lg ${
            hasPrevious
              ? "hover:bg-gray-200 duration-500 dark:hover:bg-gray-800"
              : "opacity-50 cursor-not-allowed"
          }`}
          aria-disabled={!hasPrevious}
          tabIndex={hasPrevious ? 0 : -1}
        >
          <ArrowLeft size={20} />
          <span>Previous</span>
        </Link>

        <Link
          href={hasNext ? `/image/${Number(id) + 1}` : "#"}
          className={`flex items-center font-semibold gap-2 px-5 py-2 rounded-lg ${
            hasNext
              ? "hover:bg-gray-200 duration-500 dark:hover:bg-gray-800"
              : "opacity-50 cursor-not-allowed"
          }`}
          aria-disabled={!hasNext}
          tabIndex={hasNext ? 0 : -1}
        >
          <span>Next</span>
          <ArrowLeft size={20} className="rotate-180" />
        </Link>
      </div>
    </div>
  );
};

export default ShowcasedImagePage;
