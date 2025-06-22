import { useState } from "react";
import { BugAntIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "emailjs-com";

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState("");
  const [commentError, setCommentError] = useState(""); // Nuevo estado para el error del comentario

  const handleFeedbackChange = (e) => setFeedback(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === "") {
      setCommentError("Por favor, escribe tus comentarios antes de enviar.");
      return;
    }
    setCommentError(""); // Limpiamos el error si el comentario es válido
    setIsSending(true);

    const templateParams = {
      name,
      email,
      feedback,
    };

    emailjs
      .send(
        "service_hnci3yg",
        "template_in59d2r",
        templateParams,
        "bAZoeAFH8VYIqtGnv"
      )
      .then(
        (result) => {
          setIsSending(false);
          setSubmitted(true);
          setThankYouMessage("¡Gracias por tu feedback! Tu opinión es muy valiosa.");
          setFeedback("");
          setName("");
          setEmail("");
        },
        (error) => {
          console.error("Error al enviar el feedback:", error.text);
          setError("Hubo un error al enviar tu feedback. Intenta de nuevo.");
        }
      );
  };

  const handleClose = () => {
    setIsOpen(false);
    setSubmitted(false);
    setThankYouMessage(""); // Limpiar el mensaje de agradecimiento
    setCommentError(""); // Limpiar el error del comentario
  };

  return (
    <div>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          opacity: { duration: 1 },
          y: { type: "spring", duration: 0.9, bounce: 0.6 },
        }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-4 bg-[#2d2d2dd3] rounded-full shadow-lg cursor-pointer"
      >
        <BugAntIcon className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal"
            className="fixed inset-0 bg-[#2d2d2db7] bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.5 },
            }}
          >
            <motion.div
              className="relative p-8 rounded-lg w-96 shadow-lg bg-[#2e2e2e]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <button
                className="absolute top-3 right-3 p-2 cursor-pointer rounded-full bg-[#ad5555] hover:scale-110 transition-transform duration-200"
                onClick={handleClose}
              >
                <XMarkIcon className="h-8 w-8" />
              </button>

              <h2 className="text-2xl font-semibold mb-6 text-white">Déjanos tu Feedback</h2>
              {submitted && !error && (
                <div className="mb-4 text-green-500 text-center text-xl font-bold">
                  <p>{thankYouMessage}  ❤</p>
                </div>
              )}
              {!submitted && (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2">Nombre (opcional)</label>
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#569e67] bg-[#3a3a3a]"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Correo (opcional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#569e67] bg-[#3a3a3a]"
                      placeholder="Tu correo"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Comentarios</label>
                    <textarea
                      value={feedback}
                      onChange={handleFeedbackChange}
                      className="w-full p-2 border border-gray-300 resize-none rounded focus:outline-none focus:border-[#569e67] bg-[#3a3a3a]"
                      placeholder="Escribe tus comentarios..."
                      rows="5"
                    />
                    {commentError && (
                      <p className="text-red-500 mt-2">{commentError}</p>
                    )}
                  </div>
                  <motion.button
                    type="submit"
                    className={`w-full text-white p-2 rounded-lg flex justify-center items-center ${
                      isSending
                        ? "bg-gray-400"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    disabled={isSending}
                  >
                    {isSending ? (
                      <>
                        <motion.div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      "Enviar"
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Feedback;
