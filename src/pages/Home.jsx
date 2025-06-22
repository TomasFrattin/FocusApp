import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [clicked, setClicked] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1); // Nuevo estado para controlar la opacidad del texto
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(true);
    setTextOpacity(0); // Cambiar la opacidad del texto a 0
    setTimeout(() => {
      navigate("/focus");
    }, 700);
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center text-center overflow-hidden px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: textOpacity, y: 0 }}
        transition={{
          opacity: { duration: 0.1 }, // Duración más rápida para la opacidad
          y: { type: "spring", duration: 0.9, bounce: 0.6 }, // Duración y rebote para el movimiento
        }}
        className="flex flex-col items-center justify-center"
      >
        <h1 className="font-bold mb-4 ">Bienvenido a Focus App</h1>
        <p className="mb-6 max-w-md ">
          Una herramienta simple para ayudarte a estudiar, concentrarte y
          organizarte.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={
          clicked
            ? { scale: 30, opacity: 0, backgroundColor: "#1e201c" }
            : { scale: 1, opacity: 1, backgroundColor: "#FF6F61" }
        }
        transition={{
          delay: 0.1,
          duration: clicked ? 0.6 : 0.9,
          scale: { type: "spring", bounce: 1, stiffness: 200 },
          backgroundColor: { duration: 0.7 },
        }}
        whileHover={!clicked ? { scale: 1.15 } : {}}
        onClick={handleClick}
        className="rounded-full z-10 cursor-pointer shadow-lg"
        style={{
          width: 150,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {!clicked && (
          <span className="font-semibold">Let’s Focus</span>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
