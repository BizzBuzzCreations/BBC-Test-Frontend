import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PartE = () => {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerStarted, setTimerStarted] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const [results, setResults] = useState({});

  const correctAnswers = {
    1: ["May I ask why you feel that way?"],
    2: ["Cross-selling"],
    3: ["26%"],
    4: ["₹130.10"],
    5: ["Upselling"],
  };

  const sendMarksToBackend = async (marks) => {
    try {
      const res = await axios.post(
        "https://bbc-backend.bbcfinsrv.com/api/auth/add-marks",
        {
          testId: "Part-E",
          marks,
        },
        { withCredentials: true },
      );
    } catch (err) {
      console.log("Error sending marks:", err);
    }
  };

  useEffect(() => {
    window.speechSynthesis.cancel();

    const intro = new SpeechSynthesisUtterance(
      "Section E. Multiple Choice Questions",
    );

    const instruction = new SpeechSynthesisUtterance(
      "Answer the following questions. You have 5 minutes to complete this section.",
    );

    intro.rate = 0.9;
    instruction.rate = 0.9;

    intro.onend = () => {
      window.speechSynthesis.speak(instruction);
    };

    instruction.onend = () => {
      setTimeout(() => {
        setTimerStarted(true);
      }, 1000);
    };

    window.speechSynthesis.speak(intro);
  }, []);

  const questions = [
    {
      id: 1,
      question:
        "A customer says, “I don’t need this product.” What would you say to convince them?",
      options: [
        "change the product?",
        "May I ask why you feel that way?",
        "forcing them to listen about the product",
        "hang up the call politely",
      ],
    },

    {
      id: 2,
      question:
        "If a customer buys a phone, and you suggest earphones and a phone cover, what is this called?",
      options: ["Upselling", "Advertising", "Cross-selling", "Branding"],
    },

    {
      id: 3,
      question:
        "A salesperson makes 50 calls and gets 13 sales. What is the conversion rate?",
      options: ["26%", "21.5%", "19%", "23%"],
    },

    {
      id: 4,
      question:
        "If a person earns ₹27,500 per month and works 7 hours per day, how much does the person earn per hour in the month of February",
      options: ["₹150.20", "₹145.30", "₹130.10", "₹155.20"],
    },

    {
      id: 5,
      question:
        "A salesperson suggests a more expensive version of the product that has better features. This technique is called:",
      options: ["Cross-selling", "Upselling", "Advertising", "Promotion"],
    },
  ];

  useEffect(() => {
    if (!timerStarted) return;

    if (timeLeft === 0) {
      handleComplete();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, timerStarted]);

  const handleOptionChange = (qId, option) => {
    if (isCompleted) return;

    setAnswers({
      ...answers,
      [qId]: option,
    });
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setShowNext(true);
    setTimerStarted(false);

    const resultObj = {};

    let totalMarks = 0;

    questions.forEach((q) => {
      const userAnswer = answers[q.id];
      const acceptableAnswers = correctAnswers[q.id];

      const isCorrect = acceptableAnswers.includes(userAnswer);

      resultObj[q.id] = isCorrect;

      if (isCorrect) {
        totalMarks += 2;
      }

      console.log(`Question ${q.id}`);
      console.log("User:", userAnswer);
      console.log("Correct:", isCorrect);
    });

    console.log("Total Marks:", totalMarks);

    setResults(resultObj);

    sendMarksToBackend(totalMarks);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cfcbd1] px-4">
      <div className="bg-[#e9e9eb] w-full max-w-4xl rounded-2xl shadow-lg p-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          Section E: MCQ type Questions
        </h1>

        <p className="text-center mb-8 text-lg">
          Answer the following questions. You have 5 minutes to complete this
          section.
        </p>

        {timerStarted && !isCompleted && (
          <p className="text-red-600 text-xl font-semibold text-center mb-6">
            Time Left: {formatTime(timeLeft)}
          </p>
        )}

        <div className="space-y-8">
          {questions.map((q, index) => (
            <div key={q.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="font-semibold mb-4">
                {index + 1}. {q.question}
              </h2>

              <div className="space-y-2">
                {q.options.map((option, i) => (
                  <label
                    key={i}
                    className={`block border p-3 rounded-lg cursor-pointer ${
                      answers[q.id] === option
                        ? "bg-blue-100 border-blue-400"
                        : ""
                    } ${isCompleted ? "cursor-not-allowed opacity-70" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={() => handleOptionChange(q.id, option)}
                      disabled={isCompleted}
                      className="mr-2"
                    />

                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!isCompleted && (
          <div className="text-center mt-10">
            <button
              onClick={handleComplete}
              className="bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90"
            >
              Complete
            </button>
          </div>
        )}

        {showNext && (
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/part-f")}
              className="bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartE;
