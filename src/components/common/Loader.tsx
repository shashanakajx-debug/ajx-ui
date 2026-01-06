"use client";

import React, { useEffect, useState } from "react";

export default function Loader() {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoaded(true), 200); // Short delay before fading out
                    return 100;
                }
                // Random increment for realistic effect
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`loader ${isLoaded ? "loaded" : ""}`}>
            <div className="loader__wrapper">
                <div className="loader__content">
                    <div className="loader__count">
                        <span>{Math.min(progress, 100)}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
