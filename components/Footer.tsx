"use client"
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  function handleSocial(social: string) {
    if (social === "instagram") {
      window.open("https://www.instagram.com/solvify_nmit/", "_blank");
    } else if (social === "linkedin") {
      window.open("https://www.linkedin.com/company/solvify-club-nmit/", "_blank");
    } else if (social === "github") {
      window.open("https://github.com/Solvify-NMIT", "_blank");
    }
  }

  return (
    <footer id="contact" className="relative w-full bg-[#050505] text-white pt-8 sm:pt-12 md:pt-16 pb-6 md:pb-8">
      {/* Top border with gold accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FFD700]/20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-8 lg:gap-16 mb-8 sm:mb-10 md:mb-12">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3 sm:gap-4 md:gap-5"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <img
                src="/Components for Website/solvify_logo.png"
                alt="solvify_logo"
                className="size-10 sm:size-12 md:size-14 lg:size-16 flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/64?text=S";
                }}
              />
              <div className="min-w-0">
                <h1 className="font-bebas text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.4)] tracking-wide mb-0.5 sm:mb-1">
                  SOLVIFY
                </h1>
                <p className="font-montserrat text-xs sm:text-sm md:text-base text-white/80 font-medium break-words">
                  Nitte Meenakshi Institute of Technology
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <p className="font-montserrat text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                Empowering developers through collaboration, learning, and innovation.
              </p>
              <p className="font-montserrat text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                Let's build a better tech future — together.
              </p>
            </div>

            <div className="flex gap-2 sm:gap-3 mt-1 sm:mt-2">
              {["instagram", "linkedin", "github"].map((social) => (
                <button
                  key={social}
                  onClick={() => handleSocial(social)}
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#050505] transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 shadow-[0_0_10px_rgba(255,215,0,0.2)]"
                  aria-label={social}
                >
                  <span className="font-bold text-[10px] uppercase">{social.slice(0, 2)}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-start mt-6 sm:mt-8 md:mt-0"
          >
            <h3 className="font-montserrat text-sm sm:text-base md:text-lg font-bold text-white mb-4 sm:mb-5 md:mb-6 relative pb-2">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-[3px] bg-[#FFD700]"></span>
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "#about", label: "About Us" },
                { href: "#events", label: "Events" },
                { href: "#domain", label: "Domain" },
                { href: "/team", label: "Team" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <li key={item.label} className="text-left">
                  <a 
                    href={item.href} 
                    className="font-montserrat text-xs sm:text-sm md:text-base text-white/70 hover:text-[#FFD700] transition-all duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start mt-6 sm:mt-8 md:mt-0"
          >
            <h3 className="font-montserrat text-sm sm:text-base md:text-lg font-bold text-white mb-4 sm:mb-5 md:mb-6 relative pb-2">
              Get In Touch
              <span className="absolute bottom-0 left-0 w-12 h-[3px] bg-[#FFD700]"></span>
            </h3>
            <div className="flex flex-col gap-0.5 sm:gap-1 text-left font-montserrat text-xs sm:text-sm md:text-base text-white/70">
              <p>Nitte Meenakshi Institute of Technology</p>
              <p>Yelahanka, Bengaluru, 560064</p>
              <a 
                href="mailto:solvify@nmit.ac.in" 
                className="mt-4 inline-block text-[#FFD700] hover:underline transition-all"
              >
                solvify@nmit.ac.in
              </a>
            </div>
          </motion.div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent mb-5"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
          <p className="font-montserrat text-[10px] sm:text-xs text-white/60">
            © 2026 <span className="text-[#FFD700] font-semibold">SOLVIFY</span> Club @NMIT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;