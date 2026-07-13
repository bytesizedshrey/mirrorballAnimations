'use client';

import React from 'react';
import useLenis from '@/hooks/useLenis';

/**
 * SmoothScroller Component
 * Wrap your layout or specific page content with this component
 * to enable Lenis smooth scrolling integrated with GSAP ScrollTrigger.
 */
export default function SmoothScroller({ children }) {
  // Initialize Lenis and integrate with GSAP ScrollTrigger
  useLenis();

  return <>{children}</>;
}
