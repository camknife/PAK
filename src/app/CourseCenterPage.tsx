import { useEffect, useState } from "react"
import { Link } from "react-router"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import ScrollReveal from "@/app/components/ScrollReveal"
import { fetchCourses } from "@/lib/courses"
import type { Course } from "@/types/course"

function Hero() {
  return (
    <section className="pt-32 lg:pt-40 pb-16 bg-[#E6E6E0]">
      <div className="max-w-[900px] mx-auto px-6">
        <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-6">
          课程中心
        </p>
        <h1 className="font-['Noto_Serif_SC',serif] text-5xl lg:text-6xl font-semibold leading-[1.12] text-foreground mb-6">
          2027 年线下课程排期
        </h1>
        <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed max-w-[600px]">
          线下实操与线上理论学习，系统掌握 PAK 技术。每期限额 24 人，选择适合你的城市与班次。
        </p>
        <p className="mt-4 inline-flex items-center gap-2 bg-white/60 border border-border rounded-sm px-4 py-2.5 text-sm font-['Noto_Sans_SC',sans-serif] text-[#4A4A45]">
          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
          所有课程支持单模块、双模块、四模块组合报名，具体详情请填写课程咨询单获取详情。
        </p>

        <div className="mt-6 bg-white/60 border border-border rounded-sm px-6 py-5">
          <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-3">
            报名权益
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex items-start gap-3 flex-1">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#4A4A45] leading-relaxed">
                <strong className="text-foreground font-medium">报名即送价值 5000 元线上预习课程（共 7 小时）</strong>，
                计入 PAK 认证课程 240 学时体系，面授前打好理论根基。
              </p>
            </div>
            <div className="flex items-start gap-3 flex-1">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#4A4A45] leading-relaxed">
                <strong className="text-foreground font-medium">报名即送中译文肌肉测试书籍</strong>，
                配套预习与面授学习使用。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function statusBadge(status: Course["status"]) {
  switch (status) {
    case "open":
      return { text: "开放报名", className: "bg-[#d1fae5] text-[#065f46]" }
    case "upcoming":
      return { text: "即将开放", className: "bg-[#dbeafe] text-[#1e40af]" }
    case "closed":
      return { text: "报名已截止", className: "bg-[#f3f4f6] text-[#6b7280]" }
  }
}

function actionButton(status: Course["status"]) {
  switch (status) {
    case "open":
      return { text: "立即报名", className: "bg-accent text-accent-foreground hover:bg-[#4A7F7B]" }
    case "upcoming":
      return { text: "即将开放报名", className: "border border-border text-[#6B6B62] hover:bg-[#E6E6E0]" }
    case "closed":
      return { text: "报名已截止", className: "border border-border text-[#9B9B90] cursor-not-allowed" }
  }
}

function LoadingState() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[900px] mx-auto px-6 flex justify-center">
        <div className="flex items-center gap-3 text-[#6B6B62]">
          <span className="inline-block w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="font-['Noto_Sans_SC',sans-serif] text-sm">课程加载中…</span>
        </div>
      </div>
    </section>
  )
}

function ErrorState() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] mb-6">
          课程加载失败，请联系咨询。
        </p>
        <div className="relative inline-block group">
          <button
            type="button"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-sm bg-accent text-accent-foreground hover:bg-[#4A7F7B] transition-colors duration-200"
          >
            课程咨询
          </button>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 hidden group-hover:block z-10">
            <div className="bg-white border border-border rounded-sm shadow-lg p-2 w-40">
              <img
                src="/assets/微信公众号.png"
                alt="微信公众号"
                className="w-full h-auto"
              />
              <p className="text-xs text-center text-[#6B6B62] mt-1">扫码关注咨询</p>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-white border-r border-b border-border rotate-45 -mt-1" />
          </div>
        </div>
      </div>
    </section>
  )
}

function EmptyState() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62]">
          暂无开放课程，敬请期待。
        </p>
      </div>
    </section>
  )
}

function CourseSchedule() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetchCourses()
      .then((res) => {
        if (cancelled) return
        setCourses(res.data)
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <LoadingState />
  if (error) return <ErrorState />
  if (courses.length === 0) return <EmptyState />

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="flex flex-col gap-6">
          {courses.map((c) => {
            const badge = statusBadge(c.status)
            const action = actionButton(c.status)
            return (
              <div
                key={c.name}
                className="bg-[#F5F5F0] border border-border rounded-sm p-6 hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-['Noto_Serif_SC',serif] text-lg font-semibold text-foreground">
                      {c.name}
                    </h3>
                    {c.module && (
                      <span className="inline-flex px-3 py-1 rounded-sm bg-[#4A7F7B] text-white text-xs font-semibold whitespace-nowrap">
                        {c.module}
                      </span>
                    )}
                  </div>
                  <span
                    className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-semibold ${badge.className}`}
                  >
                    {badge.text}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
                  <div className="text-sm text-[#6B6B62]">
                    <span className="text-[#9B9B90]">讲师：</span>{c.instructor}
                  </div>
                  <div className="text-sm text-[#6B6B62]">
                    <span className="text-[#9B9B90]">地点：</span>{c.location}
                  </div>
                  <div className="text-sm text-[#6B6B62]">
                    <span className="text-[#9B9B90]">开课时间：</span>{c.time}
                  </div>
                  <div className="text-sm text-[#6B6B62]">
                    <span className="text-[#9B9B90]">名额：</span>限{c.seats}人
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-5">
                  <span className="font-['Noto_Serif_SC',serif] text-2xl font-bold text-accent">
                    {c.price}
                  </span>
                  {c.singlePrice && (
                    <span className="text-sm text-[#6B6B62]">
                      单模块 {c.singlePrice}
                    </span>
                  )}
                  {c.earlyBird && (
                    <span className="inline-flex px-3 py-1 bg-[#d1fae5] text-[#065f46] text-sm font-semibold rounded">
                      早鸟价 {c.earlyBird}
                    </span>
                  )}
                  <span className="text-sm text-[#6B6B62]">剩余名额：{c.seats}</span>
                </div>

                <div className="flex gap-3">
                  {c.status === "closed" ? (
                    <span className={`inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-sm ${action.className}`}>
                      {action.text}
                    </span>
                  ) : (
                    <Link
                      to="/contact"
                      className={`inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-sm transition-colors duration-200 ${action.className}`}
                    >
                      {action.text}
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function CourseCenterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-['Noto_Sans_SC',sans-serif] overflow-x-hidden">
      <Navbar />
      <main>
        <ScrollReveal>
          <Hero />
        </ScrollReveal>
        <ScrollReveal>
          <CourseSchedule />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}
