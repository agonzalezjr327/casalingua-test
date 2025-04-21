import React, { useState } from "react";
import Modal from "./components/Modal";
import CasaLingua from "./components/CasaLingua";
import "./tailwind.css";

function App() {
  // const [text, setText] = useState("");
  // const [output, setOutput] = useState("");
  // const [isOpen, setIsOpen] = useState(false);

  // const handleSubmit = async () => {
  //   const response = await fetch("http://localhost:5000/translate", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ text }),
  //   });

  //   const data = await response.json();
  //   setOutput(data.simplified || "No response");
  //   setIsOpen(true);
  // };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">CasaLingua Translator</h1>
      <div className="bg-blue-500 text-white p-4 w-full max-w-xl rounded-lg shadow-lg mb-4">
        <h2 className="text-xl font-semibold">Welcome to CasaLingua!</h2>
        <p className="mt-2">
          Simplifying legal jargon and translating documents made easy.
        </p>
        <p className="mt-2">
          Upload your legal documents and let us handle the rest.
        </p>
        <p className="mt-2">
          <strong>Note:</strong> This is a demo version. For full functionality,
          please visit our website.
        </p>
        <p className="mt-2">
          <strong>Disclaimer:</strong> This tool is not a substitute for legal
          advice. Always consult a qualified attorney for legal matters.
        </p>
        <p className="mt-2">
          <strong>Privacy Notice:</strong> Your documents are processed securely
          and are not stored on our servers. We respect your privacy.
        </p>
        <p className="mt-2">
          <strong>Terms of Service:</strong> By using this tool, you agree to
          our terms of service. Please read them carefully.
        </p>
        <p className="mt-2">
          <strong>Contact Us:</strong> For any inquiries or support, please
          contact us at{" "}
          <a href="mailto:6H7mG@example.com">6H7mG@example.com</a>.
        </p>
  Hello, Tailwind CSS!
</div>
      {/* <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter legal jargon..."
        className="w-full max-w-xl h-40 p-4 border rounded-lg shadow mb-4"
      /> */}
      {/* <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Simplify
      </button> */}
      {/* <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} output={output} /> */}
      <CasaLingua />
      {/* <div className="fixed bottom-4 right-4 w-96 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
       
        <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
          <span className="font-bold">CasaLingua</span>
          <button className="text-white hover:text-gray-200" onClick={() => setIsOpen(false)}> */}
    </div>
  );
}

export default App;
