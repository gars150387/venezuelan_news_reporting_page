import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function BannerVenezuelanAdjustmentLaw() {
  const textref = useRef(null);
  const aRef = useRef(null);
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [0, 120], [1, 0]);
  const height = useTransform(scrollY, [0, 240], ["fit-content", 0]);
  const display = useTransform(scrollY, [0, 240], ["flex", "none"]);
  const fontSize = useTransform(scrollY, [0, 240], ["1.875rem", "1rem"]);
  const lineHeight = useTransform(scrollY, [0, 240], ["2.25rem", "1.25rem"]);
  return (
    <div className="w-full bg-gradient-to-b from-white to-transparent text-blue-800 shadow-md">
      <div className="container mx-auto py-0 px-4 my-0 sm:py-0 sm:px-0 sm:my-0">
        <motion.p
          style={{
            scale,
            height,
            display,
          }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          initial={{
            scale: 1,
            height: "fit-content",
            display: "flex",
          }}
          ref={textref}
          className="text-center mt-4 text-blue-800 text-xl font-bold drop-shadow-lg"
        >
          Esta ley beneficiaria a los venezolanos que se encuentran tanto en
          Venezuela como fuera de Venezuela. Todos pueden llenar el formulario
          sin necesidad de ser venezolano.
        </motion.p>
        <motion.a
          ref={aRef}
          href="https://leydeajustevenezolano.org/referidos-por-la-pagina-web/"
          target="_blank"
          rel="noreferrer"
          className=" text-purple-950 underline decoration-current cursor-pointer underline-offset-2 text-balance px-0 hover:text-blue-800 my-4 sm:my-0"
          style={{
            fontSize,
            lineHeight,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        
        >
          Ley de ajuste venezolano.
        </motion.a>{" "}
      </div>
    </div>
  );
}
