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

  // Animaciones para el bloque central
  const introVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        type: "spring",
        bounce: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -600,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen min-w-screen relative flex justify-center items-center">
      {/* Título fijo arriba izquierda, aparece después del intro */}
      <AnimatePresence>
        {!showIntro && (
          <motion.h1
            className="fixed top-4 left-4 font-bold z-30 text-white drop-shadow-md"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 12,
              bounce: 0.6,
              delay: 0.5,
            }}
          >
            Dashboard
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Bloque de bienvenida centrado */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            variants={introVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: "fixed",
              textAlign: "center",
              top: "20%",
              transform: "translate(-50%, -20%)",
              width: "90%",
              maxWidth: "600px",
            }}
          >
            <motion.h1 className="text-4xl font-bold text-white mb-4 drop-shadow-md">
              Dashboard
            </motion.h1>
            <motion.p className="text-gray-200 leading-relaxed text-lg pointer-default">
              Este es tu <strong>Dashboard personal</strong>. Acá podés{" "}
              <strong>
                crear notas, usar herramientas flotantes, temporizadores,
                reproducir música
              </strong>
              , y mucho más. Todo lo que ves flotando es tu caja de
              herramientas: <strong>explorá, movelas, usalas.</strong>
              Ahora sí… <strong>enfocate</strong> y hacé que las ideas pasen del
              aire al papel.
            </motion.p>
            <motion.span
              className="block text-sm text-gray-300 mt-4 cursor-pointer"
              onClick={handleClick}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              (click para comenzar)
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Herramientas flotantes */}
      <div className="flex justify-around z-10 w-full px-10 mt-10">
        <MusicPlayer />
        <StickyNotes />
        <Timer />
      </div>
    </div>
  );
};

export default Dashboard;
