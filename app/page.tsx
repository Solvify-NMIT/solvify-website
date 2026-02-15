"use client";

import AboutUs from "@/components/AboutUs";
import Instagram from "@/components/Instagram";
import Event from "@/components/Event";
import Domains from "@/components/Domains"; 
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
        setIntroComplete(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        setTimeout(() => {
            setStartDecipher(true);
            setContentVisible(true);
        }, 100);
    };

    useEffect(() => {
        if (!introComplete) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [introComplete]);

    return (
        <>
            {/* 1. ANIMATION LAYER */}
            {!introComplete && (
                <Loader onIntroComplete={handleIntroComplete} />
            )}

            {/* 2. CONTENT LAYER */}
            <div
                id="content-container"
                className={`relative z-10 transition-opacity duration-500 ${contentVisible ? "opacity-100" : "opacity-0"}`}
            >
                <Navbar />

                <div id="main-content-wrapper" className="relative z-10">
                    {/* Hero Section */}
                    <HomePage startDecipher={startDecipher} />

                    <div id="subsequent-sections">
                        <section id="about">
                            <AboutUs />
                        </section>
                        
                        {/* Events Section comes first */}
                        <section id="events">
                            <Event />
                        </section>

                        {/* Domains Section now follows Events */}
                        <section id="domain">
                            <Domains />
                        </section>

                        {/* Footer / Contact Section */}
                        <section id="contact">
                            <Footer />
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
