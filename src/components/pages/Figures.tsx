import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import bgImage from "@/assets/svg/ChatGPT Image 10 янв. 2026 г., 14_29_19.webp"

interface CounterProps {
  target: number
  suffix?: string
  duration?: number
}

const Counter: React.FC<CounterProps> = ({
  target,
  suffix = "",
  duration = 2000,
}) => {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const Figures = () => {
  return (
    <section
      className="relative w-full min-h-screen flex items-center text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="text-orange-500 font-semibold tracking-widest uppercase text-sm">
              ✦ 02. Asosiy Ko‘rsatkichlar
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              To‘qimachilik <br />
              Sanoatining <br />
              Kelajagini <br />
              Yaratmoqdamiz
            </h1>

            <p className="text-neutral-300 max-w-xl">
              Biz mahsulot va ishlab chiqarish jarayonlarini rivojlantirishda
              barqarorlik, sifat va inson omilini birinchi o‘ringa qo‘yamiz.
              Atrof-muhit va jamiyatni asrash — bizning ustuvor maqsadimiz.
            </p>
          </motion.div>

          {/* RIGHT STATS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-10"
          >
            {/* 26+ */}
            <div className="space-y-2">
              <h3 className="text-5xl font-extrabold">
                <Counter target={26} suffix="+" />
              </h3>
              <p className="font-semibold">Yillik Tajriba</p>
              <p className="text-sm text-neutral-400">
                O‘n yillardan ortiq muvaffaqiyatli ishlab chiqarish tajribasi.
              </p>
            </div>

            {/* 690K */}
            <div className="space-y-2">
              <h3 className="text-5xl font-extrabold">
                <Counter target={690} suffix="K" />
              </h3>
              <p className="font-semibold">Oylik Ishlab Chiqarish</p>
              <p className="text-sm text-neutral-400">
                Har oy 690 ming metr mato ishlab chiqariladi.
              </p>
            </div>

            {/* 99% */}
            <div className="space-y-2">
              <h3 className="text-5xl font-extrabold">
                <Counter target={99} suffix="%" />
              </h3>
              <p className="font-semibold">Mijozlar Qoniqishi</p>
              <p className="text-sm text-neutral-400">
                Natijaga asoslangan uzoq muddatli hamkorlik.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Figures
