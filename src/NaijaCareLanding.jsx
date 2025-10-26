import React, { useMemo, useState } from "react";
import { Phone, Stethoscope, Globe, Waves, ArrowRight, Users, ShieldCheck, MapPin, Mail, FileText, Sparkles } from "lucide-react";

// ---- Quick style tokens (align loosely with your deck) ----
const brand = {
    green: "#0f5132",
    sand: "#f5efe6",
    charcoal: "#1f2937",
    accent: "#b91c1c", // alerts/attention
};

// ---- Reusable components ----
function Chip({ children } ){
    return (
        <span className="inline-flex items-center rounded-full bg-white/70 border border-black/10 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
      {children}
    </span>
    );
}

function Section({ id, eyebrow, title, kicker, children }) {
    return (
        <section id={id} className="w-full px-6 md:px-10 lg:px-16 py-14 md:py-20">
            <div className="max-w-7xl mx-auto">
                {eyebrow && <div className="text-xs tracking-widest uppercase text-gray-500 mb-3">{eyebrow}</div>}
                <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-tight">{title}</h2>
                {kicker && <p className="mt-3 text-gray-600 max-w-3xl">{kicker}</p>}
                <div className="mt-8">
                    {children}
                </div>
            </div>
        </section>
    );
}

// ---- USSD/SMS Demo (mock flow) ----
const demoSteps = [
    { id: 1, prompt: "Dial *123# to begin", reply: "Welcome to NaijaCare. Choose: 1) Maternal 2) Child 3) General" },
    { id: 2, prompt: "1", reply: "Maternal health. Symptoms? 1) Headache 2) Swelling 3) Fever" },
    { id: 3, prompt: "2", reply: "Risk tip: Sudden swelling can signal preeclampsia. Need help now? 1) Yes → connect 2) No → self-care tips" },
    { id: 4, prompt: "1", reply: "Connecting you to a clinician… Est. cost ₦~1500 (~$2)." },
    { id: 5, prompt: "—", reply: "Thanks! A nurse will call shortly. Save: 0800-NAIJACARE" },
];

