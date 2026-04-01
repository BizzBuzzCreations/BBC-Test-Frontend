/* import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PartF = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const transcriptRef = useRef("");
  const hasSpokenIntroRef = useRef(false);

  const questions = [
    "What was the main reason behind Chris Gardner’s financial struggles?",
    "What led Linda to leave Chris and move away?",
    "Where did Chris and his son live after being evicted from their apartment?",
  ];

  const [audioPlayed, setAudioPlayed] = useState(false);
  const [showAudio, setShowAudio] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(-1);

  const [showRecordBtn, setShowRecordBtn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15);

  const [liveTranscript, setLiveTranscript] = useState("");
  const [allAnswers, setAllAnswers] = useState(["", "", ""]);

  const [showNextQuestionBtn, setShowNextQuestionBtn] = useState(false);
  const [showNextPageBtn, setShowNextPageBtn] = useState(false);

  const sendMarksToBackend = async (question, answer) => {
    try {
      const response = await axios.post(
        "https://bbc-backend.bbcfinsrv.com/api/auth/ai-marks",
        {
          testId: "Part-f",
          question,
          answer,
          topic:
            "These questions are about the movie The Pursuit of Happyness.",
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

    if (hasSpokenIntroRef.current) return;
    hasSpokenIntroRef.current = true;

    const intro = new SpeechSynthesisUtterance(
      "Part F – Answer the questions about a passage.",
    );

    intro.rate = 0.9;

    intro.onend = () => {
      setTimeout(() => {
        setShowAudio(true);
      }, 1000);
    };

    setTimeout(() => {
      window.speechSynthesis.speak(intro);
    }, 500);

    return () => window.speechSynthesis.cancel();
  }, []);

  const handleAudioEnd = () => {
    setAudioPlayed(true);

    setTimeout(() => {
      askQuestion(0);
    }, 1000);
  };

  const askQuestion = (index) => {
    window.speechSynthesis.cancel();

    setQuestionIndex(index);
    setLiveTranscript("");
    transcriptRef.current = "";
    setShowRecordBtn(false);
    setShowNextQuestionBtn(false);

    const speech = new SpeechSynthesisUtterance(questions[index]);

    speech.rate = 0.9;

    speech.onend = () => {
      setShowRecordBtn(true);
    };

    window.speechSynthesis.speak(speech);
  };

  const startTimer = () => {
    setTimeLeft(15);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;

        if (newTime <= 0) {
          clearInterval(timerRef.current);
          stopRecording();
          return 0;
        }

        return newTime;
      });
    }, 1000);
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
    setShowRecordBtn(false);

    startTimer();
  };

  const stopRecording = () => {
    clearInterval(timerRef.current);

    recognitionRef.current?.stop();

    setIsRecording(false);
    // IF MORE QUESTIONS LEFT
    if (questionIndex < questions.length - 1) {
      setShowNextQuestionBtn(true);
    } else {
      // LAST QUESTION FINISHED
      sendMarksToBackend(questions, allAnswers);
      setQuestionIndex(-1); // hide question
      setShowNextPageBtn(true);
      setAllAnswers(["", "", ""]);
    }
  };

  const goToNextQuestion = () => {
    const nextIndex = questionIndex + 1;

    askQuestion(nextIndex);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cfcbd1] px-4">
      <div className="bg-[#e9e9eb] w-full max-w-3xl rounded-2xl shadow-lg p-10 text-center">
        <h1 className="text-3xl font-bold mb-6">
          Part F: Answer the questions verbally about a passage
        </h1>

        <p className="mb-8 text-lg">
          Listen to the passage and answer the following questions verbally.
        </p>

        {showAudio && (
          <div className="mb-8">
            <audio
              ref={audioRef}
              src="/audio/Part-F-Audio.mp3"
              controls
              controlsList="nodownload noplaybackrate"
              onEnded={handleAudioEnd}
              onPlay={() => {
                if (audioPlayed) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                }
              }}
              className="mx-auto"
            />

            <p className="text-gray-600 mt-3">
              Please listen carefully. You can play the audio only once.
            </p>
          </div>
        )}

        {questionIndex >= 0 && (
          <div className="mt-6">
            <p className="text-xl font-semibold mb-4">
              {questions[questionIndex]}
            </p>
          </div>
        )}

        {showRecordBtn && !isRecording && (
          <button
            onClick={startRecording}
            className="mt-6 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90"
          >
            Record Answer
          </button>
        )}

        {isRecording && (
          <div className="mt-6">
            <p className="text-red-600 text-lg font-semibold">
              Time Left: {timeLeft} sec
            </p>

            <p className="mt-4 bg-gray-100 p-3 rounded text-sm min-h-[80px]">
              {liveTranscript || "Listening..."}
            </p>
          </div>
        )}

        {showNextQuestionBtn && (
          <button
            onClick={goToNextQuestion}
            className="mt-8 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90"
          >
            Next Question
          </button>
        )}

        {showNextPageBtn && (
          <button
            onClick={() => navigate("/part-g")}
            className="mt-10 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PartF;
 */