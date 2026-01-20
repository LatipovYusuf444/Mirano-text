import { motion } from "framer-motion"
import {
  Instagram,
  Send,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Youtube,
} from "lucide-react"
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

  // ✅ WhatsApp: telefonni o'zingiznikiga moslab qo'ying (998XXXXXXXXX)
  const whatsappPhone = "998901234567"
  const whatsappLink = `https://wa.me/${whatsappPhone}`

  // ✅ YouTube: kanal linkini o'zingiznikiga moslab qo'ying
  const youtubeLink = "https://www.youtube.com/"

  // ✅ Manzil (o‘zbekcha)
  const addressUz = "Andijon viloyati, Jalalkuduk tumani"

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
            // ✅ manzilni o'zbekcha qilib qo'ydik
            address={addressUz}
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

            {/* ✅ Social icons: Instagram, Telegram, YouTube, WhatsApp */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/mirano_uzb?igsh=MWxmdDJ5czR3cWxmZg=="
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-orange-500 transition"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>

              <a
                href="https://t.me/mirabrand_uz"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-orange-500 transition"
                aria-label="Telegram"
                title="Telegram"
              >
                <Send size={20} />
              </a>

              <a
                href="http://www.youtube.com/@Mirano-textile"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-orange-500 transition"
                aria-label="YouTube"
                title="YouTube"
              >
                <Youtube size={20} />
              </a>

              <a
                href="https://wa.me/message/GO2UXI6SGHW4C1"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-orange-500 transition"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                {/* lucide-react'da WhatsApp ikoni yo'q, shuning uchun SVG ishlatyapmiz */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19.11 17.43c-.27-.14-1.6-.79-1.84-.88-.25-.09-.43-.14-.62.14-.18.27-.71.88-.88 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.33-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.06-.22-.53-.45-.46-.62-.46l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.99 2.65 1.13 2.84.14.18 1.95 2.98 4.73 4.18.66.28 1.17.45 1.57.58.66.21 1.27.18 1.75.11.53-.08 1.6-.65 1.82-1.28.23-.62.23-1.15.16-1.28-.06-.12-.25-.2-.52-.34zM16.03 5.33c-5.86 0-10.62 4.76-10.62 10.62 0 1.86.49 3.67 1.42 5.26L5.33 26.67l5.62-1.47c1.53.83 3.25 1.27 5.08 1.27 5.86 0 10.62-4.76 10.62-10.62S21.89 5.33 16.03 5.33zm0 19.33c-1.7 0-3.36-.46-4.78-1.32l-.34-.2-3.34.87.89-3.26-.22-.33c-.94-1.44-1.44-3.11-1.44-4.82 0-4.98 4.05-9.03 9.03-9.03s9.03 4.05 9.03 9.03-4.05 9.06-9.03 9.06z" />
                </svg>
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
              {/* ✅ manzilni o'zbekcha */}
              {addressUz}
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
