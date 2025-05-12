"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/app/components/loader/Loader";
import { Trash2 } from "lucide-react";
import { History } from "lucide-react";

export default function HistoryPage() {
  const { data: session } = useSession();
  const [promptHistory, setPromptHistory] = useState({
    error: false,
    data: [],
    loading: false,
  });
  async function fetchHistoryPrompt() {
    setPromptHistory({ error: false, data: [], loading: true });
    try {
      const response = await fetch(`/api/prompt?userId=${session?.user?.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPromptHistory({
        error: false,
        data: data,
        loading: false,
      });
    } catch (error) {
      setPromptHistory({ error: true, data: [], loading: false });
    }
  }

  async function handleDelete(id, userId) {
    try {
      const response = await fetch(`/api/prompt?id=${id}&userId=${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchHistoryPrompt();
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchHistoryPrompt();
  }, [session?.user?.id]);
  return (
    <div className="flex mt-[60px] flex-col gap-5 mx-auto max-w-4xl px-3 md:px-0">
      <div className=" flex flex-col gap-2">
        <h1 className=" flex flex-row gap-2 font-bold text-2xl md:text-3xl">
          <History
            className=" self-center text-black dark:text-gray-200 "
            size={30}
            strokeWidth={2.5}
          />
          <span className=" self-center dark:text-gray-200">Your Prompt History</span>
        </h1>
        <span className=" w-full h-[2px] bg-black dark:bg-gray-200" />
      </div>
      {promptHistory.loading ? (
        <Loader />
      ) : promptHistory.error ? (
        <p className="text-xl font-semibold text-red-800">
          Something went wrong
        </p>
      ) : promptHistory.data.length > 0 ? (
        <ul className=" flex flex-col gap-4">
          {promptHistory.data.map((prompt) => (
            <li
              key={prompt._id}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-violet-400 dark:bg-transparent dark:border-gray-400 hover:bg-violet-50 dark:hover:bg-gray-800 cursor-pointer transition-all group"
            >
              <div className="flex justify-between items-start">
                <p className=" text-[17px] text-gray-700 break-words dark:text-gray-300">
                  {prompt.content}
                </p>
                <button
                  onClick={() => handleDelete(prompt._id, session?.user?.id)}
                  className="opacity-0 cursor-pointer group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="mt-2 font-semibold flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Model : {prompt.model}</span>
                <span>
                  {new Date(
                    prompt.createdAt || Date.now()
                  ).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className=" mt-10 text-center italic text-xl font-bold text-gray-500 md:h-[10rem]">
          No prompts found.
        </p>
      )}
    </div>
  );
}
