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

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isActive = (href: string) =>
    href.startsWith("/") && location.pathname === href

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F0]/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) =>
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

        {/* CTA */}
        <div className="hidden md:block">
          <Magnetic>
            <Link
              to="/contact"
              className={`inline-flex items-center px-5 py-2.5 text-sm font-['Noto_Sans_SC',sans-serif] font-medium rounded-sm transition-colors duration-200 ${
                isActive("/contact")
                  ? "bg-[#4A7F7B] text-accent-foreground"
                  : "bg-accent text-accent-foreground hover:bg-[#4A7F7B]"
              }`}
            >
              课程咨询
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
          {links.map((link) =>
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
            to="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-accent text-accent-foreground text-sm font-['Noto_Sans_SC',sans-serif] font-medium rounded-sm"
          >
            课程咨询
          </Link>
        </div>
      )}
    </header>
  )
}
