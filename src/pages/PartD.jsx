/* import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PartD = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [audioPlayed, setAudioPlayed] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const [answer, setAnswer] = useState("");

  const [timerStarted, setTimerStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  const [showNext, setShowNext] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    window.speechSynthesis.cancel();

    const intro = new SpeechSynthesisUtterance(
      "Part D. Listen to this story, and after listening, write whatever you understood about the story. Please listen to the audio carefully. You will not be able to replay it.",
    );

    intro.rate = 0.9;

    window.speechSynthesis.speak(intro);
  }, []);

  const handleAudioEnd = () => {
    setAudioPlayed(true);

    setTimeout(() => {
      setShowInput(true);
    }, 1000);
  };

  const sendMarksToBackend = async (question, answer) => {
    try {
      const response = await axios.post(
        "https://bbc-backend.bizzbuzzcreations.com/api/auth/ai-marks",
        {
          testId: "Part-D",
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
    if (!timerStarted) return;

    if (timeLeft === 0) {
      sendMarksToBackend(
        "The Wolf of Wall Street shows how Jordan Belfort rises from a small stockbroker to a very wealthy businessman through illegal stock market manipulation. His company, Stratton Oakmont, earns millions by cheating investors. With his growing wealth, Jordan lives a luxurious but reckless life filled with parties, drugs, and excessive spending. However, his illegal activities attract the attention of the FBI, leading to a serious investigation. Eventually, his crimes are exposed and he is arrested for fraud and corruption. To reduce his punishment, he cooperates with the authorities and serves time in prison. After his release, he starts a new life as a motivational speaker and sales trainer. The story highlights how greed and unethical actions can lead to downfall despite temporary success. After listening this story candidate will write whatever he/she understood about the story ",
        answer,
      );
      setShowNext(true);
      setTimerStarted(false);
      setIsCompleted(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, timerStarted]);

  const handleTyping = (e) => {
    if (isCompleted) return;

    setAnswer(e.target.value);

    if (!timerStarted) {
      setTimerStarted(true);
    }
  };

  const handleComplete = () => {
    sendMarksToBackend(
      "The Wolf of Wall Street shows how Jordan Belfort rises from a small stockbroker to a very wealthy businessman through illegal stock market manipulation. His company, Stratton Oakmont, earns millions by cheating investors. With his growing wealth, Jordan lives a luxurious but reckless life filled with parties, drugs, and excessive spending. However, his illegal activities attract the attention of the FBI, leading to a serious investigation. Eventually, his crimes are exposed and he is arrested for fraud and corruption. To reduce his punishment, he cooperates with the authorities and serves time in prison. After his release, he starts a new life as a motivational speaker and sales trainer. The story highlights how greed and unethical actions can lead to downfall despite temporary success. After listening this story candidate will write whatever he/she understood about the story ",
      answer,
    );
    setIsCompleted(true);
    setTimerStarted(false);
    setShowNext(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cfcbd1] px-4">
      <div className="bg-[#e9e9eb] w-full max-w-4xl rounded-2xl shadow-lg p-10 text-center">
        <h1 className="text-3xl font-bold mb-6">Part D: Write a passage</h1>

        <p className="text-lg mb-6">
          Listen to this story, and after listening, write whatever you
          understood about the story.
        </p>

        <div className="mb-8">
          <audio
            ref={audioRef}
            src="/audio/Part-D-Audio.mp3"
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

          <p className="mt-4 text-gray-600">
            Please listen to the audio carefully. You will not be able to replay
            it.
          </p>
        </div>

        {showInput && (
          <div className="space-y-6">
            <textarea
              value={answer}
              onChange={handleTyping}
              disabled={isCompleted}
              placeholder="Write your answer here..."
              className={`w-full h-40 p-4 border rounded-lg resize-none ${
                isCompleted ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
            />

            {timerStarted && !isCompleted && (
              <p className="text-red-600 text-lg font-semibold">
                Time Left: {formatTime(timeLeft)}
              </p>
            )}

            {!showNext && !isCompleted && timerStarted && (
              <button
                onClick={handleComplete}
                className="bg-[#1f2f3f] text-white px-8 py-3 rounded-lg hover:opacity-90"
              >
                Complete
              </button>
            )}
          </div>
        )}

        {showNext && (
          <button
            onClick={() => navigate("/part-e")}
            className="mt-6 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PartD;
*/