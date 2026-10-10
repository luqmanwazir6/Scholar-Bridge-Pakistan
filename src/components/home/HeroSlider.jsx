import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  LuSearch,
  LuChevronLeft,
  LuChevronRight,
  LuGraduationCap,
  LuMapPin,
  LuSparkles,
  LuShieldCheck,
  LuAward,
  LuClock,
} from "react-icons/lu";

const SLIDES = [
  {
    id: 1,
    title: "Empowering Deserving Students in Khyber Pakhtunkhwa",
    subtitle: "Discover verified merit and need-based scholarships for Dera Ismail Khan and regional districts with zero intermediary fees.",
    tag: "D.I. KHAN PILOT PLATFORM",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80",
    fallbackGradient: "linear-gradient(135deg, #0A192F 0%, #0F3E3B 50%, #0A2540 100%)",
    statBadge: { value: "PKR 45M+", label: "Sample Grant Fund" },
  },
  {
    id: 2,
    title: "Direct Access to Higher Education Funding",
    subtitle: "From Matric to Postdoctoral research: find government, institutional, and private scholarship cycles tailored to your academic profile.",
    tag: "ALL EDUCATION LEVELS",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80",
    fallbackGradient: "linear-gradient(135deg, #1E1B4B 0%, #0A2540 60%, #153E75 100%)",
    statBadge: { value: "1,200+", label: "Eligible Students" },
  },
  {
    id: 3,
    title: "Transparent Eligibility & Instant Verification",
    subtitle: "Check your eligibility criteria before applying. Submit digital forms and track review stages with reference identifiers.",
    tag: "SECURE & OPEN ACCESS",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80",
    fallbackGradient: "linear-gradient(135deg, #0C4A6E 0%, #064E3B 50%, #0F172A 100%)",
    statBadge: { value: "100%", label: "Free to Apply" },
  },
  {
    id: 4,
    title: "Bridging the Financial Gap for High Achievers",
    subtitle: "Ensuring talent in Southern KP reaches top Pakistani universities including Gomal, UET Peshawar, and Quaid-i-Azam University.",
    tag: "MERIT & NEED SCHEMES",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1920&q=80",
    fallbackGradient: "linear-gradient(135deg, #111827 0%, #1E3A8A 60%, #0D9488 100%)",
    statBadge: { value: "24/7", label: "Application Tracking" },
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLevel, setSearchLevel] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");

  const navigate = useNavigate();
  const slideContainerRef = useRef(null);
  const contentRef = useRef(null);
  const touchStartX = useRef(null);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // GSAP animation when slide changes
  useEffect(() => {
    if (!contentRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-animated-elem",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power2.out" }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [currentSlide]);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchKeyword.trim()) params.append("search", searchKeyword.trim());
    if (searchLevel) params.append("level", searchLevel);
    if (searchDistrict) params.append("district", searchDistrict);
    navigate(`/scholarships?${params.toString()}`);
  };

  const slide = SLIDES[currentSlide];

  return (
    <section
      ref={slideContainerRef}
      className="hero-slider-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#0A192F",
        color: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Background Slides with Ken-Burns slow zoom */}
      {SLIDES.map((s, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={s.id}
            aria-hidden={!isActive}
            style={{
              position: "absolute",
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: "opacity 1.2s ease-in-out",
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            {/* Background Image / Fallback */}
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${s.image}), ${s.fallbackGradient}`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                animation: isActive ? "kenBurnsZoom 12s infinite alternate linear" : "none",
              }}
            />
            {/* Multi-layered dark gradient overlay for sharp contrast */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(10, 25, 47, 0.94) 0%, rgba(10, 25, 47, 0.82) 55%, rgba(10, 25, 47, 0.6) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(10, 25, 47, 0.4) 0%, transparent 60%, rgba(10, 25, 47, 0.95) 100%)",
              }}
            />
          </div>
        );
      })}

      {/* Hero Content Container */}
      <div
        className="container"
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 10,
          paddingTop: "60px",
          paddingBottom: "60px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "36px",
            maxWidth: "960px",
          }}
        >
          {/* Main Copy */}
          <div>
            <div
              className="hero-animated-elem"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--color-accent)",
                letterSpacing: "0.8px",
                marginBottom: "18px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <LuSparkles /> {slide.tag}
            </div>

            <h1
              className="hero-animated-elem"
              style={{
                fontSize: "clamp(1.6rem, 5vw, 3.8rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#FFFFFF",
                letterSpacing: "-0.8px",
                marginBottom: "18px",
              }}
            >
              {slide.title}
            </h1>

            <p
              className="hero-animated-elem"
              style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)",
                lineHeight: 1.6,
                color: "#CBD5E1",
                maxWidth: "760px",
                marginBottom: "28px",
              }}
            >
              {slide.subtitle}
            </p>

            {/* Quick Filter Chips */}
            <div
              className="hero-animated-elem"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "32px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#94A3B8", fontWeight: 600 }}>Quick Filters:</span>
              <Link
                to="/scholarships?category=Need-based"
                className="hero-chip"
              >
                Need-Based Aid
              </Link>
              <Link
                to="/scholarships?district=Dera+Ismail+Khan"
                className="hero-chip"
              >
                D.I. Khan Quota
              </Link>
              <Link
                to="/scholarships?level=Undergraduate"
                className="hero-chip"
              >
                Undergraduate / BS
              </Link>
              <Link
                to="/scholarships?category=Merit-based"
                className="hero-chip"
              >
                Merit Schemes
              </Link>
            </div>
          </div>

          {/* Integrated Modern Search Panel */}
          <div
            className="hero-animated-elem hero-search-panel"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              borderRadius: "var(--radius-xl)",
              padding: "20px 24px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              color: "var(--color-text-main)",
            }}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="hero-search-form"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr)) auto",
                gap: "12px",
                alignItems: "center",
              }}
            >
              {/* Keyword Input */}
              <div style={{ position: "relative" }}>
                <LuSearch
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-text-subtle)",
                    fontSize: "17px",
                  }}
                />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Keyword, university or field..."
                  style={{
                    width: "100%",
                    padding: "13px 14px 13px 40px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                    fontSize: "14px",
                    color: "var(--color-text-main)",
                    backgroundColor: "var(--color-bg-subtle)",
                  }}
                />
              </div>

              {/* Education Level Dropdown */}
              <div style={{ position: "relative" }}>
                <LuGraduationCap
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-text-subtle)",
                    fontSize: "17px",
                  }}
                />
                <select
                  value={searchLevel}
                  onChange={(e) => setSearchLevel(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "13px 14px 13px 40px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                    fontSize: "14px",
                    color: "var(--color-text-main)",
                    backgroundColor: "var(--color-bg-subtle)",
                  }}
                >
                  <option value="">All Education Levels</option>
                  <option value="Matric">Matric / SSC</option>
                  <option value="Intermediate">Intermediate / HSSC</option>
                  <option value="Undergraduate">Bachelor / Undergraduate</option>
                  <option value="Master">Master / MS</option>
                  <option value="PhD">PhD / Doctoral</option>
                </select>
              </div>

              {/* District Dropdown */}
              <div style={{ position: "relative" }}>
                <LuMapPin
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-text-subtle)",
                    fontSize: "17px",
                  }}
                />
                <select
                  value={searchDistrict}
                  onChange={(e) => setSearchDistrict(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "13px 14px 13px 40px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-border)",
                    fontSize: "14px",
                    color: "var(--color-text-main)",
                    backgroundColor: "var(--color-bg-subtle)",
                  }}
                >
                  <option value="">All Eligible Districts</option>
                  <option value="Dera Ismail Khan">Dera Ismail Khan</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Bannu">Bannu</option>
                  <option value="Tank">Tank</option>
                  <option value="Lakki Marwat">Lakki Marwat</option>
                  <option value="All">All Pakistan</option>
                </select>
              </div>

              {/* Find Scholarships Submit Button */}
              <button
                type="submit"
                className="btn btn-primary hero-search-btn"
                style={{
                  padding: "13px 26px",
                  borderRadius: "var(--radius-md)",
                  fontSize: "14px",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                Find Scholarships
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Metric Badge (Bottom Right) */}
      <div
        className="hero-floating-stat"
        style={{
          position: "absolute",
          bottom: "36px",
          right: "48px",
          zIndex: 20,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "14px 22px",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "var(--radius-full)",
            backgroundColor: "var(--color-accent)",
            color: "var(--color-primary-dark)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          <LuAward />
        </div>
        <div>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1 }}>
            {slide.statBadge.value}
          </div>
          <div style={{ fontSize: "11.5px", color: "#CBD5E1", fontWeight: 600 }}>
            {slide.statBadge.label}
          </div>
        </div>
      </div>

      {/* Slider Navigation Dots and Arrows */}
      <div
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            color: "#FFFFFF",
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-full)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <LuChevronLeft />
        </button>

        <div style={{ display: "flex", gap: "8px" }}>
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: idx === currentSlide ? "28px" : "10px",
                height: "10px",
                borderRadius: "var(--radius-full)",
                backgroundColor: idx === currentSlide ? "var(--color-accent)" : "rgba(255, 255, 255, 0.35)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            color: "#FFFFFF",
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-full)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <LuChevronRight />
        </button>
      </div>

      <style>{`
        @keyframes kenBurnsZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .hero-chip {
          background-color: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
          padding: 5px 12px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: background-color 0.15s ease, border-color 0.15s ease;
        }
        .hero-chip:hover {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
          color: #FFFFFF;
        }
        @media (max-width: 900px) {
          .hero-floating-stat {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .hero-search-panel {
            padding: 16px !important;
          }
          .hero-search-form {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
          .hero-search-btn {
            width: 100% !important;
            padding: 13px !important;
            justify-content: center !important;
          }
          .hero-slider-section {
            min-height: auto !important;
            padding-top: 24px !important;
            padding-bottom: 74px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-chip {
            font-size: 11px !important;
            padding: 4px 10px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
