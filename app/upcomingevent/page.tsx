import React from "react";
import UpcomingEvent from "@/components/UpcomingEvent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Page() {
    return (
        <>
            <Navbar />
            <UpcomingEvent />
            <Footer />
        </>
    );
}