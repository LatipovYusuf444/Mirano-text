import logo from "@/assets/images/mirano-bg-text.webp"
import bgimage from "@/assets/images/bgimagesss.webp"
import telefonbg from "@/assets/images/telefonbg.webp"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const Navbar = () => {
  const navItems = [
    { label: "Ma'lumotlar", href: "#malumotlar" },
    { label: "Catalog", href: "#catalog" },
    { label: "Biz haqimizda", href: "#biz-haqimizda" },
    { label: "Location", href: "#location" },
  ]
  const [shrink, setShrink] = useState(false)

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

      // header balandligi (responsive)
      const header = document.getElementById("site-header")
      const headerH = header ? header.getBoundingClientRect().height : 0

      const top =
        el.getBoundingClientRect().top + window.scrollY - (headerH + 16)

      window.scrollTo({ top, behavior: "smooth" })

      // URL hashni ham update qilsin (optional)
      history.pushState(null, "", href)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      {/* ✅ Background image (responsiv) */}
      <img
        src={telefonbg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center sm:hidden"
        loading="eager"
        decoding="async"
      />

      {/* 🖥 DESKTOP background */}
      <img
        src={bgimage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center scale-[1.02] hidden sm:block"
        loading="eager"
        decoding="async"
      />

      {/* ✅ Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/60 sm:bg-black/50 pointer-events-none" />
      <div className="absolute inset-0 -z-10 pointer-events-none [background:radial-gradient(circle_at_30%_20%,rgba(255,180,80,0.10),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-50 [background:radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.85))]" />

      {/* ✅ FIXED HEADER */}
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
        {/* LOGO */}
        <motion.img
          src={logo}
          alt="Mirano Logo"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className={`
    object-contain transition-all duration-300 ease-out
    ${shrink
              ? "w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
              : "w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20"}
  `}
        />


        {/* NAV LINKS */}
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
      </header>

      {/* ✅ Header fixed bo‘lgani uchun content tepaga kirib ketmasin */}
      <div className={shrink ? "h-[72px] sm:h-[76px] md:h-[88px]" : "h-[92px] sm:h-[96px] md:h-[116px]"} />
      {/* HERO */}
      <main className="relative z-10 flex-1 flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="px-4 md:px-16 max-w-3xl space-y-5"
        >
          <h1 className="font-extrabold text-white text-3xl sm:text-4xl md:text-6xl leading-tight">
            Sifatli Textil
            <span className="text-orange-400"> San'ati</span>
          </h1>

          <p className="text-white/90 text-sm sm:text-base md:text-xl font-medium">
            Bizning matolarimiz zamonaviy texnologiyalar va an’anaviy
            to‘quv uslublari uyg‘unligida yaratiladi.
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
            Telegram <ArrowUpRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </main>
    </div>
  )
}

export default Navbar
