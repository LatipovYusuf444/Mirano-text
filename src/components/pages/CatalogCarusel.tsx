import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import p6 from "@/assets/svg/Fiutbolka.kok.webp";
import p7 from "@/assets/svg/Fiutbolka.kok.webp";
import p8 from "@/assets/svg/Fiutbolka.kok.webp";
import p9 from "@/assets/svg/Fiutbolka.kok.webp";
import p10 from "@/assets/svg/Fiutbolka.kok.webp";
import p11 from "@/assets/svg/Fiutbolka.kok.webp";
import p12 from "@/assets/svg/Fiutbolka.kok.webp";
import p13 from "@/assets/svg/Fiutbolka.kok.webp";
import p14 from "@/assets/svg/Fiutbolka.kok.webp";
import p15 from "@/assets/svg/Fiutbolka.kok.webp";

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
  { id: "p11", name: "Chiffon Light", priceUZS: 199000, wholesaleUZS: 175000, sizes: ["S", "M", "L"], image: p11 },
  { id: "p12", name: "Gabardine Classic", priceUZS: 269000, wholesaleUZS: 239000, sizes: ["M", "L", "XL", "2XL"], image: p12 },
  { id: "p13", name: "Bamboo Eco Fabric", priceUZS: 239000, wholesaleUZS: 209000, sizes: ["S", "M", "L", "XL"], image: p13 },
  { id: "p14", name: "Terry Soft", priceUZS: 219000, wholesaleUZS: 189000, sizes: ["M", "L", "XL"], image: p14 },
  { id: "p15", name: "Poly Viscose Suiting", priceUZS: 319000, wholesaleUZS: 285000, sizes: ["S", "M", "L", "XL", "2XL"], image: p15 },
];

function formatUZS(value: number) {
  return `${new Intl.NumberFormat("uz-UZ").format(value)} so'm`;
}

function ProductCard({ p }: { p: Product }) {
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
      {/* ✅ IMAGE: kattaroq bo‘lsin */}
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
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Luxury highlights */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-white/5 to-transparent" />
        <div className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_30%_20%,rgba(255,180,80,0.18),transparent_55%)]" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_55%)]" />

        {/* Label */}
        <div className="absolute left-3 bottom-3 flex items-center gap-2">
          <Badge className="bg-orange-500/90 text-white border-0 shadow-md">Optom</Badge>
          <span className="text-white/80 text-xs drop-shadow">Premium</span>
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

        {/* Prices */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/15 bg-black/10 p-3">
            <p className="text-white/60 text-xs">Narxi</p>
            <p className="text-white font-bold text-sm sm:text-base">
              {formatUZS(p.priceUZS)}
            </p>
          </div>
          <div className="rounded-xl border border-white/15 bg-black/10 p-3">
            <p className="text-white/60 text-xs">Optom</p>
            <p className="text-white font-bold text-sm sm:text-base">
              {formatUZS(p.wholesaleUZS)}
            </p>
          </div>
        </div>

        {/* Sizes */}
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

        {/* ✅ ACTIONS olib tashlandi */}
      </div>
    </article>
  );
}

export default function CatalogCarousel() {
  const [isHover, setIsHover] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    []
  );

  const autoplayDelay = 1500;
  const autoplayRef = useRef<number | null>(null);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => {
      emblaApi?.scrollNext();
    }, autoplayDelay);
  }, [emblaApi, stopAutoplay]);

  useEffect(() => {
    if (!emblaApi) return;

    if (!isHover) startAutoplay();
    else stopAutoplay();

    const onPointerDown = () => stopAutoplay();
    const onPointerUp = () => {
      if (!isHover) startAutoplay();
    };

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);

    return () => {
      stopAutoplay();
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi, isHover, startAutoplay, stopAutoplay]);

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