function UssdDemo() {
    const [step, setStep] = useState(0);
    const current = demoSteps[step];
    const canNext = step < demoSteps.length - 1;
    const canPrev = step > 0;

    return (
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-black/5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Phone size={18} /> <span>USSD / SMS Simulator</span>
                    </div>
                    <div className="flex gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                </div>
                <div className="aspect-[9/16] w-full max-w-xs mx-auto bg-gray-50 border border-black/10 rounded-3xl p-4 flex flex-col">
                    <div className="text-center text-xs text-gray-400">NaijaCare • 2G Ready</div>
                    <div className="mt-3 flex-1 overflow-y-auto space-y-3">
                        {demoSteps.slice(0, step + 1).map((s) => (
                            <div key={s.id} className="space-y-1">
                                <div className="self-end text-right">
                                    <div className="inline-block bg-emerald-50 text-emerald-900 text-xs px-3 py-2 rounded-2xl rounded-tr-sm border border-emerald-200">
                                        {s.prompt}
                                    </div>
                                </div>
                                <div className="self-start text-left">
                                    <div className="inline-block bg-white text-gray-800 text-xs px-3 py-2 rounded-2xl rounded-tl-sm border border-gray-200">
                                        {s.reply}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-3 grid grid-cols-2 gap-2">
                        <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={!canPrev} className={`text-xs py-2 rounded-lg border ${canPrev ? "bg-white hover:bg-gray-50" : "bg-gray-100 text-gray-400"}`}>Back</button>
                        <button onClick={() => setStep((s) => Math.min(demoSteps.length - 1, s + 1))} disabled={!canNext} className={`text-xs py-2 rounded-lg border ${canNext ? "bg-black text-white hover:bg-gray-900" : "bg-gray-200 text-gray-400"}`}>Next</button>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Showcase the low-bandwidth experience</h3>
                <p className="text-gray-600">This guided, non-functional demo mirrors a typical USSD/SMS flow for maternal health triage in Hausa/Yoruba/Igbo/English. We keep it short, safe, and clear—no medical claims, just user journey proof.</p>
                <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    <li>2G-friendly and phone-agnostic</li>
                    <li>Simple branching (self-care vs. connect to clinician)</li>
                    <li>Clear micro-costing (~$2 per consult) and time-to-help expectations</li>
                </ul>
            </div>
        </div>
    );
}

// ---- Cost Comparator ----
function CostComparator() {
    const [visits, setVisits] = useState(3);
    const clinicCostPerVisit = 8; // USD (placeholder for comms)
    const naijacareCostPerVisit = 2; // USD

    const totals = useMemo(() => {
        const clinic = visits * clinicCostPerVisit;
        const naija = visits * naijacareCostPerVisit;
        const savings = Math.max(0, clinic - naija);
        return { clinic, naija, savings };
    }, [visits]);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-black/5">
            <div className="flex items-center gap-2 text-gray-600 mb-4"><ShieldCheck size={18} /> <span className="text-sm">Cost Comparator (illustrative)</span></div>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="text-sm text-gray-700">Number of maternal/child consultations per month</label>
                    <input type="range" min={1} max={12} value={visits} onChange={(e) => setVisits(parseInt(e.target.value))} className="w-full" />
                    <div className="text-xs text-gray-500">{visits} {visits === 1 ? "visit" : "visits"}/month</div>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                        <div className="p-4 rounded-xl bg-gray-50 border"><div className="text-xs text-gray-500">Traditional</div><div className="text-lg font-semibold">${totals.clinic.toFixed(0)}</div></div>
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200"><div className="text-xs text-emerald-800">NaijaCare</div><div className="text-lg font-semibold text-emerald-900">${totals.naija.toFixed(0)}</div></div>
                        <div className="p-4 rounded-xl bg-sky-50 border border-sky-200"><div className="text-xs text-sky-800">Savings</div><div className="text-lg font-semibold text-sky-900">${totals.savings.toFixed(0)}</div></div>
                    </div>
                    <p className="mt-3 text-xs text-gray-500">Assumes ~$2/NaijaCare consult vs. ~$8 traditional direct cost. Adjust later with validated figures.</p>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>For NGOs/Clinics:</strong> Pair pay-per-use with a simple institutional plan (e.g., $50/month) to stabilize operations while serving low-income users.</p>
                    <p><strong>For users:</strong> Clear, predictable micro-costing reduces delayed care and catastrophic OOP expenses.</p>
                </div>
            </div>
        </div>
    );
}

// ---- Roadmap (compact) ----
const roadmap = [
    { q: "Q4 2025", label: "Partner discovery & pilot scoping (Sokoto/Jigawa)" },
    { q: "Q1 2026", label: "USSD short code + language packs (Hausa v1)" },
    { q: "Q2 2026", label: "Pilot launch w/ CHWs + monitoring" },
    { q: "H2 2026", label: "Scale to 3+ states; add voice IVR" },
];

function Roadmap() {
    return (
        <div className="overflow-x-auto">
            <ol className="min-w-[640px] grid grid-cols-4 gap-4">
                {roadmap.map((r, i) => (
                    <li key={i} className="p-4 bg-white rounded-xl border border-black/5 shadow-sm">
                        <div className="text-xs text-gray-500">{r.q}</div>
                        <div className="mt-1 text-sm font-medium text-gray-800">{r.label}</div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

// ---- Partners (aspirational/targets allowed) ----
const targetPartners = ["MTN", "Airtel", "UNICEF", "WHO", "NMA", "State MoH", "WCHRI", "Africa Centre"];

function Partners() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {targetPartners.map((p) => (
                <div key={p} className="h-16 rounded-xl border flex items-center justify-center text-gray-500 bg-white/60">
                    <span className="text-sm">{p}</span>
                </div>
            ))}
        </div>
    );
}

// ---- Main Page ----
export default function NaijaCareLanding() {
    return (
        <div className="min-h-screen text-gray-900" style={{ background: `linear-gradient(180deg, ${brand.sand}, #fff)` }}>
            {/* Nav */}
            <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-black/5 transition-shadow">
                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl shadow-sm ring-1 ring-black/10" style={{ backgroundColor: brand.green }} />
                        <div className="font-semibold tracking-tight">NaijaCare</div>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <a href="#problem" className="text-gray-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40">Problem</a>
                        <a href="#solution" className="text-gray-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40">Solution</a>
                        <a href="#demos" className="text-gray-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40">Demos</a>
                        <a href="#partners" className="text-gray-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40">Partners</a>
                        <a href="#contact" className="text-gray-600 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/40">Contact</a>
                    </nav>
                    <div className="flex items-center gap-2">
                        <a href="#contact" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black" aria-label="Open inquiries section">
                            <Mail size={16} aria-hidden="true" /> Inquiries
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative px-6 md:px-10 lg:px-16 pt-16 md:pt-24 pb-12 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_10%_0%,rgba(16,185,129,0.08),transparent),radial-gradient(40%_40%_at_90%_-10%,rgba(16,185,129,0.12),transparent)]" />
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Chip>Low-bandwidth</Chip>
                            <Chip>Local languages</Chip>
                            <Chip>Community-rooted</Chip>
                        </div>
                        <h1 className="text-[clamp(1.8rem,4vw,3.25rem)] font-semibold leading-[1.1] text-gray-900">
                            Democratizing maternal & child health in rural Nigeria
                        </h1>
                        <p className="mt-4 text-gray-700 max-w-xl">
                            AI-guided telehealth and trusted education that works on any phone—USSD, SMS, or voice—co-created with community health workers.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm shadow-sm hover:shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                                <ArrowRight size={16} aria-hidden="true" /> Talk to us
                            </a>
                            <a href="/deck/naijacare_pitch_deck.pdf" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm bg-white/90 hover:bg-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                                <FileText size={16} aria-hidden="true" /> View pitch deck
                            </a>
                        </div>
                        <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-gray-700">
                            <div className="p-4 rounded-xl bg-white border shadow-sm">
                                <div className="text-xs text-gray-500">Works anywhere</div>
                                <div className="font-medium">2G/USSD/SMS</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white border shadow-sm">
                                <div className="text-xs text-gray-500">Affordable</div>
                                <div className="font-medium">~$2/consult</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white border shadow-sm">
                                <div className="text-xs text-gray-500">Local-first</div>
                                <div className="font-medium">Hausa • Yoruba • Igbo</div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="rounded-3xl bg-white border border-black/5 p-6 shadow-xl">
                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                                <Stethoscope size={18} aria-hidden="true" /> <span className="text-sm">Care on any phone</span>
                            </div>
                            <div className="rounded-2xl border bg-gray-50 h-72" />
                            <p className="mt-3 text-xs text-gray-500">Placeholder for an illustration/mockup (phone + tower + family).</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem */}
            <Section id="problem" eyebrow="The case for NaijaCare" title="The problem is structural—access, literacy, and cost" kicker="Millions face long travel, high out-of-pocket costs, and low digital literacy. We meet people where they are with channels they already use.">
                <div className="grid md:grid-cols-3 gap-4">
                    {[{
                        icon: <MapPin className="text-emerald-700" aria-hidden="true" />, title: "Rural distance", body: "Hours to nearest clinic; transport cost is care delayed."},
                        { icon: <Users className="text-emerald-700" aria-hidden="true" />, title: "Low literacy", body: "Voice + local languages reduce friction and increase trust." },
                        { icon: <ShieldCheck className="text-emerald-700" aria-hidden="true" />, title: "High OOP spend", body: "Micro-pricing and institutional plans tame financial shocks." },
                    ].map((c, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                            <div className="mb-2">{c.icon}</div>
                            <div className="font-semibold">{c.title}</div>
                            <p className="text-sm text-gray-600 mt-1">{c.body}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Solution */}
            <Section id="solution" eyebrow="What we do" title="A low-bandwidth telehealth layer plus trusted education" kicker="USSD/SMS triage, clinician connection, and culturally grounded content. Offline-first now; voice IVR later.">
                <div className="grid md:grid-cols-4 gap-4">
                    {[{
                        icon: <Phone className="text-emerald-700" aria-hidden="true" />, title: "USSD/SMS triage", body: "Guided steps help users decide: self-care vs. connect to a nurse."},
                        { icon: <Stethoscope className="text-emerald-700" aria-hidden="true" />, title: "Clinician linkage", body: "Fast handoff to a licensed clinician when escalation is needed." },
                        { icon: <Globe className="text-emerald-700" aria-hidden="true" />, title: "Local languages", body: "Hausa/Yoruba/Igbo/English content that respects context." },
                        { icon: <Waves className="text-emerald-700" aria-hidden="true" />, title: "Offline-first", body: "Works in patchy connectivity; light, resilient UX." },
                    ].map((c, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm transition-transform will-change-transform hover:-translate-y-0.5">
                            <div className="mb-2">{c.icon}</div>
                            <div className="font-semibold">{c.title}</div>
                            <p className="text-sm text-gray-600 mt-1">{c.body}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Demos */}
            <Section id="demos" eyebrow="Show, don’t tell" title="Mini demos" kicker="These interactive mocks help partners, clinicians, and communities visualize the experience.">
                <div className="grid gap-8">
                    <UssdDemo />
                    <CostComparator />
                </div>
            </Section>

            {/* Roadmap */}
            <Section eyebrow="Execution" title="Roadmap & pilots" kicker="Initial focus on Sokoto/Jigawa with CHW partners; expand based on evidence and feedback.">
                <Roadmap />
            </Section>

            {/* Partners */}
            <Section id="partners" eyebrow="Allies we’re targeting" title="Partners & advisors (in discussion / targeted)">
                <Partners />
            </Section>

            {/* Contact */}
            <Section id="contact" eyebrow="Let’s collaborate" title="One inbox for any and all inquiries" kicker="Partners, investors, community leaders, clinicians, journalists—your message will reach the core team.">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                        <div className="text-sm text-gray-500">Email</div>
                        <a href="mailto:babello@ualberta.ca" className="mt-1 inline-flex items-center gap-2 text-gray-900 font-medium hover:underline">
                            <Mail size={16} aria-hidden="true" /> babello@ualberta.ca
                        </a>
                        <p className="text-xs text-gray-500 mt-2">Use this for everything: partnerships, media, pilots, careers.</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                        <div className="text-sm text-gray-500">Pitch deck</div>
                        <a href="/deck/naijacare_pitch_deck.pdf" className="mt-1 inline-flex items-center gap-2 text-gray-900 font-medium hover:underline">
                            <FileText size={16} aria-hidden="true" /> Download (PDF)
                        </a>
                        <p className="text-xs text-gray-500 mt-2">We can gate this behind email capture later if you prefer.</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                        <div className="text-sm text-gray-500">Newsletter</div>
                        <a href="#" className="mt-1 inline-flex items-center gap-2 text-gray-900 font-medium hover:underline">
                            <Sparkles size={16} aria-hidden="true" /> Subscribe for updates
                        </a>
                        <p className="text-xs text-gray-500 mt-2">Add a simple form (Plausible or GA for analytics) in a later pass.</p>
                    </div>
                </div>
                <p className="text-xs text-gray-400 mt-6">Disclaimer: This site is for informational purposes and early pilot recruitment. Not a medical device; not for emergency use.</p>
            </Section>

            <footer className="px-6 md:px-10 lg:px-16 pb-10">
                <div className="max-w-7xl mx-auto border-t border-black/5 pt-6 text-xs text-gray-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>© {new Date().getFullYear()} NaijaCare</div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-700">Privacy</a>
                        <a href="#" className="hover:text-gray-700">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
