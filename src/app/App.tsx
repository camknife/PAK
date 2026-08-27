import { Link } from "react-router"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Magnetic from "@/app/components/Magnetic"

gsap.registerPlugin(useGSAP, ScrollTrigger)

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])

  useGSAP(
    () => {
      // 尊重系统「减弱动态效果」设置：跳过动画
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      // Hero 文字渐出：标题逐字遮罩展开 → 副标题浮入 → 引用与按钮淡入
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
          {"PAK 应用肌动学".split("").map((char, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span className="inline-block hero-char">
                {char === " " ? " " : char}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-sub font-['Noto_Sans_SC',sans-serif] text-base lg:text-lg xl:text-xl text-accent mb-12">
          应用肌动学 - The Best Kept Secret in Healthcare
        </p>

        <div className="hero-rest relative w-full rounded-2xl border border-white/60 bg-white/35 px-8 py-8 lg:px-12 lg:py-10 shadow-lg shadow-accent/5 backdrop-blur-md mb-14">
          <div className="font-['Noto_Serif_SC',serif] text-xl lg:text-2xl xl:text-3xl leading-relaxed text-foreground">
           「应用运动机能学是一项可以基于知识、生理事实和可预测确定性来进行的。应该做，也能做到」
            <span className="block font-['Noto_Sans_SC',sans-serif] text-sm lg:text-base text-[#9B9B90] mt-5">
              —— 乔治·J·古德哈特，二世，D.C.，DIBAK
            </span>
          </div>
        </div>

        <div className="hero-rest flex flex-wrap gap-5 justify-center">
          <Magnetic>
            <Link
              to="/course"
              className="inline-flex items-center px-8 py-4 bg-foreground text-[#F5F5F0] font-['Noto_Sans_SC',sans-serif] text-sm lg:text-base font-medium rounded-sm hover:bg-[#333330] transition-colors duration-200"
            >
              了解 PAK
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              to="/course-center"
              className="inline-flex items-center px-8 py-4 border border-border text-foreground font-['Noto_Sans_SC',sans-serif] text-sm lg:text-base font-medium rounded-sm hover:bg-[#E6E6E0] transition-colors duration-200"
            >
              查看课程
            </Link>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Why PAK ──────────────────────────────────────────────────────────────────
function WhyPak() {
  return (
    <section className="whypak-section bg-[#E6E6E0] py-24 lg:py-36">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="whypak-left">
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-5">
              临床思维重构
            </p>
            <h2 className="font-['Noto_Serif_SC',serif] text-4xl lg:text-5xl font-semibold leading-[1.15] text-foreground mb-7">
              重新定义你的
              <br />
              临床诊疗路径
            </h2>
            <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed mb-6">
              应用肌动学（PAK）将人体视为结构、化学与心理三者相互交织的整体系统。
              传统诊疗往往只关注症状所在，而 PAK 让你能透过徒手肌肉测试，
              精准识别各系统之间的失衡关联，从而制定更有效的干预方案。
            </p>
            <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed mb-10">
              无论你是物理治疗师、整脊医生、自然疗法师还是全科医生，
              PAK 都能为你的临床工作带来全新的视角与工具。
            </p>
            <div className="flex flex-col gap-3">
              {[
                "结构层面：筋膜、关节与神经肌肉失衡评估",
                "化学层面：营养、毒素负荷与代谢功能检测",
                "心理层面：情绪模式对身体张力的影响分析",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent block" />
                  </span>
                  <span className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#4A4A45]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: text-based stats + key facts */}
          <div className="whypak-right flex flex-col gap-6">
            {[
              { num: "1964", label: "年由 Goodheart 博士创立" },
              { num: "60+", label: "年的临床研究与实践积累" },
              { num: "14", label: "个全球 ICAK 分会" },
              { num: "45+", label: "种常见病症的 PAK 诊疗方法" },
            ].map((stat) => (
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

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  {
    number: "01",
    title: "徒手肌肉测试",
    desc: "掌握标准化徒手肌肉测试技术，精确评估神经肌肉功能，识别机体失代偿模式，建立客观诊断指标。",
  },
  {
    number: "02",
    title: "损伤回忆技术 IRT",
    desc: "学习 IRT（Injury Recall Technique）解锁陈旧性损伤残留的神经抑制模式，恢复组织正常功能表达。",
  },
  {
    number: "03",
    title: "多疗法整合",
    desc: "将 PAK 与针灸、颅骶、营养医学等疗法深度整合，构建个性化、多维度的综合干预方案。",
  },
  {
    number: "04",
    title: "国际认证路径",
    desc: "完成 DÄGAK 规定的 240 学时（6 大模块）理论与实操培训，通过考核后即可获得 ICAK 国际认证资格。",
  },
]

function Features() {
  return (
    <section className="features-section bg-[#F5F5F0] py-24 lg:py-36">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="features-head grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 mb-20 items-end">
          <h2 className="font-['Noto_Serif_SC',serif] text-4xl lg:text-5xl font-semibold leading-[1.15] text-foreground">
            健衡学园提供全方位、系统化的 PAK 认证培训体系
          </h2>
          <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed">
            从基础理论到高阶临床应用，每一个模块均由 DÄGAK 认证讲师设计，
            确保内容与国际最新临床标准保持同步，助力学员在真实诊疗情境中快速落地。
          </p>
        </div>

        <div className="feature-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {features.map((f) => (
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

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="cta-section bg-[#1C1C1A] py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="cta-reveal font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.2] text-[#F5F5F0] mb-5">
          准备好探索身体的智慧了吗？
        </h2>
        <p className="cta-reveal font-['Noto_Sans_SC',sans-serif] text-base text-[#9B9B90] mb-10 max-w-[520px] mx-auto leading-relaxed">
          加入 PAK 认证培训，与全国数百位优秀从业者一起，
          用应用肌动学为你的临床工作打开新的可能。
        </p>
        <Link
          to="/contact"
          className="cta-reveal inline-flex items-center px-8 py-4 bg-accent text-accent-foreground font-['Noto_Sans_SC',sans-serif] text-sm font-medium rounded-sm hover:bg-[#4A7F7B] transition-colors duration-200"
        >
          预约课程咨询
        </Link>
      </div>
    </section>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 尊重系统「减弱动态效果」设置：跳过动画
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
