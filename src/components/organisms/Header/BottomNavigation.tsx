"use client";

import React from "react";
import { Menu, Info, PhoneOutgoing } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ColorSwitcher from "./ColorSwitcher";

export default function BottomNavigation() {
  const toggleChat = () => {
    const event = new CustomEvent("AJX_TOGGLE_CHAT");
    window.dispatchEvent(event);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] bottom-menu pb-safe lg:hidden md:hidden">
      <div className="flex justify-between items-center px-2 py-3">
        <Link
          href="/our-services"
          className="flex flex-col items-center gap-1 flex-1 min-w-0"
        >
          <Menu className="w-10 h-10" />
        </Link>

        <Link
          href="/about-us"
          className="flex flex-col items-center gap-1 flex-1 min-w-0"
        >
          <Image
            src="/tech/icons8-about-us.svg"
            alt="About Us"
            width={64}
            height={64}
            className="w-18 h-18"
          />
        </Link>

        <button
          onClick={toggleChat}
          className="flex flex-col items-center gap-1 flex-1 min-w-0"
        >
          <Image
            src="/tech/icons8-chat-bot-96.png"
            alt="Chat Assistant"
            width={64}
            height={64}
            className="w-18 h-18"
          />
        </button>

        <Link
          href="/contact"
          className="flex flex-col items-center gap-1 flex-1 min-w-0"
        >
          <PhoneOutgoing className="w-10 h-10" />
        </Link>

        <ColorSwitcher variant="bottomNav" />
      </div>
    </div>
  );
}
