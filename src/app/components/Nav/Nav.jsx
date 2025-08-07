"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Logo from "../logo/Logo";
import Image from "next/image";
import { LogOut } from "lucide-react";
import ThemeToggle from "../Theme-toggle";

export default function Nav() {
  async function handleSignOut() {
    await signOut({
      callbackUrl: "/signin",
    });
  }

  const { status, data: session } = useSession();

  return (
    <nav className=" py-4 w-full z-50 bg-white shadow flex flex-wrap fixed justify-evenly dark:bg-black dark:text-white dark:border-b dark:border-b-gray-900 gap-10 md:gap-0">
      <Logo />

      <div className=" self-center flex flex-wrap justify-center gap-3">
        <ThemeToggle />
        <div className=" border border-gray-300 rounded-[50px] px-5 py-2 flex flex-row gap-1">
          {session?.user?.image ? (
            <Image
              width={30}
              height={30}
              src={session?.user?.image}
              alt={session?.user?.name}
              className=" self-center rounded-[50%]"
            />
          ) : (
            <p>Loading...</p>
          )}
          <p className=" self-center">{session?.user?.name}</p>
        </div>

        <button
          onClick={handleSignOut}
          className=" border border-transparent cursor-pointer rounded-[50px] px-5 py-2 bg-blue-900 text-white flex flex-row gap-2 hover:bg-blue-800"
        >
          <LogOut size={28} color="#ffffff" />
          <p className=" self-center">Logout </p>
        </button>
      </div>
    </nav>
  );
}
