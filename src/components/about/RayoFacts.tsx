"use client";

import React from "react";
import Image from "next/image";
import RevealText from "@/components/animation/RevealText";

// Using the updated JSON data
import factsData from "./rayo_facts.json";

export default function RayoFacts() {
    return (
        <div className="mxd-section padding-grid-pre-mtext overflow-hidden">
            <div className="mxd-container grid-container">
                {/* Block - Statistics Cards Start */}
                <div className="mxd-block">
                    <div className="mxd-stats-cards">
                        <div className="container-fluid px-0">
                            <div className="row gx-0">
                                {factsData.map((item, idx) => (
                                    <div className={item.colClass} key={idx}>
                                        <div className={item.cardClass}>

                                            {/* Scenario 1: Title Card (Small Box) - Image Only now */}
                                            {(item as { isTitleCard?: boolean }).isTitleCard && (
                                                <div className="text-center w-100 position-relative z-2">
                                                    {/* Title removed as requested, image provided via background/image prop */}
                                                </div>
                                            )}

                                            {/* Scenario 2: Text Card (Large Box) - Uses RevealText */}
                                            {(item as { isTextCard?: boolean }).isTextCard && (
                                                <div className="w-100 h-100 d-flex flex-column justify-content-center px-4 position-relative z-2">
                                                    {item.title && (
                                                        <h3 className="headline-2 t-bright mb-3">{item.title}</h3>
                                                    )}
                                                    {item.description && (
                                                        <RevealText
                                                            as="p"
                                                            className="t-bright t-large reveal-type"
                                                            style={{
                                                                fontSize: '1.6rem',
                                                                lineHeight: '1.6',
                                                                fontWeight: '400'
                                                            }}
                                                        >
                                                            {item.description}
                                                        </RevealText>
                                                    )}
                                                </div>
                                            )}

                                            {/* Image Rendering (if present) */}
                                            {item.image && (
                                                <div className={item.imageClass || "mxd-stats-cards__image"}>
                                                    <Image
                                                        alt={item.title || "Illustration"}
                                                        src={item.image}
                                                        width={item.imageWidth || 800}
                                                        height={item.imageHeight || 800}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Block - Statistics Cards End */}
            </div>
        </div>
    );
}
