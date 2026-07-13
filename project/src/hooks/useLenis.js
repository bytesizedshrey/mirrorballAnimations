'use client';

import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ─── Register GSAP plugins (client-only) ─────────────────────────────────────
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Premium Easing Library ───────────────────────────────────────────────────
// Each curve is tuned to feel physical and weighted — not digital/linear.
const EASING_PRESETS = {
  /**
   * expo: Fast lift-off, long lingering tail.
   * Great for hero sections where you feel the page "breathe".
   */
  expo:    (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),

  /**
   * cinema: Slow, deliberate cubic ease-in-out.
   * Feels like a camera dolly — controlled, immersive, weighty.
   * ★ Best for slow, storytelling scroll experiences.
   */
  cinema:  (t) => t < 0.5
    ? 8 * t * t * t * t
    : 1 - Math.pow(-2 * t + 2, 4) / 2,

  /**
   * silk: Extreme deceleration — the scroll "melts" to a stop.
   * Feels almost gravity-defying, like floating through content.
   * ★ Best overall for a premium, high-end feel.
   */
  silk:    (t) => 1 - Math.pow(1 - t, 5),

  /**
   * drift: Starts slow, accelerates gently, ends with a very long tail.
   * Like a boat coasting to rest on calm water.
   */
  drift:   (t) => {
    const sqt = Math.sqrt(t);
    return sqt / (2 * (sqt - t) + 1);
  },

  /**
   * spring: Soft overshoot that settles — adds life and personality.
   * Use sparingly for interactive/playful UIs.
   */
  spring:  (t) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1
      : Math.pow(2, -9 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },

  /**
   * quart: Strong ease-out — snappy pickup, smooth landing.
   */
  quart:   (t) => 1 - Math.pow(1 - t, 4),
};

// ─── Default Configuration ────────────────────────────────────────────────────
const DEFAULT_OPTIONS = {
  // Scroll inertia duration (seconds).
  // 2.2s gives a heavy, slow-motion feel — almost cinematic.
  duration:          2.2,

  // 'silk' is the slowest, most weighted easing in the preset library.
  // Change to 'cinema' for a slightly snappier but still premium feel.
  easing:            'silk',

  // Very low wheel multiplier = strong resistance, slow physical feel.
  // Range: 0.5 (ultra slow) → 1.5 (fast/native-like).
  wheelMultiplier:   0.55,

  // Slightly heavier touch — feels like dragging through liquid on mobile.
  touchMultiplier:   0.75,

  // Enable smooth handheld for a consistent feel on mobile.
  smoothHandheld:    true,

  // Disable overscroll to prevent bounce competing with Lenis inertia.
  overscroll:        false,

  // Orientation — change to 'horizontal' for horizontal scroll rigs.
  orientation:       'vertical',

  // Gesture direction capture.
  gestureOrientation: 'vertical',

  // Event callbacks (all optional).
  onScroll:          null,   // ({ scroll, limit, velocity, direction, progress }) => void
  onStart:           null,   // () => void
  onStop:            null,   // () => void
};

/**
 * ─── useLenis ─────────────────────────────────────────────────────────────────
 *
 * A premium-grade Lenis smooth scroll hook for Next.js, wired directly into
 * GSAP's render ticker for perfect, conflict-free ScrollTrigger integration.
 *
 * @param {Partial<typeof DEFAULT_OPTIONS>} userOptions - Override any defaults.
 *
 * @returns {{
 *   lenisRef: React.MutableRefObject<Lenis | null>,
 *   stop:     () => void,
 *   start:    () => void,
 *   scrollTo: (target: string | number | HTMLElement, opts?: object) => void,
 * }}
 *
 * @example
 * const { lenisRef, scrollTo } = useLenis({ easing: 'cinema', duration: 1.6 });
 *
 * // Programmatically scroll to a section:
 * scrollTo('#hero', { offset: -80, duration: 2 });
 *
 * // Or to a pixel offset:
 * scrollTo(1200);
 */
export default function useLenis(userOptions = {}) {
  const lenisRef       = useRef(null);
  const onScrollRef    = useRef(userOptions.onScroll ?? null);
  const onStartRef     = useRef(userOptions.onStart  ?? null);
  const onStopRef      = useRef(userOptions.onStop   ?? null);

  // Keep callback refs fresh without re-running the main effect.
  useEffect(() => { onScrollRef.current = userOptions.onScroll ?? null; }, [userOptions.onScroll]);
  useEffect(() => { onStartRef.current  = userOptions.onStart  ?? null; }, [userOptions.onStart]);
  useEffect(() => { onStopRef.current   = userOptions.onStop   ?? null; }, [userOptions.onStop]);

  // ─── Public API (stable references) ────────────────────────────────────────
  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  const scrollTo = useCallback((target, opts = {}) => {
    lenisRef.current?.scrollTo(target, {
      offset:   0,
      duration: 1.4,
      easing:   EASING_PRESETS.expo,
      ...opts,
    });
  }, []);

  // ─── Core Effect ───────────────────────────────────────────────────────────
  useEffect(() => {
    const options = { ...DEFAULT_OPTIONS, ...userOptions };

    // Resolve easing: use a preset string key or fall through to a custom fn.
    const easingFn =
      typeof options.easing === 'function'
        ? options.easing
        : (EASING_PRESETS[options.easing] ?? EASING_PRESETS.expo);

    // ── 1. Instantiate Lenis ─────────────────────────────────────────────────
    const lenis = new Lenis({
      duration:           options.duration,
      easing:             easingFn,
      wheelMultiplier:    options.wheelMultiplier,
      touchMultiplier:    options.touchMultiplier,
      smoothHandheld:     options.smoothHandheld,
      overscroll:         options.overscroll,
      orientation:        options.orientation,
      gestureOrientation: options.gestureOrientation,
      // CRITICAL: hand off RAF to GSAP ticker — no double-RAF loop.
      autoRaf:            false,
    });

    lenisRef.current = lenis;

    // ── 2. Scroll event → keep ScrollTrigger in sync ─────────────────────────
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      onScrollRef.current?.(e);
    });

    // ── 3. Start / Stop callbacks ─────────────────────────────────────────────
    lenis.on('scroll', ({ velocity }) => {
      if (velocity !== 0) onStartRef.current?.();
    });

    // ── 4. Pipe Lenis into GSAP's single render ticker ────────────────────────
    //      GSAP time is in seconds → Lenis.raf() expects milliseconds.
    const rafUpdate = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafUpdate);

    // ── 5. Kill GSAP lag-smoothing so Lenis inertia is never sabotaged ────────
    gsap.ticker.lagSmoothing(0);

    // ── 6. Sync ScrollTrigger's scroll position baseline ─────────────────────
    ScrollTrigger.refresh();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      gsap.ticker.remove(rafUpdate);
      lenis.destroy();
      lenisRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userOptions.duration,
    userOptions.easing,
    userOptions.wheelMultiplier,
    userOptions.touchMultiplier,
    userOptions.smoothHandheld,
    userOptions.overscroll,
    userOptions.orientation,
    userOptions.gestureOrientation,
  ]);

  return { lenisRef, stop, start, scrollTo };
}
