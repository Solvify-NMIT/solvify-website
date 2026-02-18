"use client";

import AboutUs from "@/components/AboutUs";
import Domains from "@/components/Domain";
import Event from "@/components/Event";

import HomePage from "@/components/HomePage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import ByteBattlePopup from "@/components/ByteBattlePopup";
import { useState, useEffect } from "react";

export default function Home() {
    const [introComplete, setIntroComplete] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);
    const [startDecipher, setStartDecipher] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        // Check if intro has already been shown in this session
        const hasSeenIntro = sessionStorage.getItem("introShown");
        if (hasSeenIntro) {
            setIntroComplete(true);
            setContentVisible(true);
            setStartDecipher(true);
        }
    }, []);

    const handleIntroComplete = () => {
        // Step 1: Mark intro as finished
        setIntroComplete(true);
        sessionStorage.setItem("introShown", "true");

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
                <div className={isPopupVisible ? "hidden" : "block"}>
                    <Navbar />
                </div>

                <div id="main-content-wrapper" className="relative z-10">

                    {/* Hero Section (Page 1): Now contains static content and deciphering text */}
                    <HomePage startDecipher={startDecipher} />

                    <ByteBattlePopup onVisibilityChange={setIsPopupVisible} />

                    {/* Scrollable Content: Sections that flow below the fold */}
                    <div id="subsequent-sections">
                        <section id="about">
                            <AboutUs />
                        </section>
                        <section id="events">
                            <Event />
                        </section>
                        <section id="domains">
                            <Domains />
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
