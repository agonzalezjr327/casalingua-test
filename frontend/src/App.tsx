import React, { useState } from "react";
import Modal from "./components/Modal";
import "./tailwind.css";

function App() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setOutput(data.simplified || "No response");
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">CasaLingua Translator</h1>
      <div className="bg-blue-500 text-white p-4">
  Hello, Tailwind CSS!
</div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter legal jargon..."
        className="w-full max-w-xl h-40 p-4 border rounded-lg shadow mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Simplify
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} output={output} />
    </div>
  );
}

export default App;
