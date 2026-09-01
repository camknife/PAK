import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import ScrollReveal from "@/app/components/ScrollReveal"
import { aboutEn } from "@/data/en"

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ─── 英文健康金三角动效 SVG（与中文版一致，文本用英文）──────────────────
function EnHealthTriangle() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      const svg = ref.current?.querySelector(".triangle-svg")
      if (!svg) return
      svg.querySelectorAll(".triangle-draw").forEach((el) => {
        const path = el as SVGGeometryElement
        const len = path.getTotalLength()
        const originalDash = path.getAttribute("stroke-dasharray")
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power2.inOut",
          onComplete: () => {
            if (originalDash) path.setAttribute("stroke-dasharray", originalDash)
          },
          scrollTrigger: { trigger: ".triangle-svg", start: "top 80%" },
        })
      })
      gsap.from(".triangle-label", {
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: ".triangle-svg", start: "top 80%" },
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className="flex-shrink-0 hidden lg:block">
      <svg className="triangle-svg" width="300" height="270" viewBox="-10 0 300 270" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon className="triangle-draw" points="140,30 40,220 240,220" fill="none" stroke="#1C1C1A" strokeWidth="2.5" />
        <text className="triangle-label" x="140" y="18" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1C1C1A" fontFamily="Noto Sans SC, sans-serif">
          Structure
        </text>
        <text className="triangle-label" x="40" y="248" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5A8F8B" fontFamily="Noto Sans SC, sans-serif">
          Chemical
        </text>
        <text className="triangle-label" x="240" y="248" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5A8F8B" fontFamily="Noto Sans SC, sans-serif">
          Mental
        </text>
        <circle cx="140" cy="155" r="24" fill="#F5F5F0" stroke="#1C1C1A" strokeWidth="2" />
        <text x="140" y="160" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1C1C1A" fontFamily="Noto Sans SC, sans-serif">
          Health
        </text>
        <line className="triangle-draw" x1="140" y1="131" x2="140" y2="30" stroke="#9B9B90" strokeWidth="1" strokeDasharray="4 3" />
        <line className="triangle-draw" x1="122" y1="168" x2="40" y2="220" stroke="#9B9B90" strokeWidth="1" strokeDasharray="4 3" />
        <line className="triangle-draw" x1="158" y1="168" x2="240" y2="220" stroke="#9B9B90" strokeWidth="1" strokeDasharray="4 3" />
      </svg>
    </div>
  )
}

