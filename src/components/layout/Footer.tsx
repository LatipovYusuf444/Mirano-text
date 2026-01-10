import { motion } from "framer-motion"
import {
  Instagram,
  Send,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react"
import bgImage from "@/assets/svg/shirt-mockup-concept-with-plain-clothing.webp"

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

        {/* TOP */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-14"
        >

          {/* BRAND */}
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold tracking-wide">
              MIRANO<span className="text-orange-500">.</span>
            </h2>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Biz texnik to‘qimachilik sohasida sifat, ishonch va innovatsiyani
              birlashtirgan holda xalqaro darajadagi mahsulotlar ishlab chiqaramiz.
            </p>

            {/* Socials */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/"
                target="_blank"
                className="p-3 rounded-full bg-white/10 hover:bg-orange-500 transition"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                className="p-3 rounded-full bg-white/10 hover:bg-orange-500 transition"
              >
                <Send size={18} />
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

          {/* NEWSLETTER */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Yangiliklarga obuna</h4>
            <p className="text-sm text-neutral-300">
              Eng so‘nggi yangiliklar va takliflardan xabardor bo‘ling.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 outline-none text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-400 transition font-semibold"
              >
                Obuna
              </button>
            </form>
          </div>

          {/* CONTACT */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Aloqa</h4>

            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Phone size={16} className="text-orange-500" />
              +998 (90) 123-45-67
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Mail size={16} className="text-orange-500" />
              info@mirano.uz
            </div>

            <div className="flex items-start gap-3 text-sm text-neutral-300">
              <MapPin size={16} className="text-orange-500 mt-1" />
              Namangan viloyati
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
