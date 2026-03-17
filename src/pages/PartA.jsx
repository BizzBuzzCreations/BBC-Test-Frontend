import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const PartA = () => {
  const navigate = useNavigate();

  const [showInput, setShowInput] = useState(false);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const [isCorrect, setIsCorrect] = useState(false);

  const correctAnswers = ["closing stage", "closing"];

  //  Backend API call
  const sendMarksToBackend = async (marks) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/add-marks",
        {
          testId: "Part-A",
          marks: marks,
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

    const intro = new SpeechSynthesisUtterance(
      "Part A. Listen to the question. Answer the question with one word or a few words.",
    );

    intro.rate = 0.9;

    intro.onend = () => {
      setTimeout(() => {
        const question = new SpeechSynthesisUtterance(
          "What is the final stage of the sales process where the deal is completed called?",
        );

        question.rate = 0.9;

        question.onend = () => {
          setShowInput(true);
        };

        window.speechSynthesis.speak(question);
      }, 1000);
    };

    window.speechSynthesis.speak(intro);

    return () => window.speechSynthesis.cancel();
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

      const userAnswer = answer.trim().toLowerCase();

      const isAnswerCorrect = correctAnswers.includes(userAnswer);

      setIsCorrect(isAnswerCorrect);

      const marks = isAnswerCorrect ? 10 : 0;

      // ✅ Send marks to backend
      sendMarksToBackend(marks);

      console.log("User Answer:", userAnswer);
      console.log("Correct:", isAnswerCorrect);
      console.log("Marks Sent:", marks);
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
      <div className="w-full max-w-4xl bg-[#e9e9eb] rounded-2xl shadow-lg p-12 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Part A: Give a short answer to the question
        </h1>

        <p className="text-lg mb-10">
          Listen to the question. Answer the question with one word or a few
          words.
        </p>

        {showInput && (
          <>
            <input
              type="text"
              value={answer}
              onChange={handleTyping}
              disabled={timeUp}
              placeholder="Type your answer here..."
              className="w-[70%] border border-gray-400 rounded-lg px-4 py-3 text-lg outline-none"
            />

            <p className="mt-5 text-red-600 text-xl font-semibold">
              Time Left: {timeLeft}s
            </p>

            {timeUp && (
              <button
                onClick={() => navigate("/part-b")}
                className="mt-8 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90 transition"
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

export default PartA;
