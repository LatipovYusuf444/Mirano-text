import { motion } from "framer-motion"
import { Instagram, Send, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react"
import { useTranslation } from "react-i18next"

import bgImage from "@/assets/svg/shirt-mockup-concept-with-plain-clothing.webp"
import LuxuryMapCard from "@/components/pages/UzbekistanLocationCard"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const Footer = () => {
  const { t } = useTranslation()

  const quickLinks = [
    t("footer.links.about"),
    t("footer.links.services"),
    t("footer.links.products"),
    t("footer.links.blog"),
    t("footer.links.contact"),
  ]

  return (
    <footer
      className="relative text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24">
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
            title={t("footer.map.title")}
            address={t("footer.map.address")}
            lat={40.709533}
            lng={72.55911}
            mapHeightClassName="h-[320px] md:h-[420px] lg:h-[520px]"
          />
        </motion.div>

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
              {t("footer.brand.desc")}
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/mirabrand_uz?igsh=MWxmdDJ5czR3cWxmZg=="
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-orange-500 transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://t.me/mirabrand_uz"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-orange-500 transition"
              >
                <Send size={20} />
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">{t("footer.links.title")}</h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              {quickLinks.map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition inline-flex items-center gap-1"
                  >
                    {item} <ArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">{t("footer.contact.title")}</h4>

            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Phone size={16} className="text-orange-500" />
              {t("footer.contact.phone")}
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Mail size={16} className="text-orange-500" />
              {t("footer.contact.email")}
            </div>

            <div className="flex items-start gap-3 text-sm text-neutral-300">
              <MapPin size={16} className="text-orange-500 mt-1" />
              {t("footer.contact.region")}
            </div>
          </div>

          {/* WORK TIME */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">{t("footer.hours.title")}</h4>

            <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
              {t("footer.hours.text")}
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-neutral-200 font-semibold">
                {t("footer.card.title")}
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                {t("footer.card.desc")}
              </p>
            </div>
          </div>
        </motion.div>
        <div className="mt-20 border-t border-white/10 pt-6 text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} {t("footer.bottom")}
        </div>
      </div>
    </footer>
  )
}

export default Footer
