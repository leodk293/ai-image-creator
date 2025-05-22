import React from "react";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

export const metadata = {
  title: "Home | AI-IMAGE-CREATOR✨",
};

const layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className=" pt-[250px] px-4 md:pt-[100px] md:px-0">{children}</div>
      <Footer />
    </>
  );
};

export default layout;
