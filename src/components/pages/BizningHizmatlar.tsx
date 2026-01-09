import { motion } from "framer-motion"
import { Scissors, Factory, Palette, Truck } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const services = [
  {
    title: "Maxsus Tikuv",
    desc: "Buyurtma asosida yuqori sifatli textile mahsulotlar.",
    icon: Scissors,
  },
  {
    title: "Zamonaviy Ishlab Chiqarish",
    desc: "Yangi texnologiyalar asosida ishlab chiqarish jarayoni.",
    icon: Factory,
  },
  {
    title: "Eksklyuziv Dizayn",
    desc: "Trend va an’anaviy uslublar uyg‘unligi.",
    icon: Palette,
  },
  {
    title: "Tezkor Yetkazib Berish",
    desc: "O‘z vaqtida va xavfsiz yetkazib berish xizmati.",
    icon: Truck,
  },
]

const FeaturedServices = () => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    let rafId: number
    const speed = 0.5 // 🔥 eng optimal

    const animate = () => {
      if (!paused) {
        slider.scrollLeft += speed

        // 🔁 Infinite loop (yarimiga qaytadi)
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
    <section className="w-full bg-neutral-950 py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="uppercase tracking-widest text-orange-400 text-sm font-semibold">
            02. Featured Services
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2">
            Bizning Xizmatlar
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
            className="
              flex gap-6
              overflow-x-hidden
              select-none
            "
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
                    bg-white/5
                    border border-white/10
                    p-8
                    backdrop-blur-xl
                    shadow-[0_20px_60px_rgba(0,0,0,0.45)]
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

        <p className="text-white/40 text-sm mt-6">
          ⟵ Avtomatik harakatlanadi, ustiga bosilsa to‘xtaydi
        </p>
      </div>
    </section>
  )
}

export default FeaturedServices
