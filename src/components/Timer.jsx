
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";

const Timer = () => {
  const audioRefClock = useRef(null); // Ref para el sonido de las agujas del reloj
  const audioRefBell = useRef(null); // Ref para el sonido de la campana

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);

  const [isClockActive, setIsClockActive] = useState(false); // Estado para el sonido de las agujas

  const [position, setPosition] = useState({
    x: -900 + Math.random() * 150,
    y: 300 + Math.random() * 150,
  });

  const playSound = (soundType) => {
    const audioRef = soundType === "clock" ? audioRefClock : audioRefBell;
    if (audioRef.current) {
      audioRef.current.src =
        soundType === "clock" ? "/sounds/clock.mp3" : "/sounds/doorbell.mp3";
      audioRef.current.play().catch((error) => {
        console.error(`Error al reproducir el sonido de ${soundType}:`, error);
      });
    }
  };

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        if (minutes === 0 && seconds < 8 && seconds > 0) {
          if (!isClockActive) {
            playSound("clock");
            setIsClockActive(true); // Cambia el estado para evitar múltiples reproducciones
          }
        }

        if (seconds === 0) {
          if (minutes === 0) {
            setIsClockActive(false);
            audioRefClock.current.currentTime = 0; // Regresar al inicio
            audioRefClock.current.pause();
            if (!isBreak) {
              playSound("bell");
              setCycles(cycles + 1);

              if (cycles >= 3) {
                setMinutes(30); // Descanso largo
                setIsBreak(true);
                setCycles(0); // Resetear ciclos
              } else {
                setMinutes(5); // Descanso corto
                setIsBreak(true);
              }
            } else {
              playSound("bell");
              setMinutes(25); // Iniciar trabajo nuevamente
              setIsBreak(false);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, cycles, isClockActive]);

  // Iniciar o pausar el temporizador
  const toggleTimer = () => {
    setIsActive(!isActive);
    if (isClockActive) {
      audioRefClock.current.pause();
      setIsClockActive(false); // Cambiar el estado correctamente
    } else {
      audioRefClock.current.play();
      setIsClockActive(true); // Cambiar el estado correctamente
    }
  };

  // Resetear el temporizador
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setCycles(0);
    setMinutes(25);
    setSeconds(0);
  };

  const handleDragStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Rnd
      position={position}
      onDragStop={handleDragStop}
      bounds="window"
      dragHandleClassName="drag-handle"
      className="absolute bg-[#3f3f3f] opacity-85 pt-2 pb-2 pl-2 pr-2 rounded-lg shadow-lg"
      enableResizing={false}
      minWidth={220}
      minHeight={250}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="drag-handle h-4 w-full flex justify-center cursor-move pb-1">
          <div
            className="h-2 w-35 rounded-full bg-[#252525] cursor-move"
            style={{ boxShadow: "0 0 4px rgba(0,0,0,0.2)" }}
          />
        </div>

        {/* Título del temporizador */}
        <h2 className="text-2xl font-bold">
          {isBreak ? "Break Time" : "Work Time"}
        </h2>

        {/* Temporizador */}
        <div className="bg-[#252525] rounded-full p-4 timer text-4xl font-mono">
          <span className="font-bold">{String(minutes).padStart(2, "0")}:</span>
          <span>{String(seconds).padStart(2, "0")}</span>
        </div>

        {/* Controles del temporizador */}
        <div className="flex gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }} // Animación en hover
            whileTap={{ scale: 0.9 }} // Animación en tap
            transition={{
              duration: 0.4,
              scale: { type: "spring", stiffness: 200, damping: 15 }, // Añadí el efecto de "bounce"
            }}
          >
            <button
              onClick={toggleTimer}
              className="px-5 py-2 bg-teal-500 rounded-lg hover:bg-teal-600 transition-all"
            >
              {isActive ? "Pause" : "Start"}
            </button>
          </motion.div>
          <button
            onClick={resetTimer}
            className="px-5 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-all"
          >
            Reset
          </button>
        </div>

        {/* Ciclos completados */}
        <div className="text-gray-300 mt-2 text-sm">
          <p>Cycles: {cycles}</p>
        </div>
      </div>
      <audio ref={audioRefClock} preload="auto" />
      <audio ref={audioRefBell} preload="auto" />
    </Rnd>
  );
};

export default Timer;
