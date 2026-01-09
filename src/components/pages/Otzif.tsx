import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Jasmina Karimova",
    role: "Biznes egasi",
    text: "Mahsulot sifati juda yuqori. Buyurtmalar doimo o‘z vaqtida va mukammal bajariladi. Hamkorlikdan juda mamnunmiz.",
  },
  {
    name: "Akmal Rustamov",
    role: "Konsultant",
    text: "Zamonaviy texnologiyalar va professional jamoa. Extice bilan ishlash ishonchli va qulay.",
  }, 
  {
    name: "Madina Soliyeva",
    role: "Bloger, jurnalist",
    text: "Dizayn va mato sifati meni hayratda qoldirdi. Brend haqiqiy premium darajada.",
  },
  {
    name: "Diyorbek Jo‘rayev",
    role: "Mijoz",
    text: "Uzoq muddatli hamkorlik uchun ideal kompaniya. Sifat va mas’uliyat doimiy.",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}
const Testimonials = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-black via-[#0e0e0e] to-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-orange-500 uppercase tracking-widest text-sm font-semibold">
            ✦ 08. Mijozlar fikri
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4">
            Mijozlarimiz <br className="hidden sm:block" />
            Biz Haqimizda Nima Deydi
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
              whileHover={{ y: -8 }}
              className="
                bg-[#121212]
                rounded-3xl
                p-8
                border border-white/5
                shadow-xl
                hover:shadow-orange-500/10
                transition-all
              "
            >
              {/* Stars */}
              <div className="flex gap-1 text-orange-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              {/* Title */}
              <h4 className="font-bold text-lg mb-3">
                A’lo darajadagi xizmat
              </h4>

              {/* Text */}
              <p className="text-sm text-neutral-300 leading-relaxed mb-8">
                “{item.text}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center font-bold text-orange-500">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-neutral-400">{item.role}</p>
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
