import React from "react";

const NotificationModal = ({ message, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">{message}</h3>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg text-black hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
