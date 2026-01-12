import { motion } from "framer-motion"
import { Instagram, Send, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react"

import bgImage from "@/assets/svg/shirt-mockup-concept-with-plain-clothing.webp"
import LuxuryMapCard from "@/components/pages/UzbekistanLocationCard"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const Footer = () => {
  return (
    <footer
      className="relative text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24">
        {/* ✅ FULL WIDTH LOCATION (TOP) */}
        <motion.div
          id="location"
          className="mb-14 scroll-mt-32"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <LuxuryMapCard
            title="Bizning manzil"
            address="Andijon viloyati, Andijon shahri"
            lat={40.709533}
            lng={72.55911}
            mapHeightClassName="h-[320px] md:h-[420px] lg:h-[520px]"
          />
        </motion.div>

        {/* TOP GRID */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14"
        >
          {/* BRAND */}
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold tracking-wide">
              MIRANO<span className="text-orange-500">.</span>
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed max-w-md">
              Biz texnik to‘qimachilik sohasida sifat, ishonch va innovatsiyani
              birlashtirgan holda xalqaro darajadagi mahsulotlar ishlab chiqaramiz.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/mirabrand_uz?igsh=MWxmdDJ5czR3cWxmZg=="
                target="_blank"
                className="p-3 rounded-full bg-white/10 hover:bg-orange-500 transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://t.me/mirabrand_uz"
                target="_blank"
                className="p-3 rounded-full bg-white/10 hover:bg-orange-500 transition"
              >
                <Send size={20} />
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Tezkor Havolalar</h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              {["Biz haqimizda", "Xizmatlar", "Mahsulotlar", "Blog", "Aloqa"].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-orange-500 transition inline-flex items-center gap-1"
                    >
                      {item} <ArrowUpRight size={14} />
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Aloqa uchun</h4>

            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Phone size={16} className="text-orange-500" />
              +998 (90) 770 40 40
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Mail size={16} className="text-orange-500" />
              info@mirano.uz
            </div>

            <div className="flex items-start gap-3 text-sm text-neutral-300">
              <MapPin size={16} className="text-orange-500 mt-1" />
              Andijon viloyati
            </div>
          </div>
          {/* OPTIONAL: EXTRA COLUMN (agar 4-col bo‘sh qolmasin desangiz) */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Ish vaqti</h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Dushanba - Shanba: 08:00 - 18:00
              <br />
              Yakshanba: Dam olish
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-neutral-200 font-semibold">
                Taklif/Buyurtma
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Biz bilan bog‘laning — tez javob beramiz.
              </p>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM */}
        <div className="mt-20 border-t border-white/10 pt-6 text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} Mirano Textile. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  )
}

export default Footer
