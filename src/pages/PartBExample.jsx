/* import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartBExample = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.speechSynthesis.cancel();

    const text = `
    Example for Part B.
    Repeat each sentence that you hear.
    For example, you hear:
    My flight was just cancelled.
    Then you have to write the same sentence:
    My flight was just cancelled.
    Click next to continue.
    `;

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;

    speech.onend = () => {
      setShowButton(true);
    };

    window.speechSynthesis.speak(speech);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#cfcbd1] flex items-center justify-center">

      <div className="bg-[#e9e9eb] w-full max-w-3xl rounded-2xl shadow-lg p-12 text-center">

        <h1 className="text-4xl font-bold mb-6">
          Example for Part B:
        </h1>

        <p className="text-lg mb-6">
          Repeat each sentence that you hear.
        </p>

        <p className="text-lg mb-4">
          For example, You hear:
        </p>

       
        <div className="bg-[#e6b97a] w-[75%] mx-auto rounded-xl py-4 px-6 mb-6 text-lg font-medium">
          My flight was just cancelled.
        </div>

        <p className="text-lg mb-4">
          You say:
        </p>

        
        <div className="bg-[#a8bea0] w-[75%] mx-auto rounded-xl py-4 px-6 text-lg font-medium">
          My flight was just cancelled.
        </div>

        {showButton && (
          <button
            onClick={() => navigate("/part-b")}
            className="mt-10 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90 transition"
          >
            Next
          </button>
        )}

      </div>

    </div>
  );
};

export default PartBExample; */