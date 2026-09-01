import { useState } from "react"
import { Link } from "react-router"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import ScrollReveal from "@/app/components/ScrollReveal"

const tabs = [
  { key: "all", label: "All" },
  { key: "video", label: "Videos" },
  { key: "ima", label: "ima Knowledge Base" },
]

const videos = [
  {
    title: "Injury Recall Technique (IRT) - Step 1",
    src: "https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/2026-08/%E6%8D%9F%E4%BC%A4%E5%9B%9E%E5%BF%86%E6%8A%80%E6%9C%AFIRT%E7%AC%AC%E4%B8%80%E4%B8%AA%E6%AD%A5%E9%AA%A4.mp4",
  },
  {
    title: "Contact Points",
    src: "https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/2026-08/%E8%A7%A6%E8%AF%8A%E7%82%B9.mp4",
  },
  {
    title: "Bladder & Kidney",
    src: "https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/2026-08/%E8%86%80%E8%83%B1%20%E8%82%BE.mp4",
  },
  // Hans Garten interview videos (added, hosted on OSS)
  {
    title: "Prof. Hans Garten Interview - Final I",
    src: "https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/Hans%E6%95%99%E6%8E%88%E9%87%87%E8%AE%BF/Hans%E6%95%99%E6%8E%88%20%E5%AE%9A%E7%A8%BF%E9%87%87%E8%AE%BF%E4%B8%80.mp4",
  },
  {
    title: "Prof. Hans Garten Interview I",
    src: "https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/Hans%E6%95%99%E6%8E%88%E9%87%87%E8%AE%BF/Hans%E6%95%99%E6%8E%88-1.mp4",
  },
  {
    title: "Prof. Hans Garten Interview II",
    src: "https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/Hans%E6%95%99%E6%8E%88%E9%87%87%E8%AE%BF/Hans%E6%95%99%E6%8E%88-2.mp4",
  },
  {
    title: "Prof. Hans Garten Interview III",
    src: "https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/Hans%E6%95%99%E6%8E%88%E9%87%87%E8%AE%BF/Hans%E6%95%99%E6%8E%88-3.mp4",
  },
  {
    title: "Prof. Hans Garten Interview IV",
    src: "https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/Hans%E6%95%99%E6%8E%88%E9%87%87%E8%AE%BF/Hans%E6%95%99%E6%8E%88-4.mp4",
  },
  {
    title: "Prof. Hans Garten Interview V",
    src: "https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/Hans%E6%95%99%E6%8E%88%E9%87%87%E8%AE%BF/Hans%E6%95%99%E6%8E%88-5.mp4",
  },
  {
    title: "Prof. Hans Garten Interview VI",
    src: "https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/Hans%E6%95%99%E6%8E%88%E9%87%87%E8%AE%BF/Hans%E6%95%99%E6%8E%88-6.mp4",
  },
  {
    title: "Prof. Hans Garten Interview VII",
    src: "https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/Hans%E6%95%99%E6%8E%88%E9%87%87%E8%AE%BF/Hans%E6%95%99%E6%8E%88-7.mp4",
  },
  {
    title: "Prof. Hans Garten Interview VIII",
    src: "https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/Hans%E6%95%99%E6%8E%88%E9%87%87%E8%AE%BF/Hans%E6%95%99%E6%8E%88-8.mp4",
  },
  {
    title: "Prof. Hans Garten Interview IX",
    src: "https://icak-website.oss-cn-hangzhou.aliyuncs.com/assets/videos/Hans%E6%95%99%E6%8E%88%E9%87%87%E8%AE%BF/Hans%E6%95%99%E6%8E%88-9.mp4",
  },
]

const imaImages = [
  { src: "/assets/ima下载.png", alt: "ima Download" },
  { src: "/assets/【PAK专业应用肌动学文献】知识码.png", alt: "PAK Literature Knowledge Code" },
]

