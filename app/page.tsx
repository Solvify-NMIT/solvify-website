"use client";

import AboutUs from "@/components/AboutUs";
import Instagram from "@/components/Instagram";
import Event from "@/components/Event";
//import TeamHome from "@/components/TeamHome";
import ContactUsHome from "@/components/ContactUsHome";
import HomePage from "@/components/HomePage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";

export default function Home() {
    const [introComplete, setIntroComplete] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);
    const [startDecipher, setStartDecipher] = useState(false);

    const handleIntroComplete = () => {
        // Step 1: Mark intro as finished
        setIntroComplete(true);

        // Step 2: Reset scroll position to ensure user starts at the top of the content
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

        // Step 3: Trigger the decipher animation on the landing page content
        setTimeout(() => {
            setStartDecipher(true);
            setContentVisible(true);
        }, 100);
    };

    // Prevent scrolling while the intro animation is active
    useEffect(() => {
        if (!introComplete) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [introComplete]);

    return (
        <>
            {/* 1. ANIMATION LAYER: Handles the drawing, terminal, and flying logo */}
            {!introComplete && (
                <Loader onIntroComplete={handleIntroComplete} />
            )}

            {/* 2. CONTENT LAYER: Visible only after the intro is complete */}
            <div
                id="content-container"
                className={`relative z-10 transition-opacity duration-500 ${contentVisible ? "opacity-100" : "opacity-0"}`}
            >
                <Navbar />

                <div id="main-content-wrapper" className="relative z-10">

                    {/* Hero Section (Page 1): Now contains static content and deciphering text */}
                    <HomePage startDecipher={startDecipher} />

                    {/* Scrollable Content: Sections that flow below the fold */}
                    <div id="subsequent-sections">
                        <section id="about">
                            <AboutUs />
                        </section>
                        <section id="events">
                            <Event />
                        </section>
                        {/* <TeamHome /> */}
                        {/* <Instagram/> */}
                        {/* <ContactUsHome/> */}
                        <section id="contact">
                            <Footer />
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
