/* import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PartCExample = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.speechSynthesis.cancel(); 

    const text = `
    Example for Part C.
    Listen to two people have a conversation.
    Then answer a question about the conversation.
    William: What time should we leave for the airport?
    John: let's see... the flight is at 10, so we should leave at 7.
    William: Yes, that sounds right. I'll call for a taxi soon.
    So the Question for you is: at What time are they leaving for the airport?
    You say: seven. Or at seven o clock.
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
    <div className="flex-1 flex items-center justify-center bg-[#cfcbd1] py-12">
      <div className="bg-[#e9e9eb] w-[900px] rounded-2xl shadow-md p-12">

        <h1 className="text-3xl font-bold text-center mb-6">
          Example for Part C :
        </h1>

        <p className="text-lg mb-4 text-center">
          Listen to 2 people have a conversation. Then answer a question about the conversation. 
          Answer with a few words or a short sentence.
        </p>

        <p className="text-lg mb-4">
          For example, you hear:
        </p>

        <div className="bg-[#e6b97a] rounded-2xl p-6 mb-6 text-lg leading-8">
          <p><span className="font-bold">William:</span><br/>
          What time should we leave for the airport?</p>

          <p className="mt-4"><span className="font-bold">John reply:</span><br/>
          let's see... the flight is at 10, so we should leave at 7.</p>

          <p className="mt-4"><span className="font-bold">William:</span><br/>
          Yes, that sounds right. I'll call for a taxi soon.</p>

          <p className="mt-4"><span className="font-bold">Question:</span><br/>
          What time are they leaving for the airport?</p>
        </div>

        <p className="text-lg mb-3">
          You say:
        </p>

        <div className="bg-[#a8bea0] rounded-2xl p-6 text-lg leading-8">
          <p>seven</p>
          <p>or</p>
          <p>at seven o'clock</p>
        </div>

        {showButton && (
          <div className="text-center">
            <button
              onClick={() => navigate("/part-c")}
              className="mt-8 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90 transition"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default PartCExample; */