import { memo, useEffect, useMemo, useRef, useState } from "react"
import img1 from "@/assets/images/11.webp"
import img2 from "@/assets/images/12.webp"
import img3 from "@/assets/images/10.webp"

import {
  motion,
  AnimatePresence,
  type Variants,
  useReducedMotion,
} from "framer-motion"
import { useTranslation } from "react-i18next"

const container: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

function preloadImage(src: string) {
  const img = new Image()
  img.src = src
}

const About = memo(function About() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  const images = useMemo(() => [img1, img2, img3], [])
  const [active, setActive] = useState(0)

  const intervalMs = 2500
  const timerRef = useRef<number | null>(null)

  const stop = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const start = () => {
    stop()
    timerRef.current = window.setInterval(() => {
      setActive((p) => (p + 1) % images.length)
    }, intervalMs)
  }

  useEffect(() => {
    const next = (active + 1) % images.length
    preloadImage(images[next])
  }, [active, images])

  useEffect(() => {
    const onVis = () => {
      if (document.hidden) stop()
      else start()
    }

    start()
    document.addEventListener("visibilitychange", onVis)

    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [images])

  return (
    <section
      className="
        relative w-full py-24 overflow-hidden
        bg-gradient-to-b
        from-[#0b1220]
        via-[#0f1a2e]
        via-[#141f35]
        to-[#0a0f1c]
      "
    >
      {/* ✅ Soft luxury overlay (UI o'zgarmaydi, faqat premium ko'rinadi) */}
      <div
        className="
          absolute inset-0 pointer-events-none
          [background:radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]
        "
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/0 via-black/15 to-black/30" />

      {/* sizdagi orange vertical lines */}
      <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-orange-500/0 via-orange-500/30 to-orange-500/0" />
      <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-orange-500/0 via-orange-500/30 to-orange-500/0" />

      {/* qo'shimcha juda yengil glow (brand) */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="max-w-7xl mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 items-center gap-16 relative z-10"
      >
        {/* IMAGE (Carousel) */}
        <motion.div variants={fadeUp} className="relative flex justify-center">
          <div className="absolute -inset-3 rounded-3xl bg-orange-500/10 blur-xl" />

          <div className="relative z-10 w-full max-w-[420px]">
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={images[active]}
                  alt={t("about.imageAlt")}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.01 }
                      : { duration: 0.9, ease: "easeInOut" }
                  }
                  draggable={false}
                  style={{ willChange: "opacity" }}
                />
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div variants={fadeUp} className="text-white space-y-7">
          <span className="uppercase tracking-[0.3em] text-orange-400 text-xs font-semibold">
            {t("about.kicker")}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            {t("about.title.line1")}
            <br />
            <span className="text-orange-400">{t("about.title.highlight")}</span>
          </h2>

          <p className="text-white/75 text-base leading-relaxed max-w-xl whitespace-pre-line">
            {t("about.desc")}
          </p>

          <p className="text-white/75 text-base leading-relaxed">
            {t("about.sizes")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            {[
              { label: t("about.stats.experience"), value: "15+" },
              { label: t("about.stats.products"), value: "102+" },
              { label: t("about.stats.partners"), value: "72+" },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  rounded-2xl p-6 text-center
                  bg-white/5 border border-white/10
                  shadow-md transition-all duration-300
                  hover:bg-white/10 hover:-translate-y-1
                "
              >
                <h3 className="text-3xl md:text-4xl font-extrabold text-orange-400">
                  {item.value}
                </h3>
                <p className="mt-1 text-xs md:text-sm uppercase tracking-widest text-white/70">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
})

export default About
