import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

gsap.registerPlugin(useGSAP)

const TERMS = [
  "应用肌动学",
  "健康金三角",
  "徒手肌肉测试",
  "DÄGAK",
  "ICAK",
  "结构 · 化学 · 心理",
]

// 无限滚动的关键词跑马灯（无首尾衔接缝隙）
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      // 两份相同内容，xPercent -50 恰好平移一份宽度 → 无缝循环
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 28,
        repeat: -1,
      })
    },
    { scope: trackRef }
  )

  const copy = (
    <div className="flex shrink-0 items-center">
      {TERMS.map((t) => (
        <span key={t} className="flex items-center">
          <span className="font-['Noto_Sans_SC',sans-serif] text-sm tracking-[0.25em] uppercase text-[#4A4A45] whitespace-nowrap">
            {t}
          </span>
          <span className="mx-8 text-[#4A7F7B]">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="overflow-hidden border-y border-border bg-[#E6E6E0] py-4">
      <div ref={trackRef} className="flex w-max">
        {copy}
        {copy}
      </div>
    </div>
  )
}
