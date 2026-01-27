"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [tooltip, setTooltip] = useState("");
    const [isHovering, setIsHovering] = useState(false);
    const [isDark, setIsDark] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const cursorX = useSpring(mouseX, {
        damping: 30,
        stiffness: 200,
        mass: 0.5,
    });
    const cursorY = useSpring(mouseY, {
        damping: 30,
        stiffness: 200,
        mass: 0.5,
    });



    useEffect(() => {
        const updateTheme = () => {
            const colorScheme = document.documentElement.getAttribute("color-scheme");
            setIsDark(colorScheme === "dark");
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["color-scheme"],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);

            const { clientX, clientY } = e;
            const magneticElements = document.querySelectorAll("[data-magnetic]");
            let attracted = false;
            let finalX = clientX;
            let finalY = clientY;
            let currentTooltip = "";

            magneticElements.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = centerX - clientX;
                const deltaY = centerY - clientY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                const attractionRadius = Math.min(Math.max(rect.width, rect.height) * 0.8, 100);

                const repulsionRadius = 30;

                if (distance < attractionRadius) {
                    const tooltipText = element.getAttribute("data-tooltip");

                    if (tooltipText) {
                        attracted = true;
                        currentTooltip = tooltipText;
                    }

                    if (distance < repulsionRadius) {
                        const repulsionForce =
                            (repulsionRadius - distance) / repulsionRadius;
                        finalX = clientX - (deltaX / distance) * repulsionForce * 20;
                        finalY = clientY - (deltaY / distance) * repulsionForce * 20;
                    } else {
                        const attractionForce = 0.15;
                        finalX = clientX + deltaX * attractionForce;
                        finalY = clientY + deltaY * attractionForce;
                    }
                }
            });

            setIsHovering(attracted);
            setTooltip(currentTooltip);

            mouseX.set(finalX);
            mouseY.set(finalY);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
            setIsHovering(false);
            setTooltip("");
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
            <div className="pointer-events-none fixed inset-0 z-[9999]">
                {/* Main cursor - Inner dot */}
                <motion.div
                    className="fixed top-0 left-0 rounded-full"
                    style={{
                        x: cursorX,
                        y: cursorY,
                        translateX: "-50%",
                        translateY: "-50%",
                        backgroundColor: isDark ? "#FFFFFF" : "#000000",
                    }}
                    animate={{
                        width: isHovering ? 14 : 10,
                        height: isHovering ? 14 : 10,
                        scale: isHovering ? 1.3 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 28,
                    }}
                />

                {/* Border ring */}
                <motion.div
                    ref={cursorRef}
                    className="fixed top-0 left-0 rounded-full flex items-center justify-center"
                    style={{
                        x: cursorX,
                        y: cursorY,
                        translateX: "-50%",
                        translateY: "-50%",
                        border: isDark ? "2.5px solid #FFFFFF" : "2.5px solid #000000",
                    }}
                    animate={{
                        width: isHovering ? 40 : 30,
                        height: isHovering ? 40 : 30,
                        borderWidth: isHovering ? 3 : 2.5,
                        borderColor: isHovering
                            ? isDark
                                ? "rgba(255, 255, 255, 0.9)"
                                : "rgba(0, 0, 0, 0.9)"
                            : isDark
                                ? "rgba(255, 255, 255, 0.5)"
                                : "rgba(0, 0, 0, 0.5)",
                        backgroundColor: isHovering
                            ? isDark
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.1)"
                            : "transparent",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                    }}
                >
                    {/* Tooltip */}
                    {tooltip && (
                        <motion.div
                            className="absolute whitespace-nowrap"
                            style={{
                                top: "-40px",
                                left: "-30%",
                                transform: "translateX(-50%)",
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div
                                className="text-xs font-semibold px-4 py-2 rounded-lg relative"
                                style={{
                                    color: isDark ? "#000000" : "#FFFFFF",
                                    backgroundColor: isDark ? "#FFFFFF" : "#000000",
                                    border: isDark
                                        ? "1px solid rgba(0, 0, 0, 0.1)"
                                        : "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                            >
                                {tooltip}
                                {/* Tooltip arrow */}
                                <div
                                    className="absolute left-1/2 -translate-x-1/2"
                                    style={{
                                        bottom: "-6px",
                                        width: 0,
                                        height: 0,
                                        borderLeft: "6px solid transparent",
                                        borderRight: "6px solid transparent",
                                        borderTop: `6px solid ${isDark ? "#FFFFFF" : "#000000"}`,
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </>
    );
}