import { lazy, Suspense, useLayoutEffect } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route, useLocation } from "react-router"
import CustomCursor from "./app/components/CustomCursor.tsx"
import SmoothScroll from "./app/components/SmoothScroll.tsx"
import { usePageMeta } from "./app/components/usePageMeta.ts"
import "./styles/index.css"

// ─── 路由级代码分割：每个页面独立 chunk，按需加载 ────────────────────────────
const App = lazy(() => import("./app/App.tsx"))
const CoursePage = lazy(() => import("./app/CoursePage.tsx"))
const EnHomePage = lazy(() => import("./app/EnHomePage.tsx"))
const EnAboutPage = lazy(() => import("./app/EnAboutPage.tsx"))
const EnContactPage = lazy(() => import("./app/EnContactPage.tsx"))
const EnLiteraturePage = lazy(() => import("./app/EnLiteraturePage.tsx"))
const EnFaqPage = lazy(() => import("./app/EnFaqPage.tsx"))
// const AlumniPage = lazy(() => import("./app/AlumniPage.tsx")) // 治疗师目录模块暂缓
const FaqPage = lazy(() => import("./app/FaqPage.tsx"))
const ContactPage = lazy(() => import("./app/ContactPage.tsx"))
const LiteraturePage = lazy(() => import("./app/LiteraturePage.tsx"))
const StudentScenesPage = lazy(() => import("./app/StudentScenesPage.tsx"))
const CourseCenterPage = lazy(() => import("./app/CourseCenterPage.tsx"))
const KnowledgePage = lazy(() => import("./app/KnowledgePage.tsx"))

// 禁用浏览器默认的滚动恢复，统一由 ScrollToTop 控制
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual"
}

// 路由切换时始终回到页面顶部。
// 用 useLayoutEffect（绘制前执行）+ 放在 <Routes> 之前挂载，
// 保证先重置滚动位置，再进入页面，避免读到旧位置产生跳变。
function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// 页面 chunk 加载时的占位（极简，与站点风格一致）
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
      <div className="w-6 h-6 rounded-full border-2 border-[#4A7F7B]/30 border-t-[#4A7F7B] animate-spin" />
    </div>
  )
}

// ─── 路由级 SEO meta：每路由 title/description，随路由切换更新 ────────────
const DEFAULT_TITLE = "健衡学园 | PAK应用肌动学国际认证培训"

const PAGE_META: Record<string, { title: string; description?: string }> = {
  "/": {
    title: "健衡学园 | PAK应用肌动学国际认证培训",
    description:
      "健衡学园独家引进ICAK国际应用肌动学（Applied Kinesiology）中文培训体系。提供PAK线下模块课程、PAK线上预习、国际认证培训。",
  },
  "/course": {
    title: "关于PAK | 什么是应用肌动学 - 健衡学园",
    description:
      "应用肌动学（AK/PAK）是以徒手肌肉测试为核心诊断工具的整合性临床评估体系，1964年由George Goodheart创立，从结构、化学、心理三个维度评估人体失衡。",
  },
  // "/pak-union": {
  //   title: "PAK治疗师目录 - 健衡学园",
  //   description:
  //     "健衡学园PAK治疗师目录：收录经PAK应用肌动学认证培训的治疗师，覆盖康复、物理治疗、功能医学等领域。",
  // }, // 治疗师目录模块暂缓
  "/faq": {
    title: "FAQ问答 | 关于PAK与课程 - 健衡学园",
    description: "关于应用肌动学（PAK）、课程体系、认证路径、临床技术、学习方式的常见问题解答。",
  },
  "/contact": {
    title: "课程咨询 - 健衡学园",
    description: "健衡学园PAK应用肌动学课程咨询：预约了解PAK线下模块课程、PAK线上预习与国际认证培训。",
  },
  "/research": {
    title: "学习资料 | PAK文献 - 健衡学园",
    description: "应用肌动学（PAK）相关文献与学习资料汇总。",
  },
  "/student-scenes": {
    title: "学员课堂 - 健衡学园",
    description: "健衡学园学员课堂：PAK应用肌动学培训课堂实拍与学员风采。",
  },
  "/course-center": {
    title: "课程中心 - 健衡学园",
    description: "健衡学园课程中心：PAK应用肌动学线下模块课程、PAK线上预习、国际认证培训体系。",
  },
  "/knowledge": {
    title: "PAK知识库 | 45种常见病症的PAK诊疗方法 - 健衡学园",
    description:
      "PAK知识库：45种常见病症的PAK诊疗方法，从症状、原因、标准治疗到PAK评估视角，系统了解应用肌动学。",
  },
  // 英文版（Hans 批注定稿）
  "/en": {
    title: "PAK Applied Kinesiology | Active and Balanced Physiotherapy Academy",
    description:
      "Professional Applied Kinesiology (PAK) certification training. Learn manual muscle testing, the Golden Triangle of Health, and the international certification path with ICAK/DÄGAK certified courses.",
  },
  "/en/course": {
    title: "About PAK | What is Applied Kinesiology - Active and Balanced Physiotherapy Academy",
    description:
      "Applied Kinesiology (AK/PAK) is a holistic clinical assessment system founded by Dr. George Goodheart in 1964, using manual muscle testing to evaluate the structure, chemistry and psychology dimensions of health.",
  },
  "/en/contact": {
    title: "Course Consultation - Active and Balanced Physiotherapy Academy",
    description:
      "Book a course consultation for PAK Applied Kinesiology certification training modules, online preparatory courses and international certification.",
  },
  "/en/faq": {
    title: "FAQ | About PAK & Courses - Active and Balanced Physiotherapy Academy",
    description:
      "Answers to common questions about Applied Kinesiology (PAK), the course system, certification path, clinical techniques and registration.",
  },
}

// 路由切换时同步 title / description / canonical
function RouteMeta() {
  const { pathname } = useLocation()
  const meta = PAGE_META[pathname]
  usePageMeta(meta?.title ?? DEFAULT_TITLE, meta?.description)
  return null
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <RouteMeta />
    <SmoothScroll />
    <CustomCursor />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* 英文版（Hans 批注定稿） */}
        <Route path="/en" element={<EnHomePage />} />
        <Route path="/en/course" element={<EnAboutPage />} />
        <Route path="/en/contact" element={<EnContactPage />} />
        <Route path="/en/research" element={<EnLiteraturePage />} />
        <Route path="/en/faq" element={<EnFaqPage />} />
        {/* 中文版 */}
        <Route path="/" element={<App />} />
        <Route path="/course" element={<CoursePage />} />
        {/* <Route path="/pak-union" element={<AlumniPage />} /> // 治疗师目录模块暂缓 */}
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/research" element={<LiteraturePage />} />
        <Route path="/student-scenes" element={<StudentScenesPage />} />
        <Route path="/course-center" element={<CourseCenterPage />} />
        <Route path="/knowledge" element={<KnowledgePage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
)
