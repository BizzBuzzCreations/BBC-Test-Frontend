/* import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PartAExample = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    if (hasSpokenRef.current) return;
    hasSpokenRef.current = true;

    const text = `
    Example for Part A.
    Listen to a question.
    Answer the question with one word or a few words.
    For example, when you hear:
    What would a person use to open a locked door?
    You say:
    key.
    Or.
    a key.
    Click next to continue.
    `;

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;

    speech.onend = () => {
      setShowButton(true);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center bg-[#cfcbd1]">
      <div className="bg-[#e9e9eb] max-w-2xl w-full rounded-2xl shadow-md p-10 text-center">

        <h1 className="text-3xl font-bold mb-6">
          Example for Part A:
        </h1>

        <p className="text-lg mb-4">
          Listen to a question. Answer the question with one word or a few words.
        </p>

        <p className="text-lg font-semibold mb-6">
          For example, when you hear:
        </p>

        <div className="bg-[#e6b97a] rounded-xl py-4 px-6 mb-6 text-lg">
          What would a person use to open a locked door?
        </div>

        <p className="text-lg mb-4">You say:</p>

        <div className="bg-[#a8bea0] rounded-xl py-4 px-6 mb-4 text-lg">
          key
        </div>

        <p className="text-lg mb-4">or</p>

        <div className="bg-[#a8bea0] rounded-xl py-4 px-6 text-lg">
          a key
        </div>

        {showButton && (
          <button
            onClick={() => navigate("/part-a")}
            className="mt-10 bg-[#1f2f3f] text-white px-12 py-3 rounded-lg hover:opacity-90 transition"
          >
            Next
          </button>
        )}

      </div>
    </div>
  );
};

export default PartAExample; */