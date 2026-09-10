import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PartG = () => {
  const navigate = useNavigate();

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const transcriptRef = useRef("");
  const hasSpokenRef = useRef(false);

  const [questionIndex, setQuestionIndex] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [showRecord, setShowRecord] = useState(false);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [allAnswers, setAllAnswers] = useState(["", ""]);

  const questions = [
    "What do you think is the most important skill for a successful salesperson?",
    "Do you believe understanding customer needs is more important than offering the lowest price?",
  ];

  const speak = (text, callback) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;

    speech.onend = () => {
      if (callback) callback();
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const startTimer = () => {
    setTimeLeft(60);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          completeAnswer();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  const sendMarksToBackend = async (question, answer) => {
    try {
      const response = await axios.post(
        "https://bbc-backend.bizzbuzzcreations.com/api/auth/ai-marks",
        {
          testId: "Part-G",
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

  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];

        if (res.isFinal) {
          final += res[0].transcript + " ";
        } else {
          interim += res[0].transcript + " ";
        }
      }

      if (final) {
        transcriptRef.current += final;
      }

      const updatedTranscript = (transcriptRef.current + interim).trim();

      setLiveTranscript(updatedTranscript);

      setAllAnswers((prev) => {
        const updated = [...prev];
        updated[questionIndex] = updatedTranscript;
        return updated;
      });
    };

    recognitionRef.current = recognition;
    recognition.start();

    setIsRecording(true);
    startTimer();
  };

  const stopRecording = () => {
    clearInterval(timerRef.current);
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const completeAnswer = () => {
    stopRecording();

    if (questionIndex === 0) {
      setShowNextQuestion(true);
    } else {
      sendMarksToBackend(questions, allAnswers);
      setShowCompletion(true);
      setQuestionIndex(-1);
    }
  };

  const goToNextQuestion = () => {
    setShowNextQuestion(false);
    setLiveTranscript("");
    transcriptRef.current = "";

    setQuestionIndex(1);

    speak(questions[1], () => {
      setShowRecord(true);
    });
  };

  useEffect(() => {
    if (hasSpokenRef.current) return;
    hasSpokenRef.current = true;

    speak("Part-E : Give your opinion", () => {
      setTimeout(() => {
        setQuestionIndex(0);

        speak(questions[0], () => {
          setShowRecord(true);
        });
      }, 1000);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cfcbd1] px-4">
      <div className="bg-[#e9e9eb] w-[750px] max-w-full rounded-xl shadow-lg p-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Part E : Give your Opinion</h1>

        {questionIndex !== -1 && (
          <p className="text-xl mb-6">{questions[questionIndex]}</p>
        )}

        {showRecord && !isRecording && !showNextQuestion && !showCompletion && (
          <button
            onClick={startRecording}
            className="bg-[#1f2f3f] text-white px-8 py-3 rounded-lg"
          >
            Record Answer
          </button>
        )}

        {isRecording && (
          <div>
            <p className="text-red-600 font-semibold text-xl">
              Time Left: {timeLeft}s
            </p>

            <p className="mt-4 bg-gray-100 p-3 rounded text-sm min-h-[80px]">
              {liveTranscript || "Listening..."}
            </p>

            <button
              onClick={completeAnswer}
              className="mt-6 bg-[#1f2f3f] text-white px-6 py-2 rounded-lg"
            >
              Complete
            </button>
          </div>
        )}

        {showNextQuestion && (
          <div className="mt-8">
            <p className="mb-4 text-green-700 font-semibold">
              Recording completed.
            </p>

            <button
              onClick={goToNextQuestion}
              className="bg-[#1f2f3f] text-white px-8 py-3 rounded-lg"
            >
              Next Question
            </button>
          </div>
        )}

        {showCompletion && (
          <div className="mt-8">
            <button
              onClick={() => navigate("/completion")}
              className="bg-[#1f2f3f] text-white px-8 py-3 rounded-lg"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartG;
