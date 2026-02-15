"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import events from "@/lib/data/events.json";

const Event = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dots: false,
    beforeChange: (_: any, next: any) => {
      setSlideIndex(next);
    },
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-[#050505] text-white py-12 md:py-20">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 md:mb-[5vh] z-10 w-full"
      >
        <h1 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-wide text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] text-center px-4">
          Events
        </h1>
        <div className="mx-auto mt-4 h-[3px] w-[100px] bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.4)]"></div>
      </motion.div>

      {/* Carousel Container */}
      <div className="flex flex-col w-[90%] lg:w-[85%] max-w-[1400px] mx-auto">
        {/* Slider Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-full mx-auto mt-[5vh] p-2 pt-2 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#FFD700] rounded-lg shadow-[0_0_30px_rgba(255,215,0,0.3)]"
        >
          <Slider ref={sliderRef} {...settings}>
            {events.map((event, i) => {
              return event.photos.map((pic, j) => {
                return (
                  <div
                    key={`event${i}pic${j}`}
                    className=""
                  >
                    <div className="relative w-full aspect-square overflow-hidden shadow-[0_0_15px_rgba(255,215,0,0.2)] transition-all duration-300">
                      <Image
                        src={pic.img}
                        alt={`${event.name} - Photo ${j + 1}`}
                        fill
                        sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              });
            })}
          </Slider>
        </motion.div>

        {/* Event Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full mx-auto mt-8 md:mt-12 text-white font-montserrat"
        >
          {/* Scrollable Container */}
          <div className="overflow-x-auto w-full pb-4 scrollbar-hide">
            {/* Inner Expanding Container */}
            <div className="relative min-w-full w-max flex flex-row justify-center items-start gap-4 md:gap-8 px-4 md:px-0">
              {/* Connector Line */}
              <div className="absolute top-[12px] md:top-[16px] left-0 w-full h-[2px] bg-[#FFD700]/50" />

              {events.map((event, i) => {
                const photosPerEvent = event.photos.length;
                const startIndex = events.slice(0, i).reduce((acc, e) => acc + e.photos.length, 0);
                const isActive = slideIndex >= startIndex && slideIndex < startIndex + photosPerEvent;
                return (
                  <div
                    key={`eventname${i}`}
                    onClick={() => sliderRef.current?.slickGoTo(startIndex)}
                    className="flex flex-col items-center cursor-pointer group transition-all duration-300 relative z-10 w-24 md:w-32"
                  >
                    <div
                      className={`${isActive ? "w-6 md:w-8 scale-110" : "w-3 md:w-4"} transition-all h-6 md:h-8 rounded-md bg-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.6)]`}
                    ></div>
                    <p className={`mt-3 text-center text-xs sm:text-sm md:text-base font-medium transition-colors duration-300 ${isActive ? "text-[#FFD700]" : "text-white/70"} drop-shadow-[0_0_8px_rgba(255,215,0,0.3)] break-words w-full`}>
                      {event.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Event;
