import { memo, useEffect, useMemo, useRef, useState } from "react"
import { MapPin, Navigation, ExternalLink } from "lucide-react"
import { useTranslation } from "react-i18next"

type Props = {
  title?: string
  address?: string
  lat?: number
  lng?: number
  placeQuery?: string
  travelMode?: "driving" | "walking" | "transit"
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
  const destination =
    lat != null && lng != null ? `${lat},${lng}` : placeQuery ? placeQuery : ""

  if (!destination) return

  const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer")

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const origin = `${pos.coords.latitude},${pos.coords.longitude}`
        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
          origin
        )}&destination=${encodeURIComponent(destination)}&travelmode=${encodeURIComponent(travelMode)}`
        open(url)
      },
      () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          destination
        )}&travelmode=${encodeURIComponent(travelMode)}`
        open(url)
      },
      { maximumAge: 60_000, timeout: 7000 }
    )
  } else {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      destination
    )}&travelmode=${encodeURIComponent(travelMode)}`
    open(url)
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
  const q = lat != null && lng != null ? `${lat},${lng}` : placeQuery ? placeQuery : ""
  if (!q) return

  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
  window.open(url, "_blank", "noopener,noreferrer")
}

const LuxuryMapCard = memo(function LuxuryMapCard({
  title,
  address,

  lat = 40.709533,
  lng = 72.55911,

  placeQuery = "Amir Temur xiyoboni",
  travelMode = "driving",
  className = "",
  mapHeightClassName = "h-[260px] md:h-[280px]",
}: Props) {
  const { t } = useTranslation()

  // ✅ default matnlar (prop berilmasa)
  const safeTitle = title ?? t("map.title")
  const safeAddress = address ?? t("map.address")

  const mapSrc = useMemo(() => {
    const q =
      lat != null && lng != null
        ? `${lat},${lng}`
        : placeQuery
          ? placeQuery
          : "Uzbekistan"

    return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=16&output=embed`
  }, [placeQuery, lat, lng])

  const boxRef = useRef<HTMLDivElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (shouldLoad) return
    const el = boxRef.current
    if (!el) return

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true)
          io.disconnect()
        }
      },
      { root: null, rootMargin: "300px", threshold: 0.01 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [shouldLoad])

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
      <div className="pointer-events-none absolute -inset-24 opacity-70 [background:radial-gradient(circle_at_18%_12%,rgba(255,165,0,0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 [background:radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.10),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/25" />

      <div className="relative p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              <p className="text-sm font-semibold text-white truncate">{safeTitle}</p>
            </div>
            <p className="text-xs text-neutral-300 mt-1">{safeAddress}</p>
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
              {t("map.route")}
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
              title={t("map.openTitle")}
              aria-label={t("map.openAria")}
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={boxRef}
          className="mt-4 relative overflow-hidden rounded-xl border border-white/10 bg-black/25"
        >
          {shouldLoad ? (
            <iframe
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={`w-full ${mapHeightClassName} block`}
              allowFullScreen
            />
          ) : (
            <div className={`w-full ${mapHeightClassName} grid place-items-center`}>
              <div className="text-xs text-white/70">{t("map.loading")}</div>
            </div>
          )}

          <div className="px-3 py-2 text-[11px] text-white/70 border-t border-white/10 bg-black/30">
            {t("map.note")}
          </div>
        </div>
      </div>
    </div>
  )
})

export default LuxuryMapCard
