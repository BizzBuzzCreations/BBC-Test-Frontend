import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PartB = () => {
  const navigate = useNavigate();

  const [showInput, setShowInput] = useState(false);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const [isCorrect, setIsCorrect] = useState(false);

  const correctAnswers = [
    "good sales is not about forcing a product but about understanding the customers needs",
    "good sales is not about forcing a product but about understanding customer needs",
  ];

  const normalize = (text) => {
    return text
      .toLowerCase()
      .replace(/[.,’']/g, "")
      .trim();
  };

  //  Backend API call
  const sendMarksToBackend = async (question, answer) => {
    try {
      const response = await axios.post(
        "https://bbc-backend.bbcfinsrv.com/api/auth/ai-marks",
        {
          testId: "Part-B",
          question,
          answer,
        },
        { withCredentials: true },
      );

      const data = await response.data;

      console.log("Backend Response:", data);
    } catch (error) {
      console.error("Error sending marks:", error);
    }
  };

  useEffect(() => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      "Part B. Listen to the sentence and repeat it exactly. Your sentence is: Good sales is not about forcing a product, but about understanding the customer’s needs.",
    );

    speech.rate = 0.9;

    speech.onend = () => {
      setShowInput(true);
    };

    window.speechSynthesis.speak(speech);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    let timer;

    if (timerStarted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && timerStarted) {
      setTimeUp(true);

      const userAnswer = normalize(answer);

      sendMarksToBackend(
        "Listen to the sentence and repeat it exactly. Your sentence is: Good sales is not about forcing a product, but about understanding the customer’s needs.",
        userAnswer,
      );

      console.log("User Answer:", userAnswer);
      navigate("/part-c");
    }

    return () => clearTimeout(timer);
  }, [timerStarted, timeLeft]);

  const handleTyping = (e) => {
    setAnswer(e.target.value);

    if (!timerStarted) {
      setTimerStarted(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#cfcbd1] flex items-center justify-center">
      <div className="bg-[#e9e9eb] w-full max-w-3xl rounded-2xl shadow-lg p-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Part B: Repeat a sentence</h1>

        <p className="text-lg mb-10">
          Listen to the sentence and repeat it exactly.
        </p>

        {showInput && (
          <>
            <input
              type="text"
              value={answer}
              onChange={handleTyping}
              disabled={timeUp}
              placeholder="Type the sentence here..."
              className="w-[75%] border border-gray-400 rounded-lg px-4 py-3 text-lg outline-none"
            />

            <p className="mt-6 text-red-600 text-xl font-semibold">
              Time Left: {timeLeft}s
            </p>

            {timeUp && (
              <button
                onClick={() => navigate("/part-c")}
                className="mt-10 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90 transition"
              >
                Next
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PartB;
