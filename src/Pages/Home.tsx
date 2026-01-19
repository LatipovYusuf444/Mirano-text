import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import About from "@/components/pages/About"
import FeaturedServices from "@/components/pages/BizningHizmatlar"
import CatalogCarousel from "@/components/pages/CatalogCarusel"
import Figures from "@/components/pages/Figures"
import Testimonials from "@/components/pages/Otzif"

export default function HomePage() {
  return (
    <>
      <Navbar />

      <section
        id="catalog"
        className="
          relative scroll-mt-24
          bg-gradient-to-b
          from-[#0b0b0f]
          via-[#0f1117]
          to-[#0b0b0f]
        "
      >
        <CatalogCarousel />
      </section>

      <section id="malumotlar" className="scroll-mt-24">
        <About />
      </section>

      <section id="biz-haqimizda" className="scroll-mt-24">
        <FeaturedServices />
      </section>
      <Testimonials />
      {/* ✅ oldingi location endi figures bo‘ldi */}
      <section id="figures" className="scroll-mt-24">
        <Figures />
      </section>
      <Footer />
    </>
  )
}
