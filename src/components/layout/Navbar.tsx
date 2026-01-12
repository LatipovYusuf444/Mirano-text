import logo from "@/assets/images/mirano-bg-text.webp"
import bgimage from "@/assets/images/bgimagesss.webp"
import telefonbg from "@/assets/images/telefonbg.webp"
import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowUpRight, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import i18n from "i18next"

const LANGS = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
] as const

type LangCode = (typeof LANGS)[number]["code"]

const Navbar = () => {
  const { t } = useTranslation()

  const navItems = useMemo(
    () => [
      { label: t("nav.info"), href: "#malumotlar" },
      { label: t("nav.catalog"), href: "#catalog" },
      { label: t("nav.about"), href: "#biz-haqimizda" },
      { label: t("nav.location"), href: "#location" },
    ],
    [t]
  )

  const [shrink, setShrink] = useState(false)

  // lang dropdown
  const [openLang, setOpenLang] = useState(false)
  const langRef = useRef<HTMLDivElement | null>(null)
  const currentLang = (i18n.language?.slice(0, 2) as LangCode) || "uz"

  const setLang = (lng: LangCode) => {
    i18n.changeLanguage(lng)
    localStorage.setItem("lang", lng)
    setOpenLang(false)
  }

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ✅ Smooth scroll + fixed navbar offset
  useEffect(() => {
    const handleClick = (e: Event) => {
      const a = e.target as HTMLElement
      const link = a.closest("a") as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute("href")
      if (!href || !href.startsWith("#")) return

      const el = document.querySelector(href)
      if (!el) return

      e.preventDefault()

      const header = document.getElementById("site-header")
      const headerH = header ? header.getBoundingClientRect().height : 0

      const top = el.getBoundingClientRect().top + window.scrollY - (headerH + 16)

      window.scrollTo({ top, behavior: "smooth" })
      history.pushState(null, "", href)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  // ✅ dropdown tashqarisiga bosilsa yopilsin
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!openLang) return
      const el = langRef.current
      if (!el) return
      if (e.target instanceof Node && !el.contains(e.target)) setOpenLang(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [openLang])

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <img
        src={telefonbg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center sm:hidden"
        loading="eager"
        decoding="async"
      />

      <img
        src={bgimage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center scale-[1.02] hidden sm:block"
        loading="eager"
        decoding="async"
      />

      <div className="absolute inset-0 -z-10 bg-black/60 sm:bg-black/50 pointer-events-none" />
      <div className="absolute inset-0 -z-10 pointer-events-none [background:radial-gradient(circle_at_30%_20%,rgba(255,180,80,0.10),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-50 [background:radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.85))]" />

      <header
        id="site-header"
        className={`
          fixed top-0 left-0 right-0 z-50
          flex items-center justify-between
          px-4 md:px-10
          backdrop-blur-xl bg-black/20
          border-b border-white/10
          transition-all duration-300 ease-out
          ${shrink ? "py-3" : "py-5"}
        `}
      >
        <motion.img
          src={logo}
          alt="Mirano Logo"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className={`
            object-contain transition-all duration-300 ease-out
            ${shrink ? "w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" : "w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20"}
          `}
        />

        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="flex items-center gap-4 sm:gap-6 md:gap-10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="
                  relative text-white/90 font-medium
                  text-xs sm:text-sm md:text-base
                  hover:text-white
                  transition-colors duration-300
                  after:content-[''] after:absolute after:left-0
                  after:-bottom-2 after:h-[2px] after:w-0
                  after:bg-white/90 after:transition-all
                  after:duration-500 after:ease-out
                  hover:after:w-full
                "
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* ✅ Language Switcher (Dropdown) */}
          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => setOpenLang((v) => !v)}
              className="
                inline-flex items-center gap-2
                rounded-full px-3 py-2
                bg-white/8 hover:bg-white/12
                border border-white/12
                text-white/90
                text-xs sm:text-sm
                backdrop-blur-xl
                transition
              "
              aria-label="Tilni o‘zgartirish"
              title="Tilni o‘zgartirish"
            >
              <Globe className="w-4 h-4 text-orange-300" />
              <span className="font-semibold">{currentLang.toUpperCase()}</span>
              <ChevronDown className={`w-4 h-4 transition ${openLang ? "rotate-180" : ""}`} />
            </button>

            {openLang ? (
              <div
                className="
                  absolute right-0 mt-2 w-28
                  rounded-xl overflow-hidden
                  border border-white/12
                  bg-black/55 backdrop-blur-xl
                  shadow-[0_18px_60px_rgba(0,0,0,0.55)]
                "
              >
                {LANGS.map((l) => {
                  const active = currentLang === l.code
                  return (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setLang(l.code)}
                      className={`
                        w-full px-3 py-2 text-left text-sm
                        transition
                        ${active ? "bg-white/14 text-white" : "text-white/85 hover:bg-white/10"}
                      `}
                    >
                      {l.label}
                    </button>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div className={shrink ? "h-[72px] sm:h-[76px] md:h-[88px]" : "h-[92px] sm:h-[96px] md:h-[116px]"} />

      <main className="relative z-10 flex-1 flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="px-4 md:px-16 max-w-3xl space-y-5"
        >
          <h1 className="font-extrabold text-white text-3xl sm:text-4xl md:text-6xl leading-tight">
            {t("hero.title1")}
            <span className="text-orange-400"> {t("hero.title2")}</span>
          </h1>

          <p className="text-white/90 text-sm sm:text-base md:text-xl font-medium">
            {t("hero.desc")}
          </p>

          <Button
            className="
              h-12 md:h-14 w-48 px-6 md:px-10
              text-sm md:text-base font-semibold
              rounded-full
              text-white
              bg-white/10
              backdrop-blur-xl
              border border-white/20
              shadow-[0_8px_30px_rgba(0,0,0,0.25)]
              hover:bg-orange-500
              hover:border-white/30
              transition-all duration-300 ease-out
              flex items-center gap-2
            "
          >
            {t("hero.cta")} <ArrowUpRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </main>
    </div>
  )
}

export default Navbar
