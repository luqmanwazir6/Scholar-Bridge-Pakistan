import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook to safely run GSAP animations inside React StrictMode using gsap.context().
 * @param {Function} effectCallback - Callback receiving gsap instance
 * @param {Array} deps - Dependency array
 * @returns {React.RefObject} containerRef
 */
export const useGsapContext = (effectCallback, deps = []) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      effectCallback(gsap, prefersReducedMotion);
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, deps);

  return containerRef;
};

/**
 * Fade up / reveal elements on scroll
 */
export const useReveal = (options = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const target = options.target
      ? containerRef.current.querySelectorAll(options.target)
      : containerRef.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        {
          opacity: 0,
          y: options.y ?? 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.8,
          stagger: options.stagger ?? 0.12,
          ease: options.ease ?? "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: options.start ?? "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

/**
 * Animated number counter on scroll
 */
export const useCounter = (endValue, duration = 2) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (!nodeRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      nodeRef.current.textContent = endValue.toLocaleString();
      return;
    }

    const counterObj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counterObj, {
        val: endValue,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: nodeRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(counterObj.val).toLocaleString();
          }
        },
      });
    }, nodeRef);

    return () => ctx.revert();
  }, [endValue, duration]);

  return nodeRef;
};

/**
 * Parallax background / image hook
 */
export const useParallax = (speed = 0.3) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        yPercent: speed * 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  return containerRef;
};

export default {
  useGsapContext,
  useReveal,
  useCounter,
  useParallax,
};
