import { Link } from "react-router"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Magnetic from "@/app/components/Magnetic"
import { homeEn } from "@/data/en"

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ─── Hero（与中文 App.tsx 动效一致）────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } })
      heroTl
        .from(".hero-char", { yPercent: 120, duration: 0.9, stagger: 0.05 })
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.6 }, "-=0.5")
        .from(".hero-rest", { y: 20, opacity: 0, duration: 0.7, stagger: 0.15 }, "-=0.4")
    },
    { scope: ref }
  )

  return (
    <section
      ref={ref}
      className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 text-center"
    >
      <motion.div style={{ opacity, y }} className="w-full max-w-[1100px] mx-auto flex flex-col items-center">
        <h1 className="font-['Noto_Serif_SC',serif] text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.12] text-foreground mb-8">
          {homeEn.heroTitle.split("").map((char, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom py-[0.2em] -my-[0.2em]">
              <span className="inline-block hero-char">
                {char === " " ? " " : char}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-sub font-['Noto_Sans_SC',sans-serif] text-base lg:text-lg xl:text-xl text-accent mb-12">
          {homeEn.heroSubtitle}
        </p>

        <div className="hero-rest relative w-full rounded-2xl border border-white/60 bg-white/35 px-8 py-8 lg:px-12 lg:py-10 shadow-lg shadow-accent/5 backdrop-blur-md mb-14">
          <div className="font-['Noto_Serif_SC',serif] text-xl lg:text-2xl xl:text-3xl leading-relaxed text-foreground">
            {homeEn.heroQuote}
            <span className="block mt-3 font-['Noto_Sans_SC',sans-serif] text-base lg:text-lg text-[#4A4A45]">
              {homeEn.heroQuoteEnd}
            </span>
            <span className="block font-['Noto_Sans_SC',sans-serif] text-sm lg:text-base text-[#9B9B90] mt-5">
              {homeEn.heroQuoteBy}
            </span>
          </div>
        </div>

        <div className="hero-rest flex flex-wrap gap-5 justify-center">
          <Magnetic>
            <Link
              to="/en/course"
              className="inline-flex items-center px-8 py-4 bg-foreground text-[#F5F5F0] font-['Noto_Sans_SC',sans-serif] text-sm lg:text-base font-medium rounded-sm hover:bg-[#333330] transition-colors duration-200"
            >
              {homeEn.heroBtnPrimary}
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              to="/course-center"
              className="inline-flex items-center px-8 py-4 border border-border text-foreground font-['Noto_Sans_SC',sans-serif] text-sm lg:text-base font-medium rounded-sm hover:bg-[#E6E6E0] transition-colors duration-200"
            >
              {homeEn.heroBtnSecondary}
            </Link>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Root（与中文 App.tsx 动效一致）──────────────────────────────────────
export default function EnHomePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      // WhyPak：左右两栏分别从两侧展开
      gsap.from(".whypak-left", {
        x: -30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".whypak-section", start: "top 75%" },
      })
      gsap.from(".whypak-right", {
        x: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".whypak-section", start: "top 75%" },
      })

      // WhyPak 右侧数据：数字滚动计数
      gsap.utils.toArray<HTMLElement>("[data-count]", pageRef.current).forEach((el) => {
        const target = parseFloat(el.dataset.count || "0")
        const suffix = el.dataset.suffix || ""
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target, duration: 1.6, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix
          },
        })
      })

      // Features：标题浮入 + 01-04 卡片从左到右依次展开
      gsap.from(".features-head", {
        y: 28, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".features-section", start: "top 78%" },
      })
      gsap.from(".feature-card", {
        x: -40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".feature-grid", start: "top 82%" },
      })

      // CTA：标题 / 正文 / 按钮依次浮入
      gsap.from(".cta-reveal", {
        y: 24, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".cta-section", start: "top 80%" },
      })
    },
    { scope: pageRef }
  )

  return (
    <div ref={pageRef} className="min-h-screen bg-background text-foreground font-['Noto_Sans_SC',sans-serif] overflow-x-hidden">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <WhyPak />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

// ─── Why PAK ─────────────────────────────────────────────────────────────
function WhyPak() {
  return (
    <section className="whypak-section bg-[#E6E6E0] py-24 lg:py-36">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="whypak-left">
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-5">
              {homeEn.whyTag}
            </p>
            <h2 className="font-['Noto_Serif_SC',serif] text-4xl lg:text-5xl font-semibold leading-[1.15] text-foreground mb-7">
              {homeEn.whyTitle1}
              <br />
              {homeEn.whyTitle2}
            </h2>
            <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed mb-6">
              {homeEn.whyP1}
            </p>
            <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed mb-10">
              {homeEn.whyP2}
            </p>
            <div className="flex flex-col gap-3">
              {homeEn.whyList.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent block" />
                  </span>
                  <span className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#4A4A45]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="whypak-right flex flex-col gap-6">
            {homeEn.stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-4 pb-5 border-b border-border/50">
                <span
                  data-count={stat.num.replace("+", "")}
                  data-suffix={stat.num.includes("+") ? "+" : ""}
                  className="font-['Noto_Serif_SC',serif] text-4xl font-semibold text-accent"
                >
                  {stat.num}
                </span>
                <span className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Features ────────────────────────────────────────────────────────────
function Features() {
  return (
    <section className="features-section bg-[#F5F5F0] py-24 lg:py-36">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="features-head grid grid-cols-1 lg:grid-cols-[6fr_6fr] gap-16 mb-20 items-center">
          <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl xl:text-5xl font-semibold leading-[1.25] text-foreground">
            {homeEn.featuresTitle}
          </h2>
          <p className="font-['Noto_Sans_SC',sans-serif] text-lg lg:text-xl text-[#6B6B62] leading-relaxed">
            {homeEn.featuresSubtitle}
          </p>
        </div>

        <div className="feature-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {homeEn.features.map((f) => (
            <div
              key={f.number}
              className="feature-card bg-[#F5F5F0] p-8 flex flex-col gap-6 hover:bg-[#E6E6E0] transition-colors duration-200 group"
            >
              <span className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] text-accent">
                {f.number}
              </span>
              <h3 className="font-['Noto_Serif_SC',serif] text-xl font-semibold text-foreground leading-snug">
                {f.title}
              </h3>
              <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62] leading-relaxed flex-1">
                {f.desc}
              </p>
              <div className="w-6 h-px bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ─────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="cta-section bg-[#1C1C1A] py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="cta-reveal font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.2] text-[#F5F5F0] mb-5">
          {homeEn.ctaTitle}
        </h2>
        <p className="cta-reveal font-['Noto_Sans_SC',sans-serif] text-base text-[#9B9B90] mb-10 max-w-[520px] mx-auto leading-relaxed">
          {homeEn.ctaText}
        </p>
        <Link
          to="/en/contact"
          className="cta-reveal inline-flex items-center px-8 py-4 bg-accent text-accent-foreground font-['Noto_Sans_SC',sans-serif] text-sm font-medium rounded-sm hover:bg-[#4A7F7B] transition-colors duration-200"
        >
          {homeEn.ctaBtn}
        </Link>
      </div>
    </section>
  )
}
