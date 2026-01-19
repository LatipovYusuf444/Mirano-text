import { motion } from "framer-motion"
import { Scissors, Factory, Palette, Truck } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

const FeaturedServices = () => {
  const { t } = useTranslation()
  const sliderRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  // ✅ tarjima keylari bilan services (til o‘zgarsa avtomatik yangilanadi)
  const services = useMemo(
    () => [
      {
        title: t("services.items.customSewing.title"),
        desc: t("services.items.customSewing.desc"),
        icon: Scissors,
      },
      {
        title: t("services.items.modernProduction.title"),
        desc: t("services.items.modernProduction.desc"),
        icon: Factory,
      },
      {
        title: t("services.items.exclusiveDesign.title"),
        desc: t("services.items.exclusiveDesign.desc"),
        icon: Palette,
      },
      {
        title: t("services.items.fastDelivery.title"),
        desc: t("services.items.fastDelivery.desc"),
        icon: Truck,
      },
    ],
    [t]
  )

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    let rafId: number
    const speed = 0.5

    const animate = () => {
      if (!paused) {
        slider.scrollLeft += speed
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0
        }
      }
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [paused])

  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* ✅ 1) Base luxury gradient (boshqa pagelar bilan bir xil vibe) */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-[#1e293b]
          via-[#0f172a]
          to-[#020617]
        "
      />

      {/* ✅ 2) Glowlar (fonni chiroyli qiladi) */}
      <div className="pointer-events-none absolute -top-64 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-sky-500/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-28 right-[-240px] h-[520px] w-[520px] rounded-full bg-indigo-500/18 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-240px] left-[-240px] h-[520px] w-[520px] rounded-full bg-orange-500/14 blur-[130px]" />

      {/* ✅ content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="uppercase tracking-widest text-orange-400 text-sm font-semibold">
            {t("services.kicker")}
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
            {t("services.title")}
          </h2>
        </motion.div>

        {/* CAROUSEL */}
        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
            className="flex gap-6 overflow-x-hidden select-none"
          >
            {[...services, ...services].map((service, i) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="
                    min-w-[260px] sm:min-w-[320px]
                    rounded-3xl
                    bg-white/8
                    border border-white/12
                    p-8
                    backdrop-blur-xl
                    shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                    hover:bg-white/10
                    transition-colors
                  "
                >
                  <div className="w-14 h-14 mb-5 rounded-2xl flex items-center justify-center bg-orange-500/20 border border-orange-400/30">
                    <Icon className="text-orange-400 w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <p className="text-white/50 text-sm mt-6">
          {t("services.hint")}
        </p>
      </div>
    </section>
  )
}

export default FeaturedServices
