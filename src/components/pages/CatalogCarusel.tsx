import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"

/**
 * Rasmlar:
 * src/assets/svg/....
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
  priceUZS: number
  wholesaleUZS: number
  sizes: string[]
  image: string
}

const PRODUCTS: Product[] = [
  { id: "p1", name: "Premium Cotton Fabric", priceUZS: 189000, wholesaleUZS: 165000, sizes: ["S", "M", "L", "XL"], image: p1 },
  { id: "p2", name: "Luxury Satin Textile", priceUZS: 249000, wholesaleUZS: 219000, sizes: ["S", "M", "L"], image: p2 },
  { id: "p3", name: "Soft Linen Blend", priceUZS: 209000, wholesaleUZS: 179000, sizes: ["M", "L", "XL", "2XL"], image: p3 },
  { id: "p4", name: "Silk Touch Material", priceUZS: 329000, wholesaleUZS: 295000, sizes: ["S", "M", "L", "XL"], image: p4 },
  { id: "p5", name: "Denim Strong Weave", priceUZS: 279000, wholesaleUZS: 245000, sizes: ["M", "L", "XL"], image: p5 },
  { id: "p6", name: "Velvet Premium", priceUZS: 359000, wholesaleUZS: 319000, sizes: ["S", "M", "L"], image: p6 },
  { id: "p7", name: "Wool Mix Warm", priceUZS: 399000, wholesaleUZS: 349000, sizes: ["L", "XL", "2XL"], image: p7 },
  { id: "p8", name: "Jersey Knit", priceUZS: 159000, wholesaleUZS: 139000, sizes: ["S", "M", "L", "XL", "2XL"], image: p8 },
  { id: "p9", name: "Ribbed Cotton", priceUZS: 175000, wholesaleUZS: 155000, sizes: ["S", "M", "L"], image: p9 },
  { id: "p10", name: "Canvas Heavy Duty", priceUZS: 289000, wholesaleUZS: 255000, sizes: ["M", "L", "XL"], image: p10 },
]

function formatUZS(value: number) {
  return `${new Intl.NumberFormat("uz-UZ").format(value)} so'm`
}

/** ✅ prefers-reduced-motion bo‘lsa autoplay o‘chadi (qotish kam) */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    if (!m) return
    const onChange = () => setReduced(m.matches)
    onChange()
    m.addEventListener?.("change", onChange)
    return () => m.removeEventListener?.("change", onChange)
  }, [])

  return reduced
}

/** ✅ Memo: re-render kamayadi */
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
        hover:border-white/25 hover:bg-white/12
        transition-all duration-300
      "
    >
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src={p.image}
          alt={p.name}
          className="
            absolute inset-0 h-full w-full
            object-contain object-center
            p-1
            transition-transform duration-700
            group-hover:scale-[1.06]
          "
          loading="lazy"
          decoding="async"
          style={{ willChange: "transform" }}
        />

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-white/5 to-transparent" />
        <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_30%_20%,rgba(255,180,80,0.18),transparent_55%)]" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_55%)]" />

        <div className="absolute left-3 bottom-3 flex items-center gap-2">
          <Badge className="bg-orange-500/90 text-white border-0 shadow-md">
            {t("catalog.badgeWholesale")}
          </Badge>
          <span className="text-white/80 text-xs drop-shadow">
            {t("catalog.badgeHint")}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="space-y-1">
          <h3 className="text-white font-semibold text-base sm:text-lg leading-snug drop-shadow">
            {p.name}
          </h3>
          <p className="text-white/75 text-xs sm:text-sm">
            {t("catalog.subtitle")}
          </p>
        </div>

        {/* ✅ Narxlar blokini OLIB TASHLADIK, o'rniga 1ta katta yozuv qo'ydik */}
        <div className="rounded-xl border border-white/15 bg-black/10 p-3">
          <p className="text-white font-extrabold text-sm sm:text-base text-center drop-shadow">
            Buyurtma asosida tayyorlash <br />
            Minimal Zakaz 5000 ta Dona
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-white/70 text-xs">{t("catalog.size")}:</span>
          {p.sizes.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="bg-white/10 text-white border border-white/15 hover:bg-white/15 transition"
            >
              {s}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  )
})

export default function CatalogCarousel() {
  const { t } = useTranslation()

  const [isHover, setIsHover] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      containScroll: "trimSnaps",
      dragFree: false,
    },
    []
  )

  const intervalId = useRef<number | null>(null)

  const stopAutoplay = useCallback(() => {
    if (intervalId.current) {
      window.clearInterval(intervalId.current)
      intervalId.current = null
    }
  }, [])

  const startAutoplay = useCallback(() => {
    if (!emblaApi) return
    stopAutoplay()

    if (reducedMotion || isHover || document.hidden) return

    intervalId.current = window.setInterval(() => {
      if (!emblaApi) return
      emblaApi.scrollNext()
    }, 2500)
  }, [emblaApi, isHover, reducedMotion, stopAutoplay])

  useEffect(() => {
    if (!emblaApi) return

    const onPointerDown = () => stopAutoplay()
    const onPointerUp = () => startAutoplay()
    const onVisibility = () => {
      if (document.hidden) stopAutoplay()
      else startAutoplay()
    }

    emblaApi.on("pointerDown", onPointerDown)
    emblaApi.on("pointerUp", onPointerUp)
    document.addEventListener("visibilitychange", onVisibility)

    startAutoplay()

    return () => {
      stopAutoplay()
      emblaApi.off("pointerDown", onPointerDown)
      emblaApi.off("pointerUp", onPointerUp)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [emblaApi, startAutoplay, stopAutoplay])

  const slides = useMemo(() => PRODUCTS, [])

  return (
    <section className="relative z-10 px-4 md:px-16 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow">
            {t("catalog.title")}
          </h2>
          <p className="text-white/75 mt-2 text-sm sm:text-base">
            {t("catalog.topHint")}
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onTouchStart={() => setIsHover(true)}
          onTouchEnd={() => setIsHover(false)}
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex -ml-4">
              {slides.map((p) => (
                <div
                  key={p.id}
                  className="
                    pl-4
                    flex-[0_0_92%]
                    sm:flex-[0_0_50%]
                    lg:flex-[0_0_33.333%]
                  "
                >
                  <ProductCard p={p} t={t} />
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/40 to-transparent" />
        </div>
      </div>
      <div className="flex justify-center mt-10 mb-5 px-4">
        <div
          className="
      max-w-4xl
      w-full
      rounded-3xl
      bg-white/10
      backdrop-blur-xl
      border border-white/20
      shadow-[0_20px_60px_rgba(0,0,0,0.45)]
      px-8 py-6
      text-center
    "
        >
          <p
            className="
        text-white
        text-lg sm:text-xl md:text-2xl
        font-semibold
        leading-relaxed
        tracking-wide
        drop-shadow
      "
          >
            Narxi kelishilgan holda va shartnoma orqali naqd pul yoki pul o‘tkazmasi bilan ishlaniladi
          </p>
        </div>
      </div>

    </section>
  )
}
