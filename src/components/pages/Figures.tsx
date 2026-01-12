import { memo, useEffect, useMemo, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import bgImage from "@/assets/svg/ChatGPT Image 10 янв. 2026 г., 14_29_19.webp"
import { useTranslation } from "react-i18next"

interface CounterProps {
  target: number
  suffix?: string
  duration?: number
}

const Counter = memo(function Counter({
  target,
  suffix = "",
  duration = 2000,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4, margin: "200px" })
  const reduceMotion = useReducedMotion()

  const [count, setCount] = useState(0)

  const rafId = useRef<number | null>(null)
  const startTime = useRef<number>(0)
  const lastValue = useRef<number>(-1)

  useEffect(() => {
    if (!isInView) return

    if (reduceMotion) {
      setCount(target)
      return
    }

    const stop = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }

    const tick = (t: number) => {
      if (document.hidden) {
        rafId.current = requestAnimationFrame(tick)
        return
      }

      if (!startTime.current) startTime.current = t

      const progress = Math.min((t - startTime.current) / duration, 1)
      const value = Math.floor(progress * target)

      if (value !== lastValue.current) {
        lastValue.current = value
        setCount(value)
      }

      if (progress < 1) rafId.current = requestAnimationFrame(tick)
      else {
        setCount(target)
        stop()
      }
    }

    startTime.current = 0
    lastValue.current = -1
    setCount(0)

    rafId.current = requestAnimationFrame(tick)

    const onVis = () => { }
    document.addEventListener("visibilitychange", onVis)

    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [isInView, target, duration, reduceMotion])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
})

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const Figures = () => {
  const { t } = useTranslation()

  const bgStyle = useMemo(
    () => ({
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    []
  )

  const sectionRef = useRef<HTMLElement | null>(null)
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.2, margin: "150px" })

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center text-white pt-20 pb-20"
      style={bgStyle}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="text-orange-500 font-semibold tracking-widest uppercase text-sm">
              {t("figures.kicker")}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight whitespace-pre-line">
              {t("figures.title")}
            </h1>

            <p className="text-neutral-300 max-w-xl">
              {t("figures.desc")}
            </p>
          </motion.div>

          {/* RIGHT STATS */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-10"
          >
            <div className="space-y-2">
              <h3 className="text-5xl font-extrabold">
                <Counter target={26} suffix="+" />
              </h3>
              <p className="font-semibold">{t("figures.stats.exp.title")}</p>
              <p className="text-sm text-neutral-400">
                {t("figures.stats.exp.desc")}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-5xl font-extrabold">
                <Counter target={690} suffix="K" />
              </h3>
              <p className="font-semibold">{t("figures.stats.monthly.title")}</p>
              <p className="text-sm text-neutral-400">
                {t("figures.stats.monthly.desc")}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-5xl font-extrabold">
                <Counter target={99} suffix="%" />
              </h3>
              <p className="font-semibold">{t("figures.stats.satisfaction.title")}</p>
              <p className="text-sm text-neutral-400">
                {t("figures.stats.satisfaction.desc")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Figures