// ─── 英文 About PAK 页（Hans 批注定稿版）──────────────────────────────
export default function EnAboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-['Noto_Sans_SC',sans-serif] overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="max-w-[900px] mx-auto px-6 pt-32 lg:pt-40 pb-16">
          <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-6">
            {aboutEn.eyebrow}
          </p>
          <h1 className="font-['Noto_Serif_SC',serif] text-5xl lg:text-6xl font-semibold leading-[1.12] text-foreground mb-6">
            {aboutEn.title}
          </h1>
          <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed max-w-[600px]">
            {aboutEn.subtitle}
          </p>
        </section>

        {/* 01 Definition */}
        <section className="max-w-[900px] mx-auto px-6 pb-24">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              <div>
                <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
                  {aboutEn.defTag}
                </p>
                <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.15] text-foreground mb-8">
                  {aboutEn.defTitle}
                </h2>
                <div className="space-y-6">
                  <p className="font-['Noto_Sans_SC',sans-serif] text-lg text-[#4A4A45] leading-[1.8]">
                    {aboutEn.defP1}
                  </p>
                  <p className="font-['Noto_Sans_SC',sans-serif] text-lg text-[#4A4A45] leading-[1.8]">
                    {aboutEn.defP2}
                  </p>
                </div>
              </div>

              <div className="bg-[#F5F5F0] border border-border rounded-sm p-6 lg:p-8">
                <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-3">
                  Certification System Timeline
                </p>
                <h3 className="font-['Noto_Serif_SC',serif] text-xl lg:text-2xl font-semibold text-foreground mb-8">
                  {aboutEn.timelineTitle}
                </h3>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-[#4A7F7B]/30" />
                  {aboutEn.timeline.map((item) => (
                    <div key={item.year} className="relative pl-8 pb-8 last:pb-0">
                      <span className="absolute left-[-5px] top-1.5 w-[10px] h-[10px] rounded-full bg-[#4A7F7B]" />
                      <p className="font-['Noto_Sans_SC',sans-serif] text-sm font-semibold text-[#4A7F7B]">
                        {item.year}
                      </p>
                      <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#4A4A45] leading-relaxed mt-1">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 02 Core theory */}
        <section className="bg-[#E6E6E0] py-24 lg:py-32">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mb-16">
              <div className="max-w-[560px]">
                <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-5">
                  {aboutEn.coreTheoryTag}
                </p>
                <h2 className="font-['Noto_Serif_SC',serif] text-4xl lg:text-5xl font-semibold leading-[1.15] text-foreground mb-6">
                  {aboutEn.coreTheoryTitle}
                </h2>
                <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed">
                  {aboutEn.coreTheoryText}
                </p>
              </div>
              <EnHealthTriangle />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
              {aboutEn.dims.map((d) => (
                <div key={d.title} className="bg-[#F5F5F0] p-8 flex flex-col gap-5">
                  <div>
                    <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.12em] uppercase text-accent mb-2">
                      {d.title}
                    </p>
                    <h3 className="font-['Noto_Serif_SC',serif] text-xl font-semibold text-foreground">
                      {d.subtitle}
                    </h3>
                  </div>
                  <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62] leading-relaxed">
                    {d.desc}
                  </p>
                  <ul className="flex flex-col gap-2 mt-auto pt-4 border-t border-border/50">
                    {d.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-[#4A4A45]">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Origin */}
        <section className="max-w-[900px] mx-auto px-6 py-24">
          <ScrollReveal>
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
              {aboutEn.originTag}
            </p>
            <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.15] text-foreground mb-8">
              {aboutEn.originTitle}
            </h2>
            <div className="space-y-5">
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed">
                {aboutEn.originP1}
              </p>
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed">
                {aboutEn.originP2}
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* 04 Key figures */}
        <section className="max-w-[900px] mx-auto px-6 pb-24">
          <ScrollReveal>
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
              {aboutEn.figuresTag}
            </p>
            <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.15] text-foreground mb-8">
              {aboutEn.figuresTitle}
            </h2>
            <div className="flex flex-col gap-6">
              {aboutEn.figures.map((person) => (
                <div key={person.name} className="bg-[#F5F5F0] border border-border rounded-sm p-6 flex gap-5">
                  <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                    <span className="font-['Noto_Serif_SC',serif] text-xl font-semibold text-accent">
                      {person.initial}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-['Noto_Serif_SC',serif] text-lg font-semibold text-foreground mb-1">
                      {person.name}
                    </h3>
                    <p className="font-['Noto_Sans_SC',sans-serif] text-xs text-accent mb-3">
                      {person.role}
                    </p>
                    <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#4A4A45] leading-relaxed">
                      {person.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 05 Efficacy */}
        <section className="max-w-[900px] mx-auto px-6 pb-24">
          <ScrollReveal>
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
              {aboutEn.efficacyTag}
            </p>
            <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.15] text-foreground mb-8">
              {aboutEn.efficacyTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
              {aboutEn.efficacyCards.map((item) => (
                <div key={item.title} className="bg-[#F5F5F0] p-7 flex flex-col gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <h4 className="font-['Noto_Serif_SC',serif] text-lg font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62] leading-relaxed flex-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 06 Concept */}
        <section className="max-w-[900px] mx-auto px-6 pb-24">
          <ScrollReveal>
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
              {aboutEn.conceptTag}
            </p>
            <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.15] text-foreground mb-8">
              {aboutEn.conceptTitle}
            </h2>
            <div className="bg-[#F5F5F0] border border-border rounded-sm p-6 lg:p-8">
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed mb-4">
                {aboutEn.conceptText}
              </p>
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed mb-4">
                {aboutEn.conceptP2}
              </p>
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed">
                {aboutEn.conceptP3}
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* 07 Curriculum */}
        <section className="max-w-[900px] mx-auto px-6 pb-24">
          <ScrollReveal>
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
              {aboutEn.curriculumTag}
            </p>
            <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.15] text-foreground mb-8">
              {aboutEn.curriculumTitle}
            </h2>
            <div className="space-y-5 mb-10">
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed">
                {aboutEn.curriculumP1}
              </p>
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed">
                {aboutEn.curriculumP2}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between mb-10">
              {aboutEn.curriculumModules.map((s, i, arr) => (
                <div key={s.title} className="flex items-center gap-3 sm:gap-0 flex-1">
                  <div className={`flex-1 border-2 p-4 rounded-sm text-center ${s.active ? "border-accent bg-accent/5" : "border-border"}`}>
                    <p className="font-['Noto_Sans_SC',sans-serif] text-sm font-semibold text-foreground">{s.title}</p>
                    <p className="font-['Noto_Sans_SC',sans-serif] text-xs text-[#6B6B62] mt-1">{s.desc}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="hidden sm:block text-[#9B9B90] mx-2 flex-shrink-0">→</span>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-[#F5F5F0] border border-border rounded-sm p-6 mb-4">
              <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62] leading-relaxed">
                {aboutEn.curriculumNote1}
              </p>
            </div>
            <div className="bg-[#F5F5F0] border border-border rounded-sm p-6">
              <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62] leading-relaxed">
                {aboutEn.curriculumNote2}
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  )
}
