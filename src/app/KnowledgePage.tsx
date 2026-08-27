import { useMemo, useState } from "react"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import ScrollReveal from "@/app/components/ScrollReveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion"
import {
  kbCategories,
  type CategoryKey,
  kbItems,
  kbDescriptions,
} from "@/data/knowledge"

export default function KnowledgePage() {
  const [category, setCategory] = useState<CategoryKey>("lower")
  const [query, setQuery] = useState("")

  const filteredItems = useMemo(() => {
    const list = kbItems[category]
    if (!query.trim()) return list
    const q = query.trim().toLowerCase()
    return list.filter((name) => name.toLowerCase().includes(q))
  }, [category, query])

  return (
    <div className="min-h-screen bg-background text-foreground font-['Noto_Sans_SC',sans-serif] overflow-x-hidden">
      <Navbar />

      <main>
        {/* Hero */}
        <ScrollReveal>
          <section className="pt-32 lg:pt-40 pb-16">
            <div className="max-w-[1200px] mx-auto px-6">
              <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-6">
                PAK Knowledge Base
              </p>
              <h1 className="font-['Noto_Serif_SC',serif] text-5xl lg:text-6xl font-semibold leading-[1.12] text-foreground mb-6">
                PAK知识库
              </h1>
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed max-w-[620px]">
                45种常见病症的PAK诊疗方法
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Search & Categories */}
        <section className="pb-8">
          <div className="max-w-[1200px] mx-auto px-6">
            <ScrollReveal>
              <div className="max-w-xl mx-auto mb-10">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索疾病名称..."
                  className="w-full px-5 py-3 bg-[#F5F5F0] border border-border rounded-sm font-['Noto_Sans_SC',sans-serif] text-sm text-foreground placeholder:text-[#9B9B90] focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                {kbCategories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setCategory(cat.key)
                      setQuery("")
                    }}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      category === cat.key
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-[#F5F5F0] text-[#6B6B62] border-border hover:border-accent/40 hover:text-foreground"
                    }`}
                  >
                    {cat.label} <span className="opacity-70">({cat.count})</span>
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Accordion */}
        <section className="pb-24 lg:pb-36">
          <div className="max-w-[1200px] mx-auto px-6">
            <ScrollReveal>
              {filteredItems.length === 0 ? (
                <div className="text-center py-16 text-[#9B9B90] font-['Noto_Sans_SC',sans-serif] text-sm">
                  没有找到匹配的疾病
                </div>
              ) : (
                <Accordion type="single" collapsible className="space-y-3">
                  {filteredItems.map((name) => {
                    const desc = kbDescriptions[name]
                    return (
                      <AccordionItem
                        key={name}
                        value={name}
                        className="bg-[#F5F5F0] border border-border rounded-sm px-6 data-[state=open]:shadow-sm"
                      >
                        <AccordionTrigger className="font-['Noto_Serif_SC',serif] text-base font-semibold text-foreground hover:no-underline py-4">
                          {name}
                        </AccordionTrigger>
                        <AccordionContent>
                          {desc ? (
                            <div className="grid sm:grid-cols-2 gap-4 pb-2">
                              <Field label="症状" text={desc.symptoms} />
                              <Field label="描述" text={desc.desc} />
                              <Field label="原因" text={desc.reason} />
                              <Field label="标准治疗" text={desc.standard} />
                              <div className="sm:col-span-2">
                                <Field label="PAK方法" text={desc.ak} />
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-[#9B9B90] pb-2">
                              暂无详细资料
                            </p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              )}
            </ScrollReveal>

            <ScrollReveal>
              <div className="mt-12 p-6 bg-[#fef3c7] border border-[#fde68a] rounded-sm text-center">
                <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#92400e] leading-relaxed">
                  AK应用肌动学为辅助诊断与治疗方法，不能替代专业医疗诊断。如有健康问题，请咨询专业医生。
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function Field({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <h4 className="font-['Noto_Sans_SC',sans-serif] text-sm font-semibold text-accent mb-1">
        {label}
      </h4>
      <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#4A4A45] leading-relaxed">
        {text}
      </p>
    </div>
  )
}
