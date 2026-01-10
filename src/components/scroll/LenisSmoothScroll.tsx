"use client";
import ReactLenis, { useLenis } from "lenis/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function LenisSmoothScroll() {
    const lenis = useLenis();
    const pathname = usePathname();
    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, lenis]);

    useEffect(() => {
        if (!lenis) return;

        // Create scrollerProxy for better ScrollTrigger integration
        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                if (arguments.length && value !== undefined) {
                    lenis.scrollTo(value, { immediate: true });
                }
                return lenis.scroll;
            },
            scrollLeft(value) {
                if (arguments.length && value !== undefined) {
                    lenis.scrollTo(value, { immediate: true });
                }
                return lenis.scroll;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: document.body.style.transform ? "transform" : "fixed",
        });

        // Ensure scrollbar is visible and working
        document.body.style.overflow = "auto";

        // Update ScrollTrigger when Lenis scrolls
        lenis.on("scroll", ScrollTrigger.update);

        // Centralized refresh handler for all animations
        const handleRefresh = () => {
            // Small delay to ensure all components are ready
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        };

        // Handle window resize
        const handleResize = () => {
            handleRefresh();
        };

        // Listen for ScrollTrigger refresh events
        window.addEventListener("resize", handleResize);

        // --- Anchor Link Handling ---
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a");

            if (!link) return;

            const href = link.getAttribute("href");
            if (!href) return;

            // Check if it's an anchor link
            const isAnchor = href.startsWith("#");
            const isSamePageAnchor =
                href.includes("#") &&
                href.replace(/#.*$/, "") === window.location.pathname;

            if (isAnchor || isSamePageAnchor) {
                // Extract hash and validate it
                const hashPart = href.includes("#") ? href.split("#")[1] : "";

                // Skip if hash is empty or undefined
                if (!hashPart || hashPart.trim() === "") {
                    return;
                }

                const hash = "#" + hashPart;

                try {
                    const targetElement = document.querySelector(hash);

                    if (targetElement) {
                        e.preventDefault();
                        lenis.scrollTo(hash, { offset: -100 });
                    }
                } catch (error) {
                    console.warn(`Invalid selector: ${hash}`, error);
                }
            }
        };

        document.addEventListener("click", handleAnchorClick);

        // --- Initial Hash Scroll (Cross-page) ---
        if (window.location.hash) {
            const hash = window.location.hash;
            const hashPart = hash.substring(1); // Remove leading #

            // Only scroll if hash has valid content
            if (hashPart && hashPart.trim() !== "") {
                // Delay to ensure elements are rendered (esp. if data fetching involved)
                setTimeout(() => {
                    try {
                        lenis.scrollTo(hash, { offset: -100, immediate: false });
                    } catch (error) {
                        console.warn(`Failed to scroll to ${hash}`, error);
                    }
                }, 500);
            }
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            ScrollTrigger.removeEventListener("refresh", handleRefresh);
            document.removeEventListener("click", handleAnchorClick);
            // Revert scrollerProxy
            ScrollTrigger.scrollerProxy(document.body, {});
            // Reset body overflow
            document.body.style.overflow = "";
        };
    }, [lenis]);

    // return null for ios
    const isIOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        return null;
    }

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.07,
                duration: 1.5,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                orientation: "vertical",
                gestureOrientation: "vertical",
            }}
        />
    );
}
