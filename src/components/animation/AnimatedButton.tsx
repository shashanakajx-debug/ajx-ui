"use client";

import {
  ElementType,
  ComponentPropsWithoutRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import Link from "next/link";

type OwnProps = {
  /** Text that will be animated (MUST be a string) */
  text?: string;
  className?: string;
  /** Icons / extra JSX (not animated) */
  children?: React.ReactNode;
  href?: string;
  target?: string;
  position?: "previous" | "next";
};

type PolyProps<As extends ElementType> = OwnProps &
  Omit<ComponentPropsWithoutRef<As>, keyof OwnProps | "className"> & {
    as?: As;
  };

const splitToLetters = (s: string) =>
  Array.from(s).map((ch, i) => (
    <span key={i} className="btn-anim__letter">
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));

export default function AnimatedButton<As extends ElementType = "div">(
  props: PolyProps<As>
) {
  const {
    as,
    className = "",
    text,
    children,
    position = "next",
    href,
    target,
    ...rest
  } = props as PolyProps<ElementType>;

  // ----- Tag resolution -----
  let Tag: ElementType;
  let isInternalLink = false;

  if (href) {
    if (href.startsWith("/") && !target) {
      Tag = Link;
      isInternalLink = true;
    } else {
      Tag = "a";
    }
  } else {
    Tag = (as || "div") as ElementType;
  }

  const [play, setPlay] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ----- SAFE letter splitting -----
  const letters = useMemo(() => {
    if (typeof text !== "string") return null;
    return splitToLetters(text);
  }, [text]);

  const tagProps = {
    className: `btn-anim ${className}`,
    ...(text ? { "aria-label": text } : {}),
    ...(href && !isInternalLink ? { href, target } : {}),
    ...(isInternalLink ? { href } : {}),
    ...rest,
  };

  const animatedTagProps = {
    ...tagProps,
    className: `btn-anim ${className} ${play ? "play" : ""}`,
    onMouseEnter: () => setPlay(true),
    onMouseLeave: () => setPlay(false),
    onAnimationEnd: () => setPlay(false),
  };

  // ----- SSR-safe static render -----
  if (!isMounted) {
    return (
      <Tag {...tagProps}>
        {position === "previous" && children}
        {text && (
          <span className="btn-caption">
            <div className="btn-anim__block">{text}</div>
            <div className="btn-anim__block" aria-hidden="true">
              {text}
            </div>
          </span>
        )}
        {position === "next" && children}
      </Tag>
    );
  }

  return (
    <Tag {...animatedTagProps}>
      {position === "previous" && children}

      {text && letters && (
        <span className="btn-caption">
          <div className="btn-anim__block">{letters}</div>
          <div className="btn-anim__block" aria-hidden="true">
            {letters}
          </div>
        </span>
      )}

      {position === "next" && children}
    </Tag>
  );
}
