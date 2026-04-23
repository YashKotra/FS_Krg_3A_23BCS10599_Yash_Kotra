import React from "react";
import TopBar from "../Layout/TopBar.jsx";
import NavBar from "../Layout/NavBar.jsx";
const Header = () => {
  return (
    <header className="bg-black">
      {/* TopBar */}
      <TopBar />

      {/* NavBar */}
      <NavBar />
    </header>
  );
};

export default Header;
