import React, { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    setIsVisible(window.pageYOffset > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={handleOnClick}
      style={{ display: isVisible ? "block" : "none" }}
      className="fixed right-4 bottom-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-md p-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <FiArrowUp className="text-lg" />
      <span className="sr-only">Scroll Up</span>
    </button>
  );
};

export default ScrollTop;
