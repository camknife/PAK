import { useState } from "react"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { submitConsult } from "@/lib/consult"

// ─── 英文课程咨询页（提交结构同中文版，显示文案英文）────────────────────
function EnCTAForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    occupation: "",
    course: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 选项值：双语（飞书记录可读，显示英文为主）
  const occupations = [
    "Physical Therapist (物理治疗师)",
    "Chiropractor (整脊医生)",
    "Naturopath (自然疗法师)",
    "General Practitioner (全科医生)",
    "Dentist (牙科医生)",
    "Sports Rehabilitation Coach (运动康复师)",
    "Other Healthcare Professional (其他医疗专业人士)",
  ]
  const courses = [
    "Module 1–2 (Two-module course)",
    "Single module",
    "Undecided, need consultation",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await submitConsult({
        name: form.name,
        phone: form.phone,
        occupation: form.occupation,
        course: form.course,
        message: form.message,
      })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed, please try again later.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-24 lg:py-36">
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-20 items-start">
        {/* Left headline */}
        <div className="lg:sticky lg:top-28">
          <p className="font-['Noto_Sans_SC',sans-serif] text-xs font-medium tracking-[0.15em] uppercase text-accent mb-5">
            Course Consultation
          </p>
          <h2 className="font-['Noto_Serif_SC',serif] text-4xl lg:text-5xl font-semibold leading-[1.15] text-foreground mb-7">
            Not just a course, but a leap in your career
          </h2>
          <p className="font-['Noto_Sans_SC',sans-serif] text-base text-[#6B6B62] leading-relaxed mb-10">
            Fill in the appointment form and our course consultant will contact you within one working day
            to provide personalized course advice and enrollment guidance.
          </p>
          <div className="flex flex-col gap-4">
            {[
              { icon: "📍", text: "On-site training, limited enrollment, quality guaranteed" },
              { icon: "🎓", text: "DÄGAK · ICAK dual international certification" },
              { icon: "🌐", text: "Chinese-taught, international standards" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#4A4A45]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div className="bg-[#EEEEE9] border border-border p-8 lg:p-10">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-5">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 11l5 5 9-9" stroke="#5A8F8B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-['Noto_Serif_SC',serif] text-2xl font-semibold text-foreground mb-3">
                Appointment Submitted
              </h3>
              <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-[#6B6B62]">
                Thank you for your appointment. We will contact you by phone within one working day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-['Noto_Sans_SC',sans-serif] text-xs font-medium text-[#6B6B62] mb-2 tracking-wide">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#F5F5F0] border border-border px-4 py-3 font-['Noto_Sans_SC',sans-serif] text-sm text-foreground placeholder:text-[#9B9B90] focus:outline-none focus:border-accent transition-colors duration-200 rounded-sm"
                  />
                </div>
                <div>
                  <label className="block font-['Noto_Sans_SC',sans-serif] text-xs font-medium text-[#6B6B62] mb-2 tracking-wide">
                    Phone <span className="text-accent">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#F5F5F0] border border-border px-4 py-3 font-['Noto_Sans_SC',sans-serif] text-sm text-foreground placeholder:text-[#9B9B90] focus:outline-none focus:border-accent transition-colors duration-200 rounded-sm"
                  />
                </div>
              </div>

              {/* Occupation */}
              <div>
                <label className="block font-['Noto_Sans_SC',sans-serif] text-xs font-medium text-[#6B6B62] mb-2 tracking-wide">
                  Professional Background
                </label>
                <select
                  value={form.occupation}
                  onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                  className="w-full bg-[#F5F5F0] border border-border px-4 py-3 font-['Noto_Sans_SC',sans-serif] text-sm text-foreground focus:outline-none focus:border-accent transition-colors duration-200 rounded-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select your profession</option>
                  {occupations.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Course */}
              <div>
                <label className="block font-['Noto_Sans_SC',sans-serif] text-xs font-medium text-[#6B6B62] mb-2 tracking-wide">
                  Interested Course
                </label>
                <select
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  className="w-full bg-[#F5F5F0] border border-border px-4 py-3 font-['Noto_Sans_SC',sans-serif] text-sm text-foreground focus:outline-none focus:border-accent transition-colors duration-200 rounded-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a course</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block font-['Noto_Sans_SC',sans-serif] text-xs font-medium text-[#6B6B62] mb-2 tracking-wide">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your question or what you'd like to know…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#F5F5F0] border border-border px-4 py-3 font-['Noto_Sans_SC',sans-serif] text-sm text-foreground placeholder:text-[#9B9B90] focus:outline-none focus:border-accent transition-colors duration-200 rounded-sm resize-none"
                />
              </div>

              {error && (
                <p className="font-['Noto_Sans_SC',sans-serif] text-sm text-red-600 text-center">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent text-accent-foreground font-['Noto_Sans_SC',sans-serif] text-sm font-medium py-4 rounded-sm hover:bg-[#4A7F7B] transition-colors duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting…" : "Get Course Materials"}
              </button>

              <p className="font-['Noto_Sans_SC',sans-serif] text-xs text-[#9B9B90] text-center">
                By submitting, you agree to our privacy policy. We will not use your information for commercial purposes.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function EnContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-['Noto_Sans_SC',sans-serif] overflow-x-hidden">
      <Navbar />
      <main className="pt-16">
        <EnCTAForm />
      </main>
      <Footer />
    </div>
  )
}
