import { memo, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import bgImage from "@/assets/svg/ChatGPT Image 10 янв. 2026 г., 14_29_19.webp";

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

const Counter = memo(function Counter({
  target,
  suffix = "",
  duration = 2000,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  const [count, setCount] = useState<number>(0);

  const rafId = useRef<number | null>(null);
  const startTime = useRef<number>(0);
  const lastValue = useRef<number>(-1);

  useEffect(() => {
    if (!isInView) return;

    // Reduce motion bo‘lsa: darrov target (UI deyarli o‘zgarmaydi, lekin performance zo‘r)
    if (reduceMotion) {
      setCount(target);
      return;
    }

    const stop = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };

    const tick = (t: number) => {
      if (document.hidden) {
        // tab background bo‘lsa CPU yemasin
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      if (!startTime.current) startTime.current = t;

      const progress = Math.min((t - startTime.current) / duration, 1);
      const value = Math.floor(progress * target);

      // ✅ faqat value o‘zgarganda setState (re-render kam)
      if (value !== lastValue.current) {
        lastValue.current = value;
        setCount(value);
      }

      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
        stop();
      }
    };

    // reset
    startTime.current = 0;
    lastValue.current = -1;
    setCount(0);

    rafId.current = requestAnimationFrame(tick);

    const onVis = () => {
      // visible bo‘lganda davom etadi, hidden bo‘lganda tick ichida update qilmaydi
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [isInView, target, duration, reduceMotion]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
});

const Figures = () => {
  // ✅ style object har renderda qayta yaratilmasin
  const bgStyle = useMemo(
    () => ({
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }),
    []
  );

  return (
    <section
      className="relative w-full min-h-screen flex items-center text-white pt-20 pb-20"
      style={bgStyle}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <span className="text-orange-500 font-semibold tracking-widest uppercase text-sm">
              ✦ 02. Asosiy Ko‘rsatkichlar
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              To‘qimachilik <br />
              Sanoatining <br />
              Kelajagini <br />
              Yaratmoqdamiz
            </h1>

            <p className="text-neutral-300 max-w-xl">
              Biz mahsulot va ishlab chiqarish jarayonlarini rivojlantirishda
              barqarorlik, sifat va inson omilini birinchi o‘ringa qo‘yamiz.
              Atrof-muhit va jamiyatni asrash — bizning ustuvor maqsadimiz.
            </p>
          </motion.div>

          {/* RIGHT STATS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-10"
          >
            <div className="space-y-2">
              <h3 className="text-5xl font-extrabold">
                <Counter target={26} suffix="+" />
              </h3>
              <p className="font-semibold">Yillik Tajriba</p>
              <p className="text-sm text-neutral-400">
                O‘n yillardan ortiq muvaffaqiyatli ishlab chiqarish tajribasi.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-5xl font-extrabold">
                <Counter target={690} suffix="K" />
              </h3>
              <p className="font-semibold">Oylik Ishlab Chiqarish</p>
              <p className="text-sm text-neutral-400">
                Har oy 690 ming metr mato ishlab chiqariladi.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-5xl font-extrabold">
                <Counter target={99} suffix="%" />
              </h3>
              <p className="font-semibold">Mijozlar Qoniqishi</p>
              <p className="text-sm text-neutral-400">
                Natijaga asoslangan uzoq muddatli hamkorlik.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Figures;
