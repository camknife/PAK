import { useEffect, useRef } from "react"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import ScrollReveal from "@/app/components/ScrollReveal"
import Marquee from "@/app/components/Marquee"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ─── Health Triangle (from home page) ─────────────────────────────────────────
function HealthTriangle() {
  const dims = [
    {
      title: "结构 Structural",
      subtitle: "身体功能的物理基础",
      desc: "骨骼、肌肉、关节、神经的结构完整性。通过徒手肌肉测试评估神经肌肉功能，识别筋膜张力、关节对位、神经肌肉代偿模式。",
      items: ["筋膜张力评估", "关节对位检查", "神经肌肉代偿识别", "脊柱功能检测"],
    },
    {
      title: "化学 Chemical",
      subtitle: "身体运作的化学基础",
      desc: "营养、毒素、代谢、内分泌的化学平衡。检测营养缺乏、食物敏感、毒素负荷与代谢功能状态。",
      items: ["营养缺乏检测", "食物敏感筛查", "毒素负荷评估", "代谢功能分析"],
    },
    {
      title: "心理 Mental",
      subtitle: "身体健康的心理基础",
      desc: "情绪、压力、信念、精神状态的心理平衡。分析情绪压力、创伤记忆、信念模式对身体的深层影响。",
      items: ["情绪压力释放", "创伤记忆处理", "信念模式分析", "身心整合调和"],
    },
  ]

  return (
    <section className="bg-[#E6E6E0] py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mb-16">
          {/* Left: title + description */}
          <div className="max-w-[560px]">
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-5">
              AK 核心理论
            </p>
            <h2 className="font-['Noto_Serif_SC',serif] text-4xl lg:text-5xl font-semibold leading-[1.15] text-foreground mb-6">
              健康金三角
            </h2>
            <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed">
              PAK 通过手法肌肉测试，从结构、化学与心理三个维度交叉排查身体失衡的根源。
              这不是三个独立的系统，而是一个相互交织的整体——任何一个维度的失衡都会在其他维度产生连锁反应。
            </p>
          </div>

          {/* Right: triangle diagram */}
          <div className="flex-shrink-0 hidden lg:block">
            <svg className="triangle-svg" width="300" height="270" viewBox="-10 0 300 270" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Triangle */}
              <polygon className="triangle-draw" points="140,30 40,220 240,220" fill="none" stroke="#1C1C1A" strokeWidth="2.5" />
              {/* Top: 结构 */}
              <text className="triangle-label" x="140" y="18" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1C1C1A" fontFamily="Noto Sans SC, sans-serif">
                结构 Structural
              </text>
              {/* Bottom-left: 化学 */}
              <text className="triangle-label" x="40" y="248" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5A8F8B" fontFamily="Noto Sans SC, sans-serif">
                化学 Chemical
              </text>
              {/* Bottom-right: 心理 */}
              <text className="triangle-label" x="240" y="248" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5A8F8B" fontFamily="Noto Sans SC, sans-serif">
                心理 Mental
              </text>
              {/* Center circle: 健康 */}
              <circle cx="140" cy="155" r="24" fill="#F5F5F0" stroke="#1C1C1A" strokeWidth="2" />
              <text x="140" y="160" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1C1C1A" fontFamily="Noto Sans SC, sans-serif">
                健康
              </text>
              {/* Dashed lines from center to each vertex */}
              <line className="triangle-draw" x1="140" y1="131" x2="140" y2="30" stroke="#9B9B90" strokeWidth="1" strokeDasharray="4 3" />
              <line className="triangle-draw" x1="122" y1="168" x2="40" y2="220" stroke="#9B9B90" strokeWidth="1" strokeDasharray="4 3" />
              <line className="triangle-draw" x1="158" y1="168" x2="240" y2="220" stroke="#9B9B90" strokeWidth="1" strokeDasharray="4 3" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
          {dims.map((d) => (
            <div
              key={d.title}
              className="tilt-card bg-[#F5F5F0] p-8 flex flex-col gap-5"
            >
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
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CoursePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 尊重系统「减弱动态效果」设置：跳过所有动画
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduceMotion) return

      // 1. Hero 进场：小标浮入 → 标题逐字遮罩展开 → 正文浮入
      const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } })
      heroTl
        .from(".hero-eyebrow", { y: 24, opacity: 0, duration: 0.6 })
        .from(".hero-char", { yPercent: 120, duration: 0.9, stagger: 0.06 }, "-=0.2")
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.6 }, "-=0.5")

      // 2. 纪录片视频入场：滚入视口时轻微放大 + 淡入
      gsap.from(".video-wrap", {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: ".video-wrap", start: "top 85%" },
      })

      // 3. 认证体系时间线：随滚动进度逐一点亮（scroll-scrub，可回滚）
      const timelineTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".timeline-card",
          start: "top 82%",
          end: "top 15%",
          scrub: 1,
        },
      })
      timelineTl
        .from(".timeline-line", {
          scaleY: 0,
          transformOrigin: "top",
          ease: "none",
          duration: 0.5,
        })
        .from(
          ".timeline-item",
          { opacity: 0, y: 16, ease: "none", stagger: 0.35, duration: 0.5 },
          "+=0.15"
        )

      // 4. 健康金三角：边框线随滚动自动描画，标签淡入
      const svg = pageRef.current?.querySelector(".triangle-svg")
      if (svg) {
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
              // 虚线元素绘制完成后恢复原有的虚线样式
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
      }

      // 5. 数字滚动计数：滚入视口时从 0 滚动到目标值
      gsap.utils.toArray<HTMLElement>("[data-count]", pageRef.current).forEach((el) => {
        const target = parseFloat(el.dataset.count || "0")
        const suffix = el.dataset.suffix || ""
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix
          },
        })
      })
      // 7. 文字逐词显现：把 .reveal-words 内的文字运行时拆成字/词并随滚动逐一亮起
      gsap.utils.toArray<HTMLElement>(".reveal-words", pageRef.current).forEach((block) => {
        const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT)
        const textNodes: Text[] = []
        let cur: Node | null
        while ((cur = walker.nextNode())) textNodes.push(cur as Text)
        textNodes.forEach((node) => {
          const frag = document.createDocumentFragment()
          node.textContent!.split(/(\s+)/).forEach((part) => {
            if (!part) return
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(" "))
              return
            }
            // 中文字按单字、拉丁词/数字按整词拆分，保留 <strong> 标签
            const units =
              part.match(
                /[一-鿿]|[　-〿＀-￯]|[A-Za-z0-9]+|[^\s一-鿿　-〿＀-￯]+/g
              ) || [part]
            units.forEach((u) => {
              const mask = document.createElement("span")
              mask.className = "inline-block overflow-hidden align-bottom"
              const inner = document.createElement("span")
              inner.className = "inline-block word-item"
              inner.textContent = u
              mask.appendChild(inner)
              frag.appendChild(mask)
            })
          })
          node.replaceWith(frag)
        })

        gsap.from(block.querySelectorAll<HTMLElement>(".word-item"), {
          yPercent: 110,
          opacity: 0,
          duration: 0.5,
          stagger: 0.012,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 85%" },
        })
      })
    },
    { scope: pageRef }
  )

  // 3D 鼠标倾斜卡片：用普通 useEffect 实现（useGSAP 的 context 在此环境会被立即 revert，改用 useEffect 保证监听常驻）
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const cards = gsap.utils.toArray<HTMLElement>(".tilt-card", pageRef.current)
    const handlers: Array<[HTMLElement, (e: MouseEvent) => void, () => void]> = []
    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width - 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5
        gsap.to(card, {
          rotationY: px * 10,
          rotationX: -py * 10,
          transformPerspective: 900,
          duration: 0.4,
          ease: "power2.out",
        })
      }
      const onLeave = () => {
        gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power2.out" })
      }
      card.addEventListener("mousemove", onMove)
      card.addEventListener("mouseleave", onLeave)
      handlers.push([card, onMove, onLeave])
    })
    return () => {
      handlers.forEach(([card, onMove, onLeave]) => {
        card.removeEventListener("mousemove", onMove)
        card.removeEventListener("mouseleave", onLeave)
      })
    }
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen bg-background text-foreground font-['Noto_Sans_SC',sans-serif] overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="max-w-[900px] mx-auto px-6 pt-32 lg:pt-40 pb-16">
          <p className="hero-eyebrow font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-6">
            应用肌动学入门
          </p>
          <h1 className="hero-title font-['Noto_Serif_SC',serif] text-5xl lg:text-6xl font-semibold leading-[1.12] text-foreground mb-6">
            {"关于 PAK".split("").map((char, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <span className="inline-block hero-char">
                  {char === " " ? " " : char}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-sub font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed max-w-[600px]">
            应用肌动学（Applied Kinesiology，简称 AK）是现代肌动学体系的源头，
            由美国脊医佐治·古赫特博士（Dr. George Goodheart）于 1964 年正式创立。
          </p>
        </section>

        {/* AK 纪录片视频 */}
        <section className="video-wrap max-w-[900px] mx-auto px-6 pb-16">
          <video
            className="w-full aspect-video bg-black rounded-sm shadow-sm"
            controls
            playsInline
            preload="metadata"
            src="https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/ak_documentary.mp4"
          >
            您的浏览器不支持 HTML5 视频播放。
          </video>
          <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62] mt-3">
            AK 应用肌动学纪录片
          </p>
        </section>

        {/* 关键词跑马灯 */}
        <Marquee />

        {/* Content */}
        <section className="max-w-[900px] mx-auto px-6 pb-32 space-y-16">
          {/* 01 定义与核心特征 */}
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              {/* Left: 什么是应用肌动学 */}
              <div>
                <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
                  01 · 定义与核心特征
                </p>
                <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.15] text-foreground mb-8">
                  什么是应用肌动学
                </h2>
                <div className="reveal-words prose-custom space-y-7">
                  <p className="font-['Noto_Sans_SC',sans-serif] text-xl text-[#4A4A45] leading-[1.8]">
                    区别于传统研究人体运动系统的运动学（Kinesiology），应用肌动学是一门融合了
                    <strong className="text-foreground font-medium">西方生理学</strong>（神经、肌肉、淋巴、血管系统）与
                    <strong className="text-foreground font-medium">东方能量医学</strong>（经络、穴位理论）的新兴健康科学。
                  </p>
                  <p className="font-['Noto_Sans_SC',sans-serif] text-xl text-[#4A4A45] leading-[1.8]">
                    其最核心的特征是使用<strong className="text-foreground font-medium">徒手肌肉测试</strong>作为生物反馈机制。
                    与传统测量肌肉力量的"肌力测试"不同，徒手肌肉测试旨在评估神经系统对肌肉的实时控制能力。
                    通过观察肌肉反应（扣紧或松软），获取意识之外的生理和能量失衡信息，从而指导诊断、评估疗效。
                  </p>
                </div>
              </div>

              {/* Right: 认证体系时间线 */}
              <div className="timeline-card bg-[#F5F5F0] border border-border rounded-sm p-6 lg:p-8">
                <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-3">
                  认证体系时间线
                </p>
                <h3 className="font-['Noto_Serif_SC',serif] text-xl lg:text-2xl font-semibold text-foreground mb-8">
                  PAK 六十载发展历程
                </h3>
                <div className="relative">
                  <div className="timeline-line absolute left-0 top-0 bottom-0 w-px bg-[#4A7F7B]/30" />
                  {[
                    { year: "1964", text: "Dr. Goodheart 创立应用肌动学" },
                    { year: "1974", text: "ICAK 国际应用肌动学学院成立" },
                    { year: "1976", text: "首个 AK 标准化教学大纲发布" },
                    { year: "1992", text: "Dr. Hans Garten 获 DIBAK 认证" },
                    { year: "2000+", text: "AK 进入中国，多家培训机构开展中文教学" },
                    { year: "2026", text: "健衡学园引入 Hans Garten 官方中文课程" },
                  ].map((item) => (
                    <div key={item.year} className="timeline-item relative pl-8 pb-8 last:pb-0">
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

        {/* 02 健康金三角 — full version from home page */}
        <ScrollReveal>
          <HealthTriangle />
        </ScrollReveal>

        <section className="max-w-[900px] mx-auto px-6 pb-32 space-y-16 pt-16">
          <ScrollReveal>
            <div className="border-t border-border" />

          {/* 03 开创性起源与理论基石 */}
          <div>
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
              03 · 开创性起源与理论基石
            </p>
            <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.15] text-foreground mb-8">
              从一次临床突破到完整体系
            </h2>
            <div className="prose-custom space-y-5">
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed">
                应用肌动学的创立源于一次临床突破。古赫特医生在治疗一位顽固性肩胛骨竖立患者时，
                发现其前锯肌功能失调。在没有现有方法可用的情况下，他通过按压该肌肉的肌腱附着点，
                意外恢复了肌肉功能，并使肩胛骨复位。
              </p>
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed">
                以此为起点，Goodheart 博士与其他众多 ICAK 认证讲师，整合了源自整骨医学、整脊医学、功能医学、针灸、营养医学（分子矫正医学）等众多领域的丰富知识与方法，开创了一套独特的整体医疗保健体系——这也是目前已知唯一真正意义上的整体医疗保健体系。
              </p>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border-t border-border" />

          {/* 04 关键人物 */}
          <div>
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
              04 · 关键人物
            </p>
            <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.15] text-foreground mb-8">
              AK 的奠基者与推动者
            </h2>

            <div className="flex flex-col gap-6">
              {[
                {
                  initial: "G",
                  name: "George J. Goodheart Jr.",
                  role: "AK 创始人 | 1918–2008",
                  desc: "1964 年创立 Applied Kinesiology，发现了肌肉测试与身体功能之间的关联。1980 年成为美国奥运医疗队首位脊骨神经医师，被誉为「医疗保健界最被保守的秘密」的发现者。",
                },
                {
                  initial: "H",
                  name: "Hans Garten",
                  role: "AK 讲师 | DÄGAK 创始人 | DIBAK 认证",
                  desc: "DÄGAK（德国应用肌动学医学会）创始人，拥有 DIBAK（国际应用肌动学文凭）认证。applied-kinesiology.org 培训网站创始人，长期在全球授课，是中国 AK 课程的核心讲师。",
                },
                {
                  initial: "I",
                  name: "ICAK 国际应用肌动学学院",
                  role: "International College of Applied Kinesiology | 1976 年成立",
                  desc: "国际应用肌动学学院（ICAK）于 1976 年成立，拥有 14 个全球分会，是 AK 技术标准制定和认证的权威机构。ICAK 致力于推动 AK 的科学研究、教育培训和专业认证。",
                },
              ].map((person) => (
                <div
                  key={person.name}
                  className="tilt-card bg-[#F5F5F0] border border-border rounded-sm p-6 flex gap-5"
                >
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
          </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border-t border-border" />

          {/* 05 功效与应用范围 */}
          <div>
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
              05 · 功效与应用范围
            </p>
            <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.15] text-foreground mb-8">
              显著的临床功效
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
              {[
                { title: "清除肌肉骨骼功能障碍", desc: "对缓解颈肩腰腿痛等肌骨问题有良好的信度和效度，能精准定位并处理功能受限的肌肉。" },
                { title: "缓解压力与调节身心", desc: "肌动学的核心功能之一是缓解身体、心理和情绪上的压力。通过调和程序，可改善因压力引发的各类问题。" },
                { title: "改善代谢紊乱", desc: "改善代谢紊乱（内外毒素、激素失衡、慢性疲劳等能量代谢障碍）。" },
                { title: "改善身心健康水平", desc: "通过恢复身体的能量平衡和结构功能，促进整体健康，化解焦虑。" },
              ].map((item) => (
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
          </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border-t border-border" />

          {/* 06 AK与PAK的区别 */}
          <div>
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
              06 · 概念辨析
            </p>
            <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.15] text-foreground mb-8">
              PAK（应用肌动学）与衍生方法
            </h2>

            <div className="bg-[#F5F5F0] border border-border rounded-sm p-6 lg:p-8 space-y-4">
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed">
                <strong className="text-foreground font-medium">应用肌动学（AK）</strong>仅向医疗保健专业人员授课，因为它需要扎实的解剖学、生理学和生物化学知识基础。
              </p>
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed">
                <strong className="text-foreground font-medium">PAK 从业者</strong>这一头衔，须在完成 PAK 教育并通过专项考试后方可使用。
              </p>
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed">
                <strong className="text-foreground font-medium">触康健（Touch for Health）</strong>与<strong className="text-foreground font-medium">健脑操（Brain Gym）</strong>是面向大众教学、为大众所用的方法示例，它们在一定程度上使用了某种肌肉测试，但属于衍生方法，与 PAK 的专业定位有明确区分。
              </p>
            </div>
          </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border-t border-border" />

          {/* 08 DÄGAK课程体系 */}
          <div>
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
              07 · 课程体系
            </p>
            <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.15] text-foreground mb-8">
              DÄGAK 认证课程体系 — 6 大模块 · 240 学时
            </h2>

            <div className="prose-custom space-y-5 mb-10">
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed">
                全系列 PAK 认证课程共 <strong className="text-foreground font-medium">6 大模块</strong>，
                合计 <strong className="text-foreground font-medium">240 学时</strong>（含线上预习、线下实操、复训与作业）。
                每个模块 <strong className="text-foreground font-medium">3 天面授</strong>，教学主题由 DÄGAK 认证讲师安排。
              </p>
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#4A4A45] leading-relaxed">
                课程面向医疗从业人员开放：全科、牙科、康复、物理治疗、功能医学等方向的临床工作者均可报名。
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between mb-10">
              {[
                { title: "模块 1–2", desc: "当前开放", active: true },
                { title: "模块 3–4", desc: "后续开设", active: false },
                { title: "模块 5–6", desc: "后续开设", active: false },
              ].map((s, i, arr) => (
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
                所有课程支持单模块、双模块、四模块组合报名，具体详情请填写课程咨询单获取详情。
              </p>
            </div>

            <div className="bg-[#F5F5F0] border border-border rounded-sm p-6">
              <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62] leading-relaxed">
                模块 1–2 已开放报名，模块 3–6 将陆续开设。完成全部 6 大模块，即完成 PAK 认证课程体系的学习。
              </p>
            </div>
          </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </div>
  )
}
