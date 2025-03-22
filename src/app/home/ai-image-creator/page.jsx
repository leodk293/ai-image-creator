"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Images, Download } from "lucide-react";
import models from "@/app/models";
import { PencilRuler, X, Sparkles } from "lucide-react";
import { nanoid } from "nanoid";
import HistoryBtn from "@/app/components/HistoryBtn";
import examplePrompts from "@/app/prompt";
import { Typewriter } from "react-simple-typewriter";

export default function Page() {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user?.id;

  const [model, setModel] = useState({
    name: "",
    url: "",
  });
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]); // Array to store multiple images
  const [imageCount, setImageCount] = useState(1); // Default to 1 image

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    if (models.length > 0) {
      setModelsLoaded(true);
    }
  }, []);

  const isFormValid = prompt.trim().length > 0 && model.url && isAuthenticated;

  function generateRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * examplePrompts.length);
    setPrompt(examplePrompts[randomIndex]);
  }

  const getGridClasses = () => {
    switch (imageCount) {
      case 1:
        return "grid-cols-1 max-w-2xl mx-auto";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-2 md:grid-cols-4";
      default:
        return "grid-cols-1";
    }
  };

  const getImageClasses = () => {
    switch (imageCount) {
      case 1:
        return "w-full h-96";
      case 2:
        return "w-full h-80";
      case 3:
        return "w-full h-64";
      case 4:
        return "w-full h-56";
      default:
        return "w-full h-64";
    }
  };

  async function generateImage(data, modelUrl) {
    try {
      // Create an array of promises for generating multiple images
      const imagePromises = [];

      for (let i = 0; i < imageCount; i++) {
        imagePromises.push(
          fetch(`https://api-inference.huggingface.co/models/${modelUrl}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
              "x-use-cache": "false",
              "x-wait-for-model": "false",
            },
            method: "POST",
            body: JSON.stringify({
              inputs: data,
            }),
          })
        );
      }

      // Wait for all image generation requests to complete
      const responses = await Promise.all(imagePromises);

      // Process each response
      const imageUrls = [];
      for (const response of responses) {
        if (!response.ok) {
          throw new Error(`Error generating image: ${response.statusText}`);
        }
        const result = await response.blob();
        const imageUrl = URL.createObjectURL(result);
        imageUrls.push(imageUrl);
      }

      console.log(`Generated ${imageUrls.length} images successfully`);

      // Update the state with all generated images
      setGeneratedImages(imageUrls);
      setError(null);
    } catch (error) {
      console.error("Error generating images:", error);
      setError("Failed to generate images. Please try again.");
      setGeneratedImages([]);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isAuthenticated) {
      setError("Please sign in to generate images");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const promptData = {
        content: prompt,
        model: model.name,
        userId: session.user.id,
      };

      const saveResponse = await fetch(`/api/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptData),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save prompt history");
      }

      generateImage(prompt, model.url);

      console.log("Successfully submitted prompt:", {
        prompt,
        model,
        imageCount,
      });
    } catch (error) {
      console.error("Error in form submission:", error);
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  function clearPrompt() {
    setPrompt("");
  }

  const downloadImage = (imageUrl, timestamp) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `generated-image-${timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <HistoryBtn />
      <main className="flex flex-col gap-4 mx-auto max-w-4xl">
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            <Typewriter
              words={[`Welcome ${session?.user?.name}`]}
              loop={1}
              cursor
              cursorStyle="/"
              typeSpeed={55}
            />
          </h1>
          <p className="text-gray-600 mt-2">
            What would you like to create today?
          </p>
        </div>

        <form
          className="flex flex-col gap-4 border border-transparent shadow p-3 rounded-[5px] bg-white w-full"
          onSubmit={handleSubmit}
        >
          <div className="border border-transparent p-2 rounded-[5px] bg-[#653bfc] flex flex-row gap-5">
            <div className="border border-transparent p-2 rounded-[5px] bg-white">
              <PencilRuler size={32} color="#653bfc" strokeWidth={1.75} />
            </div>
            <h1 className="text-gray-50 text-2xl font-bold self-center">
              AI-IMAGE-CREATOR
            </h1>
          </div>

          {!isAuthenticated && (
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg">
              Please sign in to generate images
            </div>
          )}

          <div className="relative">
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              required
              placeholder="Describe the image you want to create... (e.g., 'A magical forest with glowing mushrooms, cinematic lighting')"
              className="w-full h-32 px-4 py-3 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 focus:outline-none transition duration-200 text-lg resize-none"
            />
            <div className="absolute bottom-3 right-3 flex space-x-2">
              <button
                type="button"
                className="text-gray-400 cursor-pointer hover:text-violet-600 transition-colors"
                title="Clear input"
                onClick={clearPrompt}
              >
                <X size={18} />
              </button>
              <button
                onClick={generateRandomPrompt}
                type="button"
                className="text-gray-400 cursor-pointer hover:text-violet-600 transition-colors"
                title="Add inspiration"
              >
                <Sparkles size={18} />
              </button>
            </div>
          </div>

          <div className="flex-grow flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <select
              disabled={!modelsLoaded}
              value={model.url}
              onChange={(event) => {
                const selectedModel = models.find(
                  (m) => m.api_url === event.target.value
                );
                if (selectedModel) {
                  setModel({
                    name: selectedModel.name,
                    url: selectedModel.api_url,
                  });
                }
              }}
              className="flex-grow cursor-pointer px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:border-violet-400 focus:outline-none transition"
            >
              {!modelsLoaded ? (
                <option>Loading models...</option>
              ) : (
                <>
                  <option value="">Select AI Model</option>
                  {models.map((modelOption) => (
                    <option key={nanoid(10)} value={modelOption.api_url}>
                      {modelOption.name}
                    </option>
                  ))}
                </>
              )}
            </select>
            <select
              value={imageCount}
              onChange={(event) => setImageCount(Number(event.target.value))}
              className="flex-grow cursor-pointer px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:border-violet-400 focus:outline-none transition"
            >
              <option value="1">1 Image</option>
              <option value="2">2 Images</option>
              <option value="3">3 Images</option>
              <option value="4">4 Images</option>
            </select>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`${
                !isFormValid || isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#653bfc] cursor-pointer hover:bg-[#5933e8]"
              } px-5 border border-transparent rounded-[5px] text-white font-semibold flex items-center justify-center transition-colors`}
            >
              {isSubmitting ? "Generating..." : "Generate"}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </form>
        <p className=" text-gray-400 italic text-[14px]">
          No that an error can be occurred generating images
        </p>

        {isSubmitting ? (
          <div className="flex items-center justify-center h-[16rem] border border-gray-200 bg-gray-50 rounded-[5px]">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#653bfc]"></div>
              <p className="font-semibold text-gray-800">
                Generating your{" "}
                {imageCount > 1 ? `${imageCount} images` : "image"}...
              </p>
            </div>
          </div>
        ) : generatedImages.length > 0 ? (
          <div className={`grid ${getGridClasses()} gap-4 w-full`}>
            {generatedImages.map((imageUrl, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 bg-gray-50 rounded-lg p-3 overflow-hidden"
              >
                <div className="relative group">
                  <img
                    src={imageUrl}
                    alt={`Generated image ${index + 1}`}
                    className={`${getImageClasses()} object-cover rounded-lg shadow-sm`}
                  />
                  <div className="absolute bottom-2 right-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => downloadImage(imageUrl, Date.now())}
                      className="p-2 rounded-full bg-white hover:bg-purple-600 hover:text-white shadow-md transition-colors duration-300"
                      title="Download image"
                    >
                      <Download size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-[17px] text-gray-700 font-semibold line-clamp-2 h-10 overflow-hidden">
                  {prompt || "Generated image"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[16rem] border border-gray-200 bg-gray-50 rounded-[5px]">
            <div className="flex flex-col items-center gap-3">
              <Images size={40} color="#653bfc" strokeWidth={1.5} />
              <p className="font-semibold text-gray-800">
                No images generated yet...
              </p>
              <p className="text-gray-600 text-sm max-w-md text-center">
                Select a model and enter a prompt to create your AI-generated
                {imageCount > 1 ? ` ${imageCount} images` : " image"}.
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
