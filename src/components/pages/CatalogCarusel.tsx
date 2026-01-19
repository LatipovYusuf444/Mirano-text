import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"

/**
 * Rasmlar
 */
import p1 from "@/assets/svg/Fiutbolka.kok.webp"
import p2 from "@/assets/svg/futbolka.bejiviy.webp"
import p3 from "@/assets/svg/futbolka.karichniviy.webp"
import p4 from "@/assets/svg/photo_2026-01-08_14-50-06.webp"
import p5 from "@/assets/svg/photo_2026-01-08_14-56-46.webp"
import p6 from "@/assets/images/10.green.webp"
import p7 from "@/assets/images/10.webp"
import p8 from "@/assets/images/11.webp"
import p9 from "@/assets/images/12.webp"
import p10 from "@/assets/images/Дизайн без названия - 2025-11-04T155341.092.webp"

type Product = {
  id: string
  name: string
  sizes: string[]
  image: string
}

const PRODUCTS: Product[] = [
  { id: "p1", name: "Premium Cotton Fabric", sizes: ["S", "M", "L", "XL"], image: p1 },
  { id: "p2", name: "Luxury Satin Textile", sizes: ["S", "M", "L"], image: p2 },
  { id: "p3", name: "Soft Linen Blend", sizes: ["M", "L", "XL", "2XL"], image: p3 },
  { id: "p4", name: "Silk Touch Material", sizes: ["S", "M", "L", "XL"], image: p4 },
  { id: "p5", name: "Denim Strong Weave", sizes: ["M", "L", "XL"], image: p5 },
  { id: "p6", name: "Velvet Premium", sizes: ["S", "M", "L"], image: p6 },
  { id: "p7", name: "Wool Mix Warm", sizes: ["L", "XL", "2XL"], image: p7 },
  { id: "p8", name: "Jersey Knit", sizes: ["S", "M", "L", "XL", "2XL"], image: p8 },
  { id: "p9", name: "Ribbed Cotton", sizes: ["S", "M", "L"], image: p9 },
  { id: "p10", name: "Canvas Heavy Duty", sizes: ["M", "L", "XL"], image: p10 },
]

/* ---------- Card ---------- */
const ProductCard = memo(function ProductCard({
  p,
  t,
}: {
  p: Product
  t: (key: string) => string
}) {
  return (
    <article
      className="
        group h-full rounded-2xl overflow-hidden
        border border-white/15
        bg-white/10 backdrop-blur-xl
        shadow-[0_12px_50px_rgba(0,0,0,0.35)]
        transition-all duration-300
      "
    >
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-[1.05]"
          loading="lazy"
        />

        <div className="absolute left-3 bottom-3">
          <Badge className="bg-orange-500/90 text-white border-0">
            {t("catalog.badgeWholesale")}
          </Badge>
        </div>
      </div>

      <div className="p-5 space-y-4 text-white">
        <h3 className="font-semibold text-lg">{p.name}</h3>

        {/* ✅ NARX O‘RNIGA TRANSLATE MATN */}
        <div className="rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-center">
          <p className="font-semibold">{t("catalog.orderTitle")}</p>
          <p className="text-xs text-white/70 mt-1">{t("catalog.orderMin")}</p>
        </div>

        <div className="flex flex-wrap gap-2 items-center text-xs text-white/70">
          <span>{t("catalog.size")}:</span>
          {p.sizes.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="bg-white/10 text-white border border-white/15"
            >
              {s}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  )
})

/* ---------- Carousel ---------- */
export default function CatalogCarousel() {
  const { t } = useTranslation()
  const [isHover, setIsHover] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const timer = useRef<number | null>(null)

  const stop = useCallback(() => {
    if (timer.current) {
      window.clearInterval(timer.current)
      timer.current = null
    }
  }, [])

  const start = useCallback(() => {
    if (!emblaApi) return
    stop()
    if (isHover || document.hidden) return

    timer.current = window.setInterval(() => {
      emblaApi.scrollNext()
    }, 2500)
  }, [emblaApi, isHover, stop])

  useEffect(() => {
    if (!emblaApi) return
    start()

    const onVis = () => {
      if (document.hidden) stop()
      else start()
    }

    document.addEventListener("visibilitychange", onVis)
    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [emblaApi, start, stop])

  useEffect(() => {
    start()
  }, [isHover, start])

  const slides = useMemo(() => PRODUCTS, [])

  return (
    <section
      className="
        relative z-10
        px-4 md:px-16 py-20
        bg-gradient-to-b
        from-[#0b1220]
        via-[#0f1a2e]
        via-[#141f35]
        to-[#0a0f1c]
        overflow-hidden
      "
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onTouchStart={() => setIsHover(true)}
      onTouchEnd={() => setIsHover(false)}
    >
      {/* soft luxury overlay */}
      <div
        className="
          absolute inset-0 pointer-events-none
          [background:radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]
        "
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/0 via-black/15 to-black/35" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white">{t("catalog.title")}</h2>
        <p className="text-white/70 mt-2">{t("catalog.topHint")}</p>

        <div className="mt-10 relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex -ml-4">
              {slides.map((p) => (
                <div
                  key={p.id}
                  className="pl-4 flex-[0_0_90%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <ProductCard p={p} t={t} />
                </div>
              ))}
            </div>
          </div>

          {/* edge fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/35 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/35 to-transparent" />
        </div>

        {/* ✅ pastdagi uzun glass text ham translate */}
        <div className="mt-16 flex justify-center">
          <div
            className="
              rounded-2xl
              bg-white/10 backdrop-blur-xl
              border border-white/20
              px-8 py-5
              text-white text-center
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            "
          >
            {t("catalog.note")}
          </div>
        </div>
      </div>
    </section>
  )
}
