import { Image } from "astro:assets";
import { motion } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from "../utils/useMediaQuery";

const navMotion = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  hidden: {
    opacity: 0,
  },
};
const itemMotion = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

export const Nav = () => {
  const [toogled, setToogled] = useState<boolean>(false);
  const matches = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="relative z-40 mx-8 mb-24 flex items-center justify-between pb-6 pt-12 font-medium md:mx-16 lg:mx-32">
      {/* header underline */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        width="250"
        height="4"
        viewBox="0 0 250 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L428 2"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
      {/* logo */}
      <div>
        <img src="/1.svg" alt="logo" />
      </div>
      <h1 className="text-lg font-bold">
        <a href="/">Hey.</a>
      </h1>
      {/* dectop nav */}
      {matches && (
        <div className="flex gap-12">
          <a href="/">home</a>
          <a href="/about">about</a>
          <a href="/contact">contact</a>
        </div>
      )}
      {/* burger btn */}
      {!matches && (
        <button
          onClick={() => setToogled((prev) => !prev)}
          className="space-y-1.5"
        >
          <motion.span
            animate={{ rotateZ: toogled ? -45 : 0, y: toogled ? 8 : 0 }}
            className="block h-0.5 w-8 bg-white"
          ></motion.span>
          <motion.span
            animate={{ width: toogled ? "0px" : "24px" }}
            className="block h-0.5 bg-white"
          ></motion.span>
          <motion.span
            animate={{
              rotateZ: toogled ? 45 : 0,
              y: toogled ? -8 : 0,
              width: toogled ? "32px" : "16px",
            }}
            className="block h-0.5 bg-white"
          ></motion.span>
        </button>
      )}
      {/* burger nav */}
      {toogled && !matches && (
        <div className="fixed inset-0 -z-10 flex flex-col items-center justify-center gap-12 bg-gray-600 ">
          <motion.div
            className="flex flex-col items-center justify-center gap-16 text-xl"
            variants={navMotion}
            animate="visible"
            initial="hidden"
          >
            <motion.a variants={itemMotion} href="/about">
              about
            </motion.a>
            <motion.a variants={itemMotion} href="/">
              home
            </motion.a>
            <motion.a variants={itemMotion} href="/contact">
              contact
            </motion.a>
          </motion.div>
        </div>
      )}
    </div>
  );
};
