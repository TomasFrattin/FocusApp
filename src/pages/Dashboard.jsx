import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MusicPlayer from "../components/MusicPlayer";
import StickyNotes from "../components/StickyNotes";
import Timer from "../components/Timer";

const Dashboard = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleClick = () => {
    setShowIntro(false);
  };

  const introVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        type: "spring",
        bounce: 0.6,
      },
    },
  };

  const exitFade = {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  };

  return (
    <div className="min-h-screen min-w-screen flex justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        className="p-6 text-center"
      >
        <motion.h1
          className="font-bold mb-2 cursor-pointer"
          variants={introVariants}
          animate={{
            x: showIntro ? 0 : "-39vw", // aparte del slide lateral
          }}
          transition={{
            duration: 0.7,
            type: "spring",
            bounce: 0.4,
          }}
        >
          Dashboard
        </motion.h1>

        <AnimatePresence>
          {showIntro && (
            <>
              <motion.p
                className="leading-relaxed max-w-md"
                variants={introVariants}
                exit={exitFade}
              >
                Este es tu <strong>Dashboard personal</strong>.
                <br />
                Acá podés{" "}
                <strong>
                  crear notas, usar herramientas flotantes, temporizadores,
                  reproducir música
                </strong>
                , y mucho más.
                <br />
                Todo lo que ves flotando es tu caja de herramientas:{" "}
                <strong>explorá, movelas, usalas.</strong>
                <br />
                Ahora sí… <strong>enfocate</strong> y hacé que las ideas pasen
                del aire al papel.
              </motion.p>

              <motion.span
                className="block text-sm text-gray-300 mt-3 cursor-pointer"
                onClick={handleClick}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={exitFade}
                transition={{
                  delay: 1,
                  duration: 0.6, // esto es para la entrada
                }}
              >
                (click para ocultar)
              </motion.span>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-around">
        <MusicPlayer />
        <StickyNotes />
        <Timer />
      </div>
    </div>
  );
};

export default Dashboard;
