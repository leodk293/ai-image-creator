import React from "react";
import Logo from "../logo/Logo";
import Link from "next/link";
import Medias from "../Medias";

export default function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className=" mt-[150px] flex flex-col gap-5 bg-white border-t border-t-gray-200 shadow py-10 px-5 dark:bg-black dark:border-t-gray-900">
      <div className="flex flex-wrap justify-start gap-[80px] md:justify-evenly md:gap-0">
        <div className=" flex flex-col gap-3">
          <div className=" self-start">
            <Logo />
          </div>
          <p className=" text-gray-600 font-semibold dark:text-gray-300">
            Express your imaginations and creativity by generating some amazing
            images
          </p>
        </div>

        <div className=" flex flex-col gap-3">
          <h3 className=" text-xl font-bold">Support</h3>
          <ul className=" text-gray-600 font-semibold flex flex-col gap-1 dark:text-gray-300">
            <li>
              <Link href={"/home/contact"}>Contact Us</Link>
            </li>
            <li>
              <Link href={"/FAQ"}>FAQ</Link>
            </li>
            <li>
              <Link href={"/terms-of-use-and-privacy-policy"}>
                Terms of Use and Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className=" flex flex-col gap-3">
          <h3 className=" text-xl font-bold">Connect with us</h3>
          <Medias />
        </div>
      </div>

      <span className=" w-[95%] self-center h-[1px] bg-gray-400" />
      <p className=" font-bold italic text-center">
        © {currentYear} AI-IMAGE-CREATOR✨. All rights reserved.
      </p>
    </footer>
  );
}
