import React from "react";
import Link from "next/link";

import { Original_Surfer } from "next/font/google";

const originalSurfer = Original_Surfer({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Logo() {
  return (
    <Link className=" self-center" href={"/home"}>
      <div className=" flex flex-row gap-2">
        <p
          className={` ${originalSurfer.className} text-2xl text-black font-bold self-center dark:text-white`}
        >
          AI-IMAGE-CREATOR✨
        </p>
      </div>
    </Link>
  );
}
