"use client"
import Link from "next/link";
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
    <footer className="relative w-full bg-[#050505] text-white pt-8 sm:pt-12 md:pt-16 pb-6 md:pb-8">
      {/* Top border with gold accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FFD700]/20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-8 lg:gap-16 mb-8 sm:mb-10 md:mb-12">
          {/* Brand section with mission and social icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3 sm:gap-4 md:gap-5"
          >
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <img
                src="/Components for Website/solvify_logo.png"
                alt="solvify_logo"
                className="size-10 sm:size-12 md:size-14 lg:size-16 flex-shrink-0"
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

            {/* Mission Statement */}
            <div className="flex flex-col gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <p className="font-montserrat text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                Empowering developers through collaboration, learning, and innovation.
              </p>
              <p className="font-montserrat text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                Let's build a better tech future — together.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-2 sm:gap-3 mt-1 sm:mt-2">
              {[
                { name: "instagram", label: "Instagram" },
                { name: "linkedin", label: "LinkedIn" },
                { name: "github", label: "GitHub" },
              ].map((social) => (
                <button
                  key={social.name}
                  onClick={() => handleSocial(social.name)}
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#050505] transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-[0_0_15px_rgba(255,215,0,0.6)] active:scale-95"
                  aria-label={social.label}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5" fill="currentColor" viewBox="0 0 24 24">
                    {social.name === "instagram" && (
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                    )}
                    {social.name === "linkedin" && (
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.39v-1.2h-2.91v8.37h2.91v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.91M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    )}
                    {social.name === "github" && (
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    )}
                  </svg>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Quick Links section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-start mt-6 sm:mt-8 md:mt-0"
          >
            <h3 className="font-montserrat text-sm sm:text-base md:text-lg font-bold text-white mb-4 sm:mb-5 md:mb-6 relative pb-2 text-left">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-[3px] bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.4)]"></span>
            </h3>
            <ul className="flex flex-col gap-0.5 sm:gap-1">
              {[
                { href: "#about", label: "About Us" },
                { href: "#domain", label: "Domain" },
                { href: "#events", label: "Events" },
                { href: "/team", label: "Team" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href} className="text-left">
                  <Link
                    href={item.href}
                    className="font-montserrat text-xs sm:text-sm md:text-base text-white/70 hover:text-[#FFD700] hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] transition-all duration-300 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Get In Touch section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-start mt-6 sm:mt-8 md:mt-0"
          >
            <h3 className="font-montserrat text-sm sm:text-base md:text-lg font-bold text-white mb-4 sm:mb-5 md:mb-6 relative pb-2 text-left">
              Get In Touch
              <span className="absolute bottom-0 left-0 w-12 h-[3px] bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.4)]"></span>
            </h3>
            <div className="flex flex-col gap-0.5 sm:gap-1 text-left">
              <p className="font-montserrat text-xs sm:text-sm md:text-base text-white/70 break-words">
                Nitte Meenakshi Institute of Technology
              </p>
              <p className="font-montserrat text-xs sm:text-sm md:text-base text-white/70">
                Yelahanka, Bengaluru
              </p>
              <p className="font-montserrat text-xs sm:text-sm md:text-base text-white/70">
                Karnataka 560064
              </p>
            </div>
            {/* Email aligned with social media icons */}
            <Link
              href="mailto:solvify@nmit.ac.in"
              className="font-montserrat text-xs sm:text-sm md:text-base text-white/70 hover:text-[#FFD700] hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] transition-all duration-300 mt-2 break-all text-left"
            >
              solvify@nmit.ac.in
            </Link>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent mb-5 sm:mb-6 md:mb-8"></div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-2"
        >
          <p className="font-montserrat text-[10px] xs:text-xs sm:text-xs md:text-sm text-white/60 text-center sm:text-left">
            © 2026 <span className="text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.3)] font-semibold">SOLVIFY</span> Club @NMIT. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4 md:gap-6 text-[10px] xs:text-xs sm:text-xs md:text-sm">
            <Link
              href="#privacy"
              className="font-montserrat text-white/60 hover:text-[#FFD700] hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] transition-all duration-300 whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <Link
              href="#terms"
              className="font-montserrat text-white/60 hover:text-[#FFD700] hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] transition-all duration-300 whitespace-nowrap"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;