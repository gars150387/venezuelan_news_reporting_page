import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

export default function BannerVenezuelanAdjustmentLaw() {
  const aRef = useRef(null);
  const imageRef = useRef(null);
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 240], ["3rem", "2rem"]);
  const padding = useTransform(scrollY, [0, 240], ["10px 0", "5px 0"]);
  const reference = useMemo(
    () =>
      console.log(
        "Images tomadas desde la pagina oficial de la propuesta de Ley de Ajuste Venezolano en los Estados Unidos de America. fuente: https://leydeajustevenezolano.org/referidos-por-la-pagina-web/"
      ),
    []
  );
  useEffect(() => {
    const controller = new AbortController();
    reference;
    return () => controller.abort();
  }, []);
  return (
    <div className="w-full bg-venezuela-flag text-white shadow-md rounded-xl">
      <div className="container mx-auto py-0 px-4 my-0 bg-venezuela-flag sm:py-0 sm:px-0 sm:my-0">
        <motion.a
          ref={aRef}
          href="https://leydeajustevenezolano.org/referidos-por-la-pagina-web/"
          target="_blank"
          rel="noreferrer"
          className="w-full flex justify-center items-centerfont-bold tracking-widesttext-white underline decoration-current cursor-pointer underline-offset-2 text-balance px-0 hover:text-blue-800 my-4 sm:my-0"
        >
          <motion.img
            ref={imageRef}
            style={{
              height,
              padding,
            }}
            src="https://leydeajustevenezolano.org/wp-content/uploads/2024/04/LOGO-LEY-DE-AJUSTE-7-STARS-07-1024x233.png"
            alt="https://leydeajustevenezolano.org/wp-content/uploads/2024/04/LOGO-LEY-DE-AJUSTE-7-STARS-07-1024x233.png"
            className="items-center justify-center object-center object-contain"
          />
        </motion.a>{" "}
      </div>
    </div>
  );
}
