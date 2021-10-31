import React from "react";
import Footer from "../users/footer/Footer";
import Header from "../users/header/Header";

function UserLayout({ children }) {
  return (
    <>
      <Header />
      <body>{children}</body>
      <Footer />
    </>
  );
}

export default UserLayout;
