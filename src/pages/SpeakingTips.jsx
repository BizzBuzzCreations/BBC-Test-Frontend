import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SpeakingTips = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    if (hasSpokenRef.current) return; 
    hasSpokenRef.current = true;

    const text = `
    It is important to communicate naturally during the test.
Here are some tips:

For Speaking:
Speak at a normal speed like you would during a conversation.
Speak as if you are talking to another person on the phone. There is no need to speak too slowly or too carefully.
Speak at a normal volume, not too loud or too soft.

For Writing:
Write clearly and organize your thoughts properly.
Use correct grammar and proper sentence structure.
Try to use a good range of vocabulary.
and Make sure your sentences are easy to understand.
Avoid spelling mistakes and check your answer before submitting.

When you are ready, click Next for your test.
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
    <div className="flex-1 flex flex-col items-center bg-[#cfcbd1] py-16">
      
      <h1 className="text-4xl font-semibold underline mb-10 text-black">
        Test Tips:
      </h1>

      <div className="bg-[#e9e9eb] w-[900px] rounded-xl shadow-md p-12 text-lg leading-8">
        
        <p className="mb-6">
          It is important to <span className="font-bold">communicate naturally</span> during the test.
        </p>

        <p className="mb-4">Here are some tips:</p>
       <span className="font-bold">For Speaking:</span>

<li>
  Speak at a <span className="font-bold">normal speed</span> like you would during a conversation.
</li>
<li>
  Speak as if you are talking to <span className="font-bold">another person on the phone</span>. There is no need to speak too slowly or too carefully.
</li>
<li>
  Speak at a <span className="font-bold">normal volume</span>, not too loud or too soft.
</li>
<br />
  <span className="font-bold">For Writing:</span>

<li>
  <span className="font-bold">Write clearly</span> and organize your thoughts properly.
</li>
<li>
  Use <span className="font-bold">correct grammar</span> and proper sentence structure.
</li>
<li>
  Try to use a <span className="font-bold">good range of vocabulary</span>.
</li>
<li>
  Make sure your <span className="font-bold">sentences are easy to understand</span>.
</li>

        <p className="mt-8">
          When you are ready, click <span className="font-bold">Next</span>.
        </p>

      </div>

      {showButton && (
        <button
          onClick={() => navigate("/sample-speech-test")}
          className="mt-10 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90 transition"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default SpeakingTips;