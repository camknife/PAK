import EnFaqSection from "@/app/components/faq/EnFaqSection"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"

// ─── English FAQ Page ───────────────────────────────────────────────────
export default function EnFaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-['Noto_Sans_SC',sans-serif] overflow-x-hidden">
      <Navbar />
      <main className="pt-16">
        <EnFaqSection />
      </main>
      <Footer />
    </div>
  )
}
