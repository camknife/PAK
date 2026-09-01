import { useState } from "react"
import { Link, useLocation } from "react-router"
import Magnetic from "@/app/components/Magnetic"

const links = [
  { label: "首页", href: "/" },
  { label: "关于PAK", href: "/course" },
  { label: "课程中心", href: "/course-center" },
  { label: "学员课堂", href: "/student-scenes" },
  { label: "PAK知识库", href: "/knowledge" },
  // { label: "PAK治疗师目录", href: "/pak-union" }, // 治疗师目录模块暂缓，砍掉前端入口
  { label: "学习资料", href: "/research" },
  { label: "FAQ问答", href: "/faq" },
]

// 英文模式导航：首页 + 关于PAK + FAQ（Hans 批注定稿页面，逐页扩展）
const enLinks = [
  { label: "Home", href: "/en" },
  { label: "About PAK", href: "/en/course" },
  { label: "Learning Materials", href: "/en/research" },
  { label: "FAQ", href: "/en/faq" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isActive = (href: string) =>
    href.startsWith("/") && location.pathname === href

  // 语言切换：当前是否在英文版（/en 前缀）
  const isEn = location.pathname.startsWith("/en")

  // 当前语言模式的导航链接（英文只显示两页，中文显示全部）
  const navLinks = isEn ? enLinks : links

  // 中/英互切目标：英文首页↔中文首页、英文About↔中文About，其余英文页回中文首页
  const langTarget = isEn
    ? location.pathname === "/en/course"
      ? "/course"
      : "/"
    : location.pathname === "/course"
      ? "/en/course"
      : "/en"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F0]/95 backdrop-blur-sm border-b border-border relative">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to={isEn ? "/en" : "/"}
          className="flex-shrink-0 flex items-center gap-3"
        >
          <div className="bg-[#4A7F7B] rounded-sm flex items-center justify-center py-2 px-3">
            <img
              src="/assets/0001_icak_logo.png"
              alt="ICAK"
              className="h-10 w-auto"
            />
          </div>
          <div className="w-px h-5 bg-border" />
          <img
            src="/assets/LOGO_健衡学园.png"
            alt="健衡学园"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav：英文模式两标签绝对居中，中文模式默认布局 */}
        <nav className={`hidden md:flex items-center gap-8 ${isEn ? "absolute left-1/2 -translate-x-1/2" : ""}`}>
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-['Noto_Sans_SC',sans-serif] font-normal transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-[#6B6B62] hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-['Noto_Sans_SC',sans-serif] font-normal text-[#6B6B62] hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Right actions: language toggle + CTA（包在同一容器，gap 分隔） */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to={langTarget}
            className="inline-flex items-center px-3 py-2 text-sm font-['Noto_Sans_SC',sans-serif] font-medium rounded-sm border border-border text-[#6B6B62] hover:text-foreground hover:bg-[#E6E6E0] transition-colors duration-200"
          >
            {isEn ? "中文" : "EN"}
          </Link>
          <Magnetic>
            <Link
              to={isEn ? "/en/contact" : "/contact"}
              className={`inline-flex items-center px-5 py-2.5 text-sm font-['Noto_Sans_SC',sans-serif] font-medium rounded-sm transition-colors duration-200 ${
                isActive(isEn ? "/en/contact" : "/contact")
                  ? "bg-[#4A7F7B] text-accent-foreground"
                  : "bg-accent text-accent-foreground hover:bg-[#4A7F7B]"
              }`}
            >
              {isEn ? "Course Consultation" : "课程咨询"}
            </Link>
          </Magnetic>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.5" />
                <line x1="3" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <line x1="3" y1="17" x2="19" y2="17" stroke="currentColor" strokeWidth="1.5" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#F5F5F0] border-t border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-['Noto_Sans_SC',sans-serif] transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-foreground font-medium"
                    : "text-[#6B6B62]"
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-['Noto_Sans_SC',sans-serif] text-[#6B6B62]"
              >
                {link.label}
              </a>
            )
          )}
          <Link
            to={langTarget}
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-border text-foreground text-sm font-['Noto_Sans_SC',sans-serif] font-medium rounded-sm"
          >
            {isEn ? "切换到中文" : "Switch to English"}
          </Link>
          <Link
            to={isEn ? "/en/contact" : "/contact"}
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-accent text-accent-foreground text-sm font-['Noto_Sans_SC',sans-serif] font-medium rounded-sm"
          >
            {isEn ? "Course Consultation" : "课程咨询"}
          </Link>
        </div>
      )}
    </header>
  )
}
