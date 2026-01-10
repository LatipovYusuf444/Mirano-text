import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Badge } from "@/components/ui/badge";

/**
 * Rasmlar:
 * src/assets/svg/....
 */
import p1 from "@/assets/svg/Fiutbolka.kok.webp";
import p2 from "@/assets/svg/futbolka.bejiviy.webp";
import p3 from "@/assets/svg/futbolka.karichniviy.webp";
import p4 from "@/assets/svg/photo_2026-01-08_14-50-06.webp";
import p5 from "@/assets/svg/photo_2026-01-08_14-56-46.webp";
import p6 from "@/assets/images/10.green.webp";
import p7 from "@/assets/images/10.webp";
import p8 from "@/assets/images/11.webp";
import p9 from "@/assets/images/12.webp";
import p10 from "@/assets/images/Дизайн без названия - 2025-11-04T155341.092.webp";

type Product = {
  id: string;
  name: string;
  priceUZS: number;
  wholesaleUZS: number;
  sizes: string[];
  image: string;
};

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
];

function formatUZS(value: number) {
  return `${new Intl.NumberFormat("uz-UZ").format(value)} so'm`;
}

/** ✅ Memo: re-render kamayadi */
const ProductCard = React.memo(function ProductCard({ p }: { p: Product }) {
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
          // ✅ GPU hint: “qotish”ni kamaytiradi
          style={{ willChange: "transform" }}
        />

        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-white/5 to-transparent" />
        <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_30%_20%,rgba(255,180,80,0.18),transparent_55%)]" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_55%)]" />

        <div className="absolute left-3 bottom-3 flex items-center gap-2">
          <Badge className="bg-orange-500/90 text-white border-0 shadow-md">Optom</Badge>
          <span className="text-white/80 text-xs drop-shadow">Narxlarda</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="space-y-1">
          <h3 className="text-white font-semibold text-base sm:text-lg leading-snug drop-shadow">
            {p.name}
          </h3>
          <p className="text-white/75 text-xs sm:text-sm">
            Yuqori sifat • Zamonaviy to‘quv • Tez yetkazish
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/15 bg-black/10 p-3">
            <p className="text-white/60 text-xs">Narxi</p>
            <p className="text-white font-bold text-sm sm:text-base">{formatUZS(p.priceUZS)}</p>
          </div>
          <div className="rounded-xl border border-white/15 bg-black/10 p-3">
            <p className="text-white/60 text-xs">Optom</p>
            <p className="text-white font-bold text-sm sm:text-base">{formatUZS(p.wholesaleUZS)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-white/70 text-xs">Razmer:</span>
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
  );
});

export default function CatalogCarousel() {
  const [isHover, setIsHover] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      // ✅ embla “qotish”ni kamaytiradi
      containScroll: "trimSnaps",
      dragFree: false,
    },
    []
  );

  // ✅ Interval o‘rniga raf + timestamp (stabillik + kam jitter)
  const autoplayDelay = 1500;
  const rafId = useRef<number | null>(null);
  const lastTick = useRef<number>(0);

  const stopAutoplay = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  const play = useCallback(
    (t: number) => {
      if (!emblaApi) return;

      // tab background bo‘lsa qattiq ishlamasin
      if (document.hidden) {
        lastTick.current = t;
        rafId.current = requestAnimationFrame(play);
        return;
      }

      if (!lastTick.current) lastTick.current = t;

      const elapsed = t - lastTick.current;
      if (elapsed >= autoplayDelay) {
        // ✅ embla ready bo‘lsa scroll qilamiz
        if (emblaApi.canScrollNext()) emblaApi.scrollNext();
        lastTick.current = t;
      }

      rafId.current = requestAnimationFrame(play);
    },
    [emblaApi]
  );

  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;
    stopAutoplay();
    lastTick.current = 0;
    rafId.current = requestAnimationFrame(play);
  }, [emblaApi, play, stopAutoplay]);

  useEffect(() => {
    if (!emblaApi) return;

    if (!isHover) startAutoplay();
    else stopAutoplay();

    // ✅ pointer events: mouse/touch hammasi uchun
    const onPointerDown = () => stopAutoplay();
    const onPointerUp = () => {
      if (!isHover) startAutoplay();
    };

    const onVisibility = () => {
      if (document.hidden) stopAutoplay();
      else if (!isHover) startAutoplay();
    };

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopAutoplay();
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [emblaApi, isHover, startAutoplay, stopAutoplay]);

  // ✅ memo — stable
  const slides = useMemo(() => PRODUCTS, []);

  return (
    <section className="relative z-10 px-4 md:px-16 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow">
            Catalog
          </h2>
          <p className="text-white/75 mt-2 text-sm sm:text-base">
            Auto carousel • hover bo‘lsa to‘xtaydi • luxury glass cards
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
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
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
