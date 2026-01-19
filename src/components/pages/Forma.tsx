import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

type LeadPayload = {
  first_name: string
  last_name: string
  phone: string
  email: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Forma() {
  const navigate = useNavigate()

  const [form, setForm] = useState<LeadPayload>({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [msg, setMsg] = useState("")

  const errors = useMemo(() => {
    const e: Partial<Record<keyof LeadPayload, string>> = {}

    if (!form.first_name.trim()) e.first_name = "Ism majburiy"
    if (!form.last_name.trim()) e.last_name = "Familiya majburiy"

    const phoneDigits = form.phone.replace(/\D/g, "")
    if (!phoneDigits) e.phone = "Telefon majburiy"
    if (phoneDigits && phoneDigits.length < 9) e.phone = "Telefon noto‘g‘ri"

    if (!form.email.trim()) e.email = "Email majburiy"
    if (form.email.trim() && !emailRegex.test(form.email.trim())) e.email = "Email noto‘g‘ri"

    return e
  }, [form])

  const canSubmit = Object.keys(errors).length === 0 && !loading

  const onChange =
    (k: keyof LeadPayload) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((p) => ({ ...p, [k]: e.target.value }))
      setStatus("idle")
      setMsg("")
    }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) {
      setStatus("error")
      setMsg("Iltimos, formani to‘g‘ri to‘ldiring.")
      return
    }

    try {
      setLoading(true)
      setStatus("idle")
      setMsg("")

      // ✅ BACKEND ULANADIGAN JOY (.env):
      // VITE_API_BASE_URL=http://127.0.0.1:8000  yoki  https://api.sizningdomen.com
      const base = import.meta.env.VITE_API_BASE_URL || ""
      const url = `${base}/api/leads/`

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || "Server xatoligi")

      setStatus("success")
      setMsg("✅ Buyurtma qabul qilindi! Tez orada bog‘lanamiz.")
      setForm({ first_name: "", last_name: "", phone: "", email: "" })
    } catch (err: any) {
      setStatus("error")
      setMsg(err?.message || "Xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full px-4 py-10 relative overflow-hidden">
      {/* ✅ Luxury dark bg */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-950 to-black" />
      <div className="absolute inset-0 -z-10 pointer-events-none [background:radial-gradient(circle_at_20%_20%,rgba(255,180,80,0.12),transparent_45%),radial-gradient(circle_at_85%_70%,rgba(120,180,255,0.10),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-60 [background:radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.90))]" />

      <div className="mx-auto max-w-xl">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight">
            Buyurtma berish
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="text-white/80 hover:text-white text-sm underline underline-offset-4"
          >
            Orqaga
          </button>
        </div>

        {/* ✅ Glass Card */}
        <div
          className="
            rounded-3xl p-6 sm:p-7
            border border-white/15
            bg-white/10 backdrop-blur-2xl
            shadow-[0_20px_80px_rgba(0,0,0,0.55)]
          "
        >
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Ism"
                value={form.first_name}
                onChange={onChange("first_name")}
                error={errors.first_name}
                placeholder="Aziz"
              />
              <Field
                label="Familiya"
                value={form.last_name}
                onChange={onChange("last_name")}
                error={errors.last_name}
                placeholder="Karimov"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Telefon"
                value={form.phone}
                onChange={onChange("phone")}
                error={errors.phone}
                placeholder="+998 90 123 45 67"
              />
              <Field
                label="Email"
                value={form.email}
                onChange={onChange("email")}
                error={errors.email}
                placeholder="you@example.com"
              />
            </div>

            {status !== "idle" && (
              <div
                className={[
                  "rounded-2xl px-4 py-3 text-sm border",
                  status === "success"
                    ? "border-emerald-300/40 bg-emerald-500/10 text-emerald-100"
                    : "border-rose-300/40 bg-rose-500/10 text-rose-100",
                ].join(" ")}
              >
                {msg}
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className={[
                "w-full rounded-2xl px-5 py-3 font-semibold transition-all duration-300",
                "border border-white/15 backdrop-blur-xl",
                canSubmit
                  ? "bg-orange-500/90 text-white hover:bg-orange-500 shadow-[0_12px_40px_rgba(255,140,50,0.30)]"
                  : "cursor-not-allowed bg-white/10 text-white/50",
              ].join(" ")}
            >
              {loading ? "Yuborilmoqda..." : "Buyurtma berish"}
            </button>

            <p className="text-center text-xs text-white/60">
              Tugmani bosish orqali ma’lumotlaringiz Telegram botga yuboriladi.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

function Field(props: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
}) {
  const { label, value, onChange, error, placeholder } = props

  return (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-white/90">{label}</label>

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={[
          "h-12 w-full rounded-2xl px-4 outline-none transition",
          "bg-white/10 text-white placeholder:text-white/50",
          "border border-white/15 focus:border-orange-400/70",
          "backdrop-blur-xl",
          error ? "border-rose-400/70 focus:border-rose-400" : "",
        ].join(" ")}
      />

      {error && <div className="text-xs text-rose-200">{error}</div>}
    </div>
  )
}
