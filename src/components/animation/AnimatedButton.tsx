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
  text?: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  target?: string;
  tooltip?: string;
};

type PolyProps<As extends ElementType> = OwnProps &
  Omit<ComponentPropsWithoutRef<As>, keyof OwnProps | "className"> & {
    as?: As;
  };

const splitToLetters = (s?: string) =>
  (s ? [...s] : []).map((ch, i) => (
    <span key={i} className="btn-anim__letter">
      {ch.trim() === "" ? "\u00A0" : ch}
    </span>
  ));

export default function AnimatedButton<As extends ElementType = "div">(
  props: PolyProps<As> & { position?: "previous" | "next" }
) {
  const {
    as,
    className = "",
    text,
    children,
    position = "next",
    href,
    target,
    tooltip,
    ...rest
  } = props as PolyProps<ElementType> & { tooltip?: string };

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
  const letters = useMemo(() => splitToLetters(text), [text]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isCTA = !!href;

  const userTooltip = tooltip !== undefined ? tooltip : (text ? text.split(' ')[0] : "");

  const tagProps = {
    className: `btn-anim ${className}`,
    "aria-label": text,
    ...(isCTA ? { "data-magnetic": true } : {}),
    ...(isCTA && userTooltip ? { "data-tooltip": userTooltip } : {}),
    ...(href && !isInternalLink ? { href, target } : {}),
    ...(isInternalLink ? { href } : {}),
    ...rest,
  };

  const animatedTagProps = {
    ...tagProps,
    className: `btn-anim ${className} ${play ? "play" : ""}`,
    onMouseEnter: () => setPlay(true),
    onAnimationEnd: () => setPlay(false),
    onMouseLeave: () => setPlay(false),
  };

  if (!isMounted) {
    return (
      <Tag {...tagProps}>
        {position === "previous" ? <> {children}</> : null}
        <span className="btn-caption">
          <div className="btn-anim__block">{text}</div>
          <div className="btn-anim__block" aria-hidden="true">
            {text}
          </div>
        </span>
        {position === "next" ? <> {children}</> : null}
      </Tag>
    );
  }

  return (
    <>
      <Tag {...animatedTagProps}>
        {position === "previous" ? <> {children}</> : null}
        <span className="btn-caption">
          <div className="btn-anim__block">{letters}</div>
          <div className="btn-anim__block" aria-hidden="true">
            {letters}
          </div>
        </span>

        {position === "next" ? <> {children}</> : null}
      </Tag>
    </>
  );
}
