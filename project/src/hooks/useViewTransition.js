'use client';

import gsap from "@/libs/gsap";
import { useRouter } from "next/navigation"; // ✅ App Router — NOT "next/router"
import { useCallback } from "react";

const STRIP_COUNT = 12;

// ─── DOM helpers ──────────────────────────────────────────────────────────────

const createStrips = () => {
  // Guard: don't double-mount if a transition is already running
  const existing = document.getElementById("page-transition-overlay");
  if (existing) return existing;

  const overlay = document.createElement("div");
  overlay.id = "page-transition-overlay";

  // ✅ cssText values are separated by semicolons, not commas
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    display: flex;
  `;

  for (let i = 0; i < STRIP_COUNT; i++) {
    const strip = document.createElement("div");
    strip.style.cssText = `
      flex: 1;
      height: 100%;
      background-color: #010101;
      transform: scaleY(0);
      transform-origin: bottom;
    `; // ✅ fixed typo "transfrom" → "transform"
    overlay.appendChild(strip);
  }

  document.body.appendChild(overlay);
  return overlay;
};

// ✅ Fixed syntax: was `const removeOverlay(){` — not valid JS
const removeOverlay = () => {
  const el = document.getElementById("page-transition-overlay");
  if (el) el.remove(); // ✅ was `el.remove` (not called) — added ()
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

const useViewTransition = () => {
  // ✅ Removed the stray removeOverlay() call that was at hook top-level,
  //    wiping the overlay on every render before the animation could finish.

  const router = useRouter();

  const navigateTo = useCallback(
    (href) => {
      const overlay = createStrips();
      const strips = Array.from(overlay.children);

      // Phase 1 — strips wipe IN (bottom → top)
      gsap.to(strips, {
        scaleY: 1,
        duration: 0.58,
        ease: "power3.inOut",
        stagger:{
            each : 0.06,
            from : 'random'
        },
        onComplete: () => {
          // Navigate once the screen is fully covered
          router.push(href);

          // Phase 2 — strips wipe OUT (top → bottom) after route change
          gsap.to(strips, {
            scaleY: 0,
            duration: 0.7,
            ease: "power3.inOut",
            delay: 0.12,
            stagger:{
                each : 0.06,
                from : 'random'
            },
            transformOrigin: "top",
            onComplete: removeOverlay,
          });
        },
      });
    },
    [router]
  );

  // ✅ return was incorrectly placed inside useCallback — moved to hook body
  return { navigateTo };
};

export default useViewTransition;
