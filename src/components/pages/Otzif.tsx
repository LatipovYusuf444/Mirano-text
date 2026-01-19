import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const Testimonials = () => {
  const { t } = useTranslation()

  const testimonials = useMemo(
    () => [
      {
        name: t("testimonials.items.0.name"),
        role: t("testimonials.items.0.role"),
        text: t("testimonials.items.0.text"),
      },
      {
        name: t("testimonials.items.1.name"),
        role: t("testimonials.items.1.role"),
        text: t("testimonials.items.1.text"),
      },
      {
        name: t("testimonials.items.2.name"),
        role: t("testimonials.items.2.role"),
        text: t("testimonials.items.2.text"),
      },
      {
        name: t("testimonials.items.3.name"),
        role: t("testimonials.items.3.role"),
        text: t("testimonials.items.3.text"),
      },
    ],
    [t]
  )

  return (
    <section
      className="
        relative overflow-hidden py-28 text-white
        bg-gradient-to-b
        from-[#1e293b]   /* OCH KO‘K */
        via-[#0f172a]    /* DARK BLUE */
        to-[#020617]     /* DEEP DARK */
      "
    >
      {/* 🔥 KATTA GRADIENT GLOW (aniq ko‘rinadi) */}
      <div className="pointer-events-none absolute -top-64 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-sky-500/25 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 right-[-200px] h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-orange-500/15 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-orange-400 uppercase tracking-widest text-sm font-semibold">
            {t("testimonials.kicker")}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="
                bg-white/10 backdrop-blur-xl
                rounded-3xl p-8
                border border-white/20
                shadow-[0_25px_70px_rgba(0,0,0,0.45)]
                transition-all
              "
            >
              <div className="flex gap-1 text-orange-400 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
              </div>

              <h4 className="font-bold text-lg mb-3">
                {t("testimonials.cardTitle")}
              </h4>

              <p className="text-sm text-white/80 leading-relaxed mb-8">
                “{item.text}”
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/30 flex items-center justify-center font-bold text-orange-400">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-white/60">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
