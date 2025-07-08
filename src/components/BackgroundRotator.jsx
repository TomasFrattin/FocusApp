import { useState, useEffect } from "react";
import { PlayIcon, PauseIcon, ForwardIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundRotator = () => {
  const images = [
    "/background1.jpeg",
    "/background2.jpeg",
    "/background3.jpeg",
    "/background4.jpeg",
    "/background5.jpeg",
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    if (!paused) {
      const timer = setInterval(nextImage, 30000); // 30 seg
      return () => clearInterval(timer);
    }
  }, [paused]);

  return (
    <>
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={images[index]}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[index]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Botones */}
      <div className="fixed top-2 right-2 z-20 flex gap-2">
        <button
          onClick={() => setPaused(!paused)}
          className="bg-white/30 text-black px-3 py-1 rounded shadow-md hover:bg-white/70 active:scale-95 transform transition cursor-pointer"
        >
          {paused ? (
            <PlayIcon className="h-5 w-5" />
          ) : (
            <PauseIcon className="h-5 w-5" />
          )}
        </button>

        <button
          onClick={nextImage}
          className="bg-white/30 text-black px-3 py-1 rounded shadow-md hover:bg-white/70 active:scale-95 transform transition cursor-pointer"
        >
          <ForwardIcon className="h-5 w-5" />
        </button>
      </div>
    </>
  );
};

export default BackgroundRotator;
