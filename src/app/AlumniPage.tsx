import { useState, useMemo } from "react"
import { Link } from "react-router"
import therapists from "@/data/therapists"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"

const stats = [
  { value: therapists.length, unit: "位", label: "认证治疗师" },
  {
    value: new Set(therapists.map((t) => t.city).filter(Boolean)).size,
    unit: "座",
    label: "覆盖城市",
  },
  {
    value: new Set(therapists.map((t) => t.business).filter(Boolean)).size,
    unit: "个",
    label: "执业领域",
  },
]

// ─── Therapist Card ───────────────────────────────────────────────────────────
function TherapistCard({ therapist }: { therapist: typeof therapists[0] }) {
  const [detailOpen, setDetailOpen] = useState(false)

  return (
    <>
      <div className="bg-[#EEEEE9] border border-border p-6 flex flex-col gap-4 hover:border-accent/40 transition-colors duration-200 group rounded-sm">
        {/* Avatar + name row */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
            <span className="font-['Noto_Serif_SC',serif] text-lg font-semibold text-accent">
              {therapist.name.slice(0, 1)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-['Noto_Sans_SC',sans-serif] text-sm font-semibold text-foreground truncate">
              {therapist.name}
            </p>
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs text-[#6B6B62] truncate">
              {therapist.business || "—"}{therapist.city ? ` · ${therapist.city}` : ""}
            </p>
          </div>
        </div>

        {/* Unit as bio */}
        <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#4A4A45] leading-relaxed flex-1 line-clamp-4">
          {therapist.unit || "暂无单位信息"}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {therapist.city && (
            <span className="font-['Noto_Sans_SC',sans-serif] text-[11px] text-[#6B6B62] bg-[#F5F5F0] border border-border/50 px-2 py-0.5 rounded-sm">
              {therapist.city}
            </span>
          )}
          {therapist.business && (
            <span className="font-['Noto_Sans_SC',sans-serif] text-[11px] text-[#6B6B62] bg-[#F5F5F0] border border-border/50 px-2 py-0.5 rounded-sm">
              {therapist.business}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/40">
          <div className="flex items-center gap-3 text-[11px] font-['Noto_Sans_SC',sans-serif] text-[#9B9B90]">
            {therapist.phone ? (
              <a href={`tel:${therapist.phone}`} className="hover:text-foreground transition-colors">
                {therapist.phone}
              </a>
            ) : (
              <span>暂无电话</span>
            )}
          </div>
          <button
            onClick={() => setDetailOpen(true)}
            className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium text-[#6B6B62] hover:text-foreground transition-colors underline underline-offset-2"
          >
            详情
          </button>
        </div>
      </div>

      {detailOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1C1A]/60 backdrop-blur-sm p-6">
          <div className="bg-[#F5F5F0] border border-border max-w-[520px] w-full rounded-sm relative overflow-hidden">
            <div className="bg-[#E6E6E0] px-8 py-6 border-b border-border">
              <button
                onClick={() => setDetailOpen(false)}
                className="absolute top-4 right-4 text-[#9B9B90] hover:text-foreground transition-colors"
                aria-label="关闭"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                  <span className="font-['Noto_Serif_SC',serif] text-xl font-semibold text-accent">
                    {therapist.name.slice(0, 1)}
                  </span>
                </div>
                <div>
                  <p className="font-['Noto_Serif_SC',serif] text-xl font-semibold text-foreground">
                    {therapist.name}
                  </p>
                  {therapist.business && (
                    <p className="font-['Noto_Sans_SC',sans-serif] text-xs text-[#6B6B62] mt-0.5">
                      {therapist.business}{therapist.city ? ` · ${therapist.city}` : ""}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="px-8 py-6 space-y-5">
              {[
                { label: "姓名", value: therapist.name },
                therapist.business && { label: "职业", value: therapist.business },
                therapist.unit && { label: "工作单位", value: therapist.unit },
                therapist.city && { label: "城市", value: therapist.city },
                therapist.phone && { label: "联系电话", value: therapist.phone },
                therapist.email && { label: "邮箱", value: therapist.email },
              ].filter(Boolean).map((field) => (
                <div key={field!.label} className="flex flex-col gap-1.5">
                  <label className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.05em] text-[#9B9B90]">
                    {field!.label}
                  </label>
                  {field!.label === "联系电话" && field!.value ? (
                    <a href={`tel:${field!.value}`} className="font-['Noto_Sans_SC',sans-serif] text-sm text-accent hover:text-[#4A7F7B] transition-colors">
                      {field!.value}
                    </a>
                  ) : field!.label === "邮箱" && field!.value ? (
                    <a href={`mailto:${field!.value}`} className="font-['Noto_Sans_SC',sans-serif] text-sm text-accent hover:text-[#4A7F7B] transition-colors break-all">
                      {field!.value}
                    </a>
                  ) : (
                    <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-foreground">{field!.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="px-8 py-4 border-t border-border bg-[#EEEEE9]">
              <button
                onClick={() => setDetailOpen(false)}
                className="w-full bg-foreground text-[#F5F5F0] font-['Noto_Sans_SC',sans-serif] text-sm font-medium py-3 rounded-sm hover:bg-[#333330] transition-colors duration-200"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AlumniPage() {
  const [search, setSearch] = useState("")
  const [cityFilter, setCityFilter] = useState("")

  // Therapist cities
  const cities = useMemo(() => {
    return [...new Set(therapists.map((t) => t.city).filter(Boolean))].sort()
  }, [])

  // Therapist filtered data
  const filteredTherapists = useMemo(() => {
    let result = therapists
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (t) => t.name.toLowerCase().includes(q) || t.city.toLowerCase().includes(q) || t.business.toLowerCase().includes(q)
      )
    }
    if (cityFilter) {
      result = result.filter((t) => t.city === cityFilter)
    }
    return result
  }, [search, cityFilter])

  return (
    <div className="min-h-screen bg-background text-foreground font-['Noto_Sans_SC',sans-serif] overflow-x-hidden">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="pt-32 lg:pt-40 pb-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-6">
              PAK 联盟 · 治疗师目录
            </p>
            <h1 className="font-['Noto_Serif_SC',serif] text-5xl lg:text-6xl font-semibold leading-[1.12] text-foreground mb-6">
              全国 PAK 认证治疗师
              <br />
              专业目录
            </h1>
            <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed max-w-[620px]">
              来自不同执业背景的治疗师将应用肌动学融入各自的专业领域。
              点击任意卡片查看详情，健衡学园将作为中间人为你对接——
              既是同行交流，也为往期学员带来更多获客机会。
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="pb-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-3 gap-px bg-border rounded-sm overflow-hidden">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-[#EEEEE9] px-6 py-7 text-center"
                >
                  <p className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold text-accent mb-1">
                    {s.value}
                    <span className="text-lg font-normal text-[#9B9B90] ml-1">
                      {s.unit}
                    </span>
                  </p>
                  <p className="font-['Noto_Sans_SC',sans-serif] text-xs text-[#6B6B62]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="pb-6">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                placeholder="搜索姓名、城市或执业领域..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 min-w-0 bg-white border border-border px-4 py-3 font-['Noto_Sans_SC',sans-serif] text-sm text-foreground placeholder:text-[#9B9B90] focus:outline-none focus:border-accent transition-colors rounded-sm"
              />
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="bg-white border border-border px-4 py-3 font-['Noto_Sans_SC',sans-serif] text-sm text-foreground focus:outline-none focus:border-accent transition-colors rounded-sm min-w-[140px]"
              >
                <option value="">全部城市</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <p className="font-['Noto_Sans_SC',sans-serif] text-xs text-[#9B9B90] mb-4">
              共 {filteredTherapists.length} 位治疗师
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 lg:pb-36">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTherapists.map((t) => (
                <TherapistCard key={t.id} therapist={t} />
              ))}
              {filteredTherapists.length === 0 && (
                <div className="col-span-full text-center py-12 text-[#9B9B90] text-sm">
                  没有找到匹配的治疗师
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#E6E6E0] py-20 lg:py-28">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.2] text-foreground mb-5">
              成为下一个故事的主角
            </h2>
            <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] mb-10 max-w-[520px] mx-auto leading-relaxed">
              加入 PAK 认证培训，与全国数百位优秀从业者一起，
              用应用肌动学为你的临床工作打开新的可能。
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-accent text-accent-foreground font-['Noto_Sans_SC',sans-serif] text-sm font-medium rounded-sm hover:bg-[#4A7F7B] transition-colors duration-200"
            >
              预约课程咨询
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
