import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  output: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, output }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl">
        <h2 className="text-xl font-bold mb-4">Simplified Text</h2>
        <p className="text-gray-700">{output}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