export default function EnLiteraturePage() {
  const [activeTab, setActiveTab] = useState("all")
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground font-['Noto_Sans_SC',sans-serif] overflow-x-hidden">
      <Navbar />

      <main>
        {/* Hero */}
        <ScrollReveal>
          <section className="pt-32 lg:pt-40 pb-16">
            <div className="max-w-[1200px] mx-auto px-6">
              <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-6">
                Learning Resources
              </p>
              <h1 className="font-['Noto_Serif_SC',serif] text-5xl lg:text-6xl font-semibold leading-[1.12] text-foreground mb-6">
                Learning Materials
              </h1>
              <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed max-w-[620px]">
                Teaching videos and the ima knowledge base
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Tabs & Grid */}
        <section className="pb-24 lg:pb-36">
          <div className="max-w-[1200px] mx-auto px-6">
            <ScrollReveal>
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      activeTab === tab.key
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-[#F5F5F0] text-[#6B6B62] border-border hover:border-accent/40 hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {activeTab === "ima" ? (
              <div className="max-w-[1000px] mx-auto text-center">
                <ScrollReveal>
                  <h2 className="font-['Noto_Serif_SC',serif] text-4xl lg:text-5xl font-semibold leading-[1.15] text-foreground mb-5">
                    PAK Learning Library · Knowledge Assistant at Hand
                  </h2>
                  <p className="font-['Noto_Sans_SC',sans-serif] text-xl lg:text-2xl text-accent mb-12">
                    Put the PAK textbooks and 22 popular science booklets in your pocket
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.05}>
                  <div className="text-left bg-[#F5F5F0] border border-border rounded-sm p-10 lg:p-14 mb-8">
                    <h3 className="font-['Noto_Serif_SC',serif] text-2xl lg:text-3xl font-semibold text-foreground mb-5">
                      What is the ima knowledge base
                    </h3>
                    <p className="font-['Noto_Sans_SC',sans-serif] text-lg lg:text-xl text-[#6B6B62] leading-relaxed mb-8">
                      ima is an AI-powered knowledge management assistant by Tencent. We have organized all
                      of Active and Balanced Physiotherapy Academy's course materials into the library, so you can ask questions directly
                      via Q&A, or browse and search the original documents anytime — learning PAK has never been easier.
                    </p>

                    <h3 className="font-['Noto_Serif_SC',serif] text-2xl lg:text-3xl font-semibold text-foreground mb-5">
                      What's inside
                    </h3>
                    <p className="font-['Noto_Sans_SC',sans-serif] text-lg lg:text-xl text-[#6B6B62] leading-relaxed mb-4">
                      <strong className="text-foreground font-semibold">PAK textbooks</strong>
                      — systematic professional materials, from theory to clinical methods, searchable chapter by chapter;
                    </p>
                    <p className="font-['Noto_Sans_SC',sans-serif] text-lg lg:text-xl text-[#6B6B62] leading-relaxed mb-10">
                      <strong className="text-foreground font-semibold">PAK popular science booklets</strong>
                      — 22 PDF booklets that explain muscle testing, structure and treatment logic in plain language,
                      accessible even to beginners.
                    </p>

                    <ul className="flex flex-col gap-4 font-['Noto_Sans_SC',sans-serif] text-lg lg:text-xl text-[#4A4A45]">
                      <li>Textbooks + booklets in one place, covering both professional and beginner levels</li>
                      <li>AI Q&A answers your PAK questions anytime</li>
                      <li>Accessible on phone or computer — learning materials always with you</li>
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <p className="font-['Noto_Serif_SC',serif] text-xl lg:text-2xl text-foreground mb-10">
                    Scan to join the knowledge base and start your PAK learning journey
                  </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {imaImages.map((img, i) => (
                    <ScrollReveal key={img.src} delay={i * 0.05}>
                      <a
                        href={img.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-[#F5F5F0] border border-border rounded-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      >
                        <div className="aspect-[4/3] w-full bg-[#E6E6E0] flex items-center justify-center p-6">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <p className="px-5 py-4 font-['Noto_Sans_SC',sans-serif] text-base lg:text-lg text-[#6B6B62] text-center">
                          {img.alt}
                        </p>
                      </a>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, i) => (
                  <ScrollReveal key={video.title} delay={i * 0.05}>
                    <button
                      onClick={() => setPlayingVideo(video.src)}
                      className="w-full text-left bg-[#F5F5F0] border border-border rounded-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                    >
                      <div className="relative aspect-video w-full bg-[#E6E6E0] overflow-hidden">
                        <video
                          src={`${video.src}#t=0.5`}
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors duration-300">
                          <span className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                      </div>
                      <div className="px-5 py-4">
                        <h3 className="font-['Noto_Serif_SC',serif] text-lg font-semibold text-foreground mb-1">
                          {video.title}
                        </h3>
                        <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#9B9B90]">Source: ICAK</p>
                      </div>
                    </button>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#E6E6E0] py-20 lg:py-28">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h2 className="font-['Noto_Serif_SC',serif] text-3xl lg:text-4xl font-semibold leading-[1.2] text-foreground mb-5">
              Need more learning support?
            </h2>
            <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] mb-10 max-w-[520px] mx-auto leading-relaxed">
              Contact our course consultant for recommended reading lists and supporting materials.
            </p>
            <Link
              to="/en/contact"
              className="inline-flex items-center px-8 py-4 bg-accent text-accent-foreground font-['Noto_Sans_SC',sans-serif] text-sm font-medium rounded-sm hover:bg-[#4A7F7B] transition-colors duration-200"
            >
              Course Consultation
            </Link>
          </div>
        </section>
      </main>

      {/* Video Player Modal */}
      {playingVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1C1A]/70 backdrop-blur-sm p-6"
          onClick={() => setPlayingVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#1C1C1A] rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPlayingVideo(null)}
              aria-label="Close video"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#1C1C1A]/70 text-[#F5F5F0] flex items-center justify-center hover:bg-[#1C1C1A] transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <video src={playingVideo} controls autoPlay className="w-full aspect-video" />
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
