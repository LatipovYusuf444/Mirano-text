import Navbar from "@/components/layout/Navbar";
import About from "@/components/pages/About";
import CatalogCarousel from "@/components/pages/CatalogCarusel";
import Figures from "@/components/pages/Figures";


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

      </section>

      <section id="location" className="scroll-mt-24">
        <Figures />
      </section>
    </>
  );
}
