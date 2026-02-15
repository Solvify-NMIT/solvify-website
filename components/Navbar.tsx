"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type NavbarProps = {
  skipIntro?: boolean;
};

const Navbar = ({ skipIntro = false }: NavbarProps) => {
  const [isVisible, setIsVisible] = useState(skipIntro);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);

  // Sync with HomePage animation timeline: Intro finishes at 9400ms.
  useEffect(() => {
    if (skipIntro) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 9400); // Synchronized to 9400ms for instant appearance after jump
    return () => clearTimeout(timer);
  }, [skipIntro]);

  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  // Scroll detection to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If scrolling down and past 50px threshold, hide navbar
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsScrollingDown(true);
      }
      // If scrolling up, show navbar
      else {
        setIsScrollingDown(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT US", path: "#about" },
    { name: "EVENTS", path: "#events" },
  ];

  const rightLinks = [
    // { name: "PROJECTS", path: "#projects" },
    { name: "TEAM", path: "/team" },
    { name: "CONTACT US", path: "/contact" },
  ];

  // Combine all links for mobile sidebar
  const allLinks = [...leftLinks, ...rightLinks];

  // Close sidebar when a link is clicked (mobile only)
  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  if (!isVisible) return null;

  // Animation variants for the link containers
  const linkContainerVariants = {
    closed: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] }
    },
    open: {
      width: "auto",
      opacity: 1,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-4 sm:top-8 left-0 right-0 z-50 flex justify-center items-center pointer-events-none transition-transform duration-300 ${
          // Hide when scrolling down, show when updated AND visible
          !isVisible || isScrollingDown ? "-translate-y-[200%]" : "translate-y-0"
          }`}
      >
        {/* Container */}
        <motion.div
          layout
          className="pointer-events-auto bg-black/60 backdrop-blur-md border border-white/10 rounded-full shadow-2xl overflow-hidden"
          initial={{ borderRadius: 50 }}
        >
          <div className="flex items-center px-1 py-1 sm:px-2 sm:py-2">

            {/* LEFT LINKS CONTAINER - Hidden on mobile */}
            <motion.div
              variants={linkContainerVariants}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              className="overflow-hidden flex items-center hidden md:flex"
            >
              {/* Responsive spacing for mobile (sm:gap-8, sm:px-8) */}
              <div className="flex items-center gap-3 px-3 sm:gap-6 sm:px-6 whitespace-nowrap">
                {leftLinks.map((item) => (
                  <NavLink key={item.name} item={item} />
                ))}
              </div>
            </motion.div>

            {/* CENTER TOGGLE BUTTON (LOGO) - Responsive size */}
            <motion.button
              layout
              layoutId="solvify-logo-center" // THIS RECEIVES THE FLYING LOGO
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                    relative z-50 flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center 
                    rounded-full transition-all duration-300
                    ${isOpen ? 'bg-white/10' : 'bg-black/40'}
                    border-2 border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.3)]
                    hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]
                    hidden md:flex
                `}
            >
              {/* Responsive logo image size */}
              <img
                src="/solvify-logo.png"
                alt="Solvify"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
            </motion.button>

            {/* RIGHT LINKS CONTAINER - Hidden on mobile */}
            <motion.div
              variants={linkContainerVariants}
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              className="overflow-hidden flex items-center hidden md:flex"
            >
              {/* Responsive spacing for mobile (sm:gap-8, sm:px-8) */}
              <div className="flex items-center gap-3 px-3 sm:gap-6 sm:px-6 whitespace-nowrap">
                {rightLinks.map((item) => (
                  <NavLink key={item.name} item={item} />
                ))}
              </div>
            </motion.div>

            {/* MOBILE LOGO BUTTON - Visible only on mobile */}
            <motion.button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                md:hidden flex-shrink-0 w-14 h-14 flex items-center justify-center 
                rounded-full transition-all duration-300
                ${isSidebarOpen ? 'bg-white/10' : 'bg-black/40'}
                border-2 border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.3)]
                hover:shadow-[0_0_25px_rgba(255,215,0,0.6)]
                relative z-50
              `}
              aria-label="Toggle menu"
            >
              {/* Logo image */}
              <img
                src="/solvify-logo.png"
                alt="Solvify"
                className="w-8 h-8 object-contain"
              />
            </motion.button>

          </div>
        </motion.div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-md border-l border-white/10 shadow-2xl z-[70] md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <img
                    src="/solvify-logo.png"
                    alt="Solvify"
                    className="w-12 h-12 object-contain"
                  />
                  <motion.button
                    onClick={() => setIsSidebarOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Sidebar Navigation Links */}
                <nav className="flex-1 p-6">
                  <ul className="flex flex-col gap-4">
                    {allLinks.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          item={item}
                          onClose={handleLinkClick}
                          isMobile={true}
                        />
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Sub-component for links
const NavLink = ({
  item,
  onClose,
  isMobile = false
}: {
  item: { name: string; path: string };
  onClose?: () => void;
  isMobile?: boolean;
}) => {

  // Prevent navigation for development stage
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only prevent default if the link is an internal fragment link
    if (item.path.startsWith('#') && item.path !== '#') {
      e.preventDefault();
      // You can add smooth scrolling logic here later if needed
      const element = document.getElementById(item.path.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Close sidebar on mobile when link is clicked
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <Link
      href={item.path}
      onClick={handleClick} // Use the new click handler
      className={`
        relative font-bold tracking-widest text-white/80 
        font-montserrat transition-all duration-300
        hover:text-[#FFD700] hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]
        ${isMobile
          ? 'text-lg py-3 px-4 block rounded-lg hover:bg-white/5 border-l-4 border-transparent hover:border-[#FFD700]'
          : 'text-sm sm:text-base'
        }
      `}
    >
      {item.name}
    </Link>
  );
};

export default Navbar;