import { memo, useMemo } from "react"
import { MapPin, Navigation, ExternalLink } from "lucide-react"

type Props = {
  title?: string
  address?: string

  // 1) Agar lat/lng bo‘lsa — shu ishlaydi
  lat?: number
  lng?: number

  // 2) Yoki joy nomi / query (masalan: "Amir Temur xiyoboni" yoki "Mirano Textile Namangan")
  placeQuery?: string

  travelMode?: "driving" | "walking" | "transit"

  // ✅ footerda width/height boshqarish uchun
  className?: string
  mapHeightClassName?: string
}

function openDirections({
  lat,
  lng,
  placeQuery,
  travelMode,
}: {
  lat?: number
  lng?: number
  placeQuery?: string
  travelMode: string
}) {
  const destination = placeQuery
    ? placeQuery
    : lat != null && lng != null
      ? `${lat},${lng}`
      : ""

  if (!destination) return

  // origin bo‘lsa ham, bo‘lmasa ham Google o‘zi hal qiladi
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const origin = `${pos.coords.latitude},${pos.coords.longitude}`
        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
          origin
        )}&destination=${encodeURIComponent(destination)}&travelmode=${encodeURIComponent(
          travelMode
        )}`
        window.open(url, "_blank", "noopener,noreferrer")
      },
      () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          destination
        )}&travelmode=${encodeURIComponent(travelMode)}`
        window.open(url, "_blank", "noopener,noreferrer")
      },
      { maximumAge: 60_000, timeout: 7000 }
    )
  } else {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      destination
    )}&travelmode=${encodeURIComponent(travelMode)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }
}

function openInGoogleMaps({
  lat,
  lng,
  placeQuery,
}: {
  lat?: number
  lng?: number
  placeQuery?: string
}) {
  const q = placeQuery ? placeQuery : lat != null && lng != null ? `${lat},${lng}` : ""
  if (!q) return

  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
  window.open(url, "_blank", "noopener,noreferrer")
}

const LuxuryMapCard = memo(function LuxuryMapCard({
  title = "Bizning manzil",
  address = "O‘zbekiston",
  lat,
  lng,
  placeQuery = "Amir Temur xiyoboni",
  travelMode = "driving",

  // ✅ NEW defaultlar
  className = "",
  mapHeightClassName = "h-[260px] md:h-[280px]",
}: Props) {
  const mapSrc = useMemo(() => {
    const q = placeQuery || (lat != null && lng != null ? `${lat},${lng}` : "Uzbekistan")
    return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=14&output=embed`
  }, [placeQuery, lat, lng])

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        border border-white/12
        bg-white/6 backdrop-blur-xl
        shadow-[0_24px_80px_rgba(0,0,0,0.60)]
        ${className}
      `}
    >
      {/* Luxury shine */}
      <div className="pointer-events-none absolute -inset-24 opacity-70 [background:radial-gradient(circle_at_18%_12%,rgba(255,165,0,0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/25" />

      <div className="relative p-4">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <p className="text-sm font-semibold text-white truncate">{title}</p>
            </div>
            <p className="text-xs text-neutral-300 mt-1">{address}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openDirections({ lat, lng, placeQuery, travelMode })}
              className="
                inline-flex items-center gap-2
                rounded-xl px-3 py-2
                bg-orange-500/90 hover:bg-orange-500
                text-white text-xs font-semibold
                shadow-md transition
                border border-orange-300/20
              "
              type="button"
            >
              <Navigation className="w-4 h-4" />
              Marshrut
            </button>

            <button
              onClick={() => openInGoogleMaps({ lat, lng, placeQuery })}
              className="
                inline-flex items-center gap-2
                rounded-xl px-3 py-2
                bg-white/10 hover:bg-white/15
                text-white text-xs font-semibold
                border border-white/12 transition
              "
              type="button"
              title="Google Maps’da ochish"
              aria-label="Google Maps’da ochish"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Map frame */}
        <div className="mt-4 relative overflow-hidden rounded-xl border border-white/10 bg-black/25">
          <iframe
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={`w-full ${mapHeightClassName} block`}
            allowFullScreen
          />

          <div className="px-3 py-2 text-[11px] text-white/70 border-t border-white/10 bg-black/30">
            📌 Xarita interaktiv: zoom/drag ishlaydi. “Marshrut” bosilsa yo‘nalish ochiladi.
          </div>
        </div>
      </div>
    </div>
  )
})

export default LuxuryMapCard
