import { useState, useMemo } from "react"
import enFaqData from "@/data/en-faq"
import type { FAQItem } from "@/data/faq-types"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"

function highlightText(text: string, query: string): string {
  if (!query.trim()) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return text.replace(
    new RegExp(`(${escaped})`, "gi"),
    "<mark class='bg-accent/25 text-foreground rounded-sm px-0.5'>$1</mark>"
  )
}

// 英文版 FAQ（与中文 FaqSection 交互一致，UI 文案英文化）
export default function EnFaqSection() {
  const [activeCategory, setActiveCategory] = useState(enFaqData[0]?.id ?? "")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const currentCategory = useMemo(
    () => enFaqData.find((c) => c.id === activeCategory) ?? enFaqData[0],
    [activeCategory]
  )

  const filteredItems: FAQItem[] = useMemo(() => {
    if (!searchQuery.trim()) return currentCategory.items
    const q = searchQuery.toLowerCase()
    const allItems = searchQuery.trim()
      ? enFaqData.flatMap((c) => c.items)
      : currentCategory.items
    return allItems.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
    )
  }, [searchQuery, currentCategory])

  const relatedById = useMemo(() => {
    const map = new Map<string, FAQItem>()
    enFaqData.forEach((c) => c.items.forEach((item) => map.set(item.id, item)))
    return map
  }, [])

  const handleRelatedClick = (rid: string) => {
    const cat = enFaqData.find((c) => c.items.some((i) => i.id === rid))
    if (cat) setActiveCategory(cat.id)
    setSearchQuery("")
    setExpandedItems((prev) => (prev.includes(rid) ? prev : [...prev, rid]))
  }

  return (
    <section id="faq" className="max-w-[1200px] mx-auto px-6 py-24 lg:py-36">
      {/* Header */}
      <div className="mb-14">
        <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-4">
          FAQ
        </p>
        <h2 className="font-['Noto_Serif_SC',serif] text-4xl lg:text-5xl font-semibold leading-[1.15] text-foreground mb-5">
          Everything you want to know about PAK
        </h2>
        <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed max-w-[560px]">
          From core concepts to the certification path, from clinical techniques to registration
          and consultation — we have compiled the questions students ask most often, to help you
          quickly understand Applied Kinesiology.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-10 max-w-[520px]">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9B9B90]"
          width="16" height="16" viewBox="0 0 16 16" fill="none"
        >
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
          <line x1="11" y1="11" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <Input
          type="text"
          placeholder="Search keywords, e.g. certification, muscle testing, fee..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 h-12 bg-[#EEEEE9] border-border text-sm font-['Noto_Sans_SC',sans-serif] placeholder:text-[#9B9B90] focus-visible:ring-accent rounded-sm"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-12 border-b border-border pb-4">
        {enFaqData.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setSearchQuery("") }}
            className={`px-4 py-2 font-['Noto_Sans_SC',sans-serif] text-sm rounded-sm transition-colors duration-200 ${
              activeCategory === cat.id
                ? "bg-foreground text-[#F5F5F0]"
                : "text-[#6B6B62] hover:text-foreground hover:bg-[#E6E6E0]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Category desc */}
      {!searchQuery.trim() && (
        <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62] mb-8">
          {currentCategory.description}
        </p>
      )}

      {/* Search result count */}
      {searchQuery.trim() && (
        <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62] mb-8">
          {filteredItems.length} related question{filteredItems.length === 1 ? "" : "s"} found for "{searchQuery}"
          {filteredItems.length === 0 && ", please try other keywords"}
        </p>
      )}

      {/* FAQ Accordion */}
      {filteredItems.length > 0 && (
        <Accordion
          type="multiple"
          value={expandedItems}
          onValueChange={setExpandedItems}
          className="border border-border divide-y divide-border"
        >
          {filteredItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-0">
              <AccordionTrigger className="px-8 py-5 hover:bg-[#E6E6E0]/50 transition-colors duration-150 font-['Noto_Sans_SC',sans-serif] text-base font-medium text-foreground hover:no-underline data-[state=open]:bg-[#E6E6E0]/40">
                <span
                  className="text-left"
                  dangerouslySetInnerHTML={{
                    __html: searchQuery.trim() ? highlightText(item.question, searchQuery) : item.question,
                  }}
                />
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 pt-2">
                <div className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#4A4A45] leading-relaxed whitespace-pre-line">
                  {item.answer}
                </div>

                {/* Keywords */}
                {item.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {item.keywords.map((kw) => (
                      <Badge
                        key={kw} variant="secondary"
                        className="font-['Noto_Sans_SC',sans-serif] text-xs cursor-pointer hover:bg-accent/20 transition-colors rounded-sm"
                        onClick={() => setSearchQuery(kw)}
                      >
                        {kw}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Related questions */}
                {item.related.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-border/60">
                    <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium text-[#9B9B90] mb-3">Related questions</p>
                    <div className="flex flex-wrap gap-2">
                      {item.related.map((rid) => {
                        const related = relatedById.get(rid)
                        if (!related) return null
                        return (
                          <button
                            key={rid}
                            className="font-['Noto_Sans_SC',sans-serif] text-xs text-accent hover:text-[#4A7B77] underline underline-offset-2 transition-colors text-left"
                            onClick={() => handleRelatedClick(rid)}
                          >
                            {related.question}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <p className="font-['Noto_Sans_SC',sans-serif] text-[#9B9B90] text-base mb-4">
            No questions found matching "{searchQuery}"
          </p>
          <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#B0B0A8]">
            Try searching: certification, muscle testing, fee, chronic pain
          </p>
        </div>
      )}
    </section>
  )
}
