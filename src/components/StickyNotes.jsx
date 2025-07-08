import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import { v4 as uuidv4 } from "uuid";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useLocalStorage } from '../hooks/useLocalStorage'; // Importar el hook

const StickyNotes = () => {
  const [notes, setNotes] = useLocalStorage('notes', []); // Usar el hook para persistencia
  const [trashBoxPos, setTrashBoxPos] = useState({
    x: window.innerWidth * 0.6 + Math.random() * window.innerWidth * 0.1,
    y: window.innerHeight * 0.7 + Math.random() * window.innerHeight * 0.1,
  });
  const [hoveredTrashId, setHoveredTrashId] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  const trashRef = useRef(null);

  const addNote = () => {
    setClickCount((prev) => prev + 1);

    const offset = notes.length * 12; // efecto pila

    const centerX = window.innerWidth / 2 - 100 + offset; // 100 ≈ mitad del ancho de la nota
    const topY = window.innerHeight / 4 + offset; // mitad superior

    const newNote = {
      id: uuidv4(),
      text: "",
      x: centerX,
      y: topY,
    };

    setNotes((prev) => [...prev, newNote]); // Al agregar una nueva nota, se guarda automáticamente en localStorage
  };

  const updateNote = (id, newText) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  const updatePosition = (id, x, y) => {
    const trashBox = trashRef.current;
    const noteEl = document.getElementById(`note-${id}`);
    const margin = 20;

    if (trashBox && noteEl) {
      const trashRect = trashBox.getBoundingClientRect();
      const noteRect = noteEl.getBoundingClientRect();

      const isOverlapping =
        noteRect.left < trashRect.right - margin &&
        noteRect.right > trashRect.left + margin &&
        noteRect.top < trashRect.bottom - margin &&
        noteRect.bottom > trashRect.top + margin;

      if (isOverlapping) {
        setNotes((prev) => prev.filter((note) => note.id !== id));
        setHoveredTrashId(null);
        return;
      }
    }

    setHoveredTrashId(null); // por si estaba en rango y sale
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, x, y } : note))
    );
  };

  const removeNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Green Note */}
      <Rnd
        default={{
          x: window.innerWidth * 0.2 + Math.random() * window.innerWidth * 0.1,
          y:
            window.innerHeight * 0.7 + Math.random() * window.innerHeight * 0.1,
          width: 80,
          height: 80,
        }}
        minWidth={60}
        minHeight={60}
        disableResizing
        bounds="window"
        dragHandleClassName="drag-handle"
        className="absolute pointer-events-auto"
      >
        {/* Triángulo de arrastre proporcional */}
        <div
          className="drag-handle absolute top-1 left-1 w-[50%] h-[35%] bg-[#5daa5d] cursor-move z-10"
          style={{
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
            borderTopLeftRadius: "8px",
            boxShadow: "0 0 4px rgba(0,0,0,0.2)",
          }}
        />
        <motion.div
          className="relative w-full h-full rounded-lg shadow-lg bg-[#7CCF7C] flex items-center justify-center group"
          initial={{ opacity: 1, scale: 0.9 }} // Efecto inicial con "scale" y "bounce"
          animate={{ opacity: 1, scale: 1 }} // Mantiene el "scale" 1 después de la animación inicial
          whileHover={{ scale: 1.05 }} // Animación en hover
          whileTap={{ scale: 0.9 }} // Animación en tap
          transition={{
            duration: 0.4,
            scale: { type: "spring", stiffness: 200, damping: 15 }, // Añadí el efecto de "bounce"
          }}
        >
          {/* Botón visible */}
          <button
            key={clickCount}
            onClick={addNote}
            className="w-full h-full flex items-center justify-center rounded-lg"
          >
            <PlusIcon className="h-10 w-10 pointer-events-none" />
          </button>
        </motion.div>
      </Rnd>

      {/* Red Note */}
      <Rnd
        default={{
          x: trashBoxPos.x,
          y: trashBoxPos.y,
          width: 80,
          height: 80,
        }}
        minWidth={60}
        minHeight={60}
        disableResizing
        bounds="window"
        onDragStop={(e, d) => setTrashBoxPos({ x: d.x, y: d.y })}
        className="drag-handle absolute pointer-events-auto"
      >
        {/* Triángulo de arrastre proporcional */}
        <div
          className="drag-handle absolute top-1 left-1 w-[50%] h-[35%] bg-[#e53935] cursor-move z-10"
          style={{
            clipPath: "polygon(0 0, 100% 0, 0 100%)",
            borderTopLeftRadius: "8px",
            boxShadow: "0 0 4px rgba(0,0,0,0.2)",
          }}
        />
        <motion.div
          ref={trashRef}
          className="w-full h-full rounded-lg flex items-center justify-center font-bold shadow-lg text-white bg-[#FF5252] cursor-pointer"
          initial={{ opacity: 1, scale: 0.9 }}
          animate={{
            scale: hoveredTrashId ? 1.15 : 1,
            backgroundColor: hoveredTrashId ? "#fa3333" : "#FF5252",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", stiffness: 200, damping: 15 },
          }}
        >
          <TrashIcon className="h-10 w-10" />
        </motion.div>
      </Rnd>

      {/* Notes */}
      {notes.map((note) => (
        <Rnd
          key={note.id}
          position={{ x: note.x, y: note.y }}
          onDragStop={(e, d) => updatePosition(note.id, d.x, d.y)}
          default={{
            width: 200,
            height: 200,
          }}
          enableResizing={true}
          minWidth={150}
          minHeight={200}
          bounds="window"
          className=" bg-[#3f3f3f] shadow-lg pointer-events-auto rounded-lg"
          dragHandleClassName="drag-handle"
        >
          <motion.div
            className="h-full flex flex-col"
            animate={{
              opacity: hoveredTrashId === note.id ? 0.5 : 1, // Cambiar la opacidad de toda la nota
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Header - Título */}
            <div className="w-full h-10 bg-gray-950 flex items-center justify-center drag-handle rounded-t-lg">
              <input
                type="text"
                value={note.title}
                className="w-full h-full font-bold text-center outline-none"
                placeholder="Title"
              />
              <button
                onClick={() => removeNote(note.id)}
                className="absolute right-2 p-2 bg-red-500 rounded-full"
              ></button>
            </div>

            {/* Contenido - Ocupa el resto */}
            <div id={`note-${note.id}`} className="flex-1 overflow-hidden">
              <textarea
                value={note.text}
                onChange={(e) => updateNote(note.id, e.target.value)}
                className="w-full h-full resize-none overflow-hidden p-2"
                placeholder="Write me!"                
              />
            </div>
          </motion.div>

          {/* Sombra inferior opcional */}
          <div className="absolute bottom-0 left-0 w-full h-10 pointer-events-none bg-gradient-to-t from-white/8 to-transparent" />
        </Rnd>
      ))}
    </div>
  );
};

export default StickyNotes;
