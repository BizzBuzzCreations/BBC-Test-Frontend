import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PartC = () => {

  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [audioPlayed,setAudioPlayed] = useState(false);
  const [startQuestions,setStartQuestions] = useState(false);

  const [currentQuestion,setCurrentQuestion] = useState(0);
  const [timeLeft,setTimeLeft] = useState(10);
  const [answer,setAnswer] = useState("");

  const [timerStarted,setTimerStarted] = useState(false);

  const [showNextQuestion,setShowNextQuestion] = useState(false);
  const [showFinalNext,setShowFinalNext] = useState(false);

  const [results,setResults] = useState([]);

  const questions = [
    "What is Anna Greig’s address?",
    "What is Anna Greig’s nationality?",
    "What is the serial number of the computer?",
    "What was the material of the Claude Frieder shoulder bag?"
  ];

  const correctAnswers = [
    ["4 ellendale street","4 ellendale st"],
    ["grenadian nationality","grenadian"],
    ["g4168770"],
    ["silver coloured cloth","silver colored cloth"]
  ];


  const normalize = (text) => {
    return text
      .toLowerCase()
      .replace(/[.,’'--]/g," ")
      .replace(/\s+/g," ")
      .trim();
  };


  
  const sendMarksToBackend = async (marks)=>{

    try {
      const res = await axios.post(
        "https://8mbq32t9-8080.inc1.devtunnels.ms/api/auth/add-marks",
        {
        testId: "Part-C", 
        marks
        },
        { withCredentials: true }
      );
     

    }catch(err){

      console.log("Error sending marks",err);

    }

  };



  useEffect(()=>{

    window.speechSynthesis.cancel();

    const intro = new SpeechSynthesisUtterance(
      "Part C. Listen to two people have a conversation. Then answer four questions about the conversation."
    );

    intro.rate = 0.9;

    window.speechSynthesis.speak(intro);

  },[]);



  const handleAudioEnd = ()=>{

    setAudioPlayed(true);

    setTimeout(()=>{

      setStartQuestions(true);
      speakQuestion(0);

    },1000);

  };



  const speakQuestion = (index)=>{

    const speech = new SpeechSynthesisUtterance(questions[index]);

    speech.rate = 0.9;

    window.speechSynthesis.speak(speech);

  };



  useEffect(()=>{

    if(!timerStarted) return;

    if(timeLeft === 0){

      setTimerStarted(false);

      const userAnswer = normalize(answer);

      const acceptableAnswers =
        correctAnswers[currentQuestion].map(a => normalize(a));

      const isCorrect = acceptableAnswers.includes(userAnswer);

      const updatedResults = [...results,isCorrect];

      setResults(updatedResults);

      console.log("Question:",currentQuestion+1);
      console.log("User Answer:",userAnswer);
      console.log("Correct:",isCorrect);

      if(currentQuestion < questions.length - 1){

        setShowNextQuestion(true);

      }else{
        
        const correctCount = updatedResults.filter(r => r).length;

        const totalMarks = correctCount * 2.5;

        console.log("Total Marks:",totalMarks);

        
        sendMarksToBackend(totalMarks);

        setShowFinalNext(true);

      }

      return;

    }

    const timer = setTimeout(()=>{
      setTimeLeft(prev => prev - 1)
    },1000);

    return () => clearTimeout(timer);

  },[timeLeft,timerStarted]);



  const handleTyping = (e)=>{

    setAnswer(e.target.value);

    if(!timerStarted){
      setTimerStarted(true);
    }

  };



  const goToNextQuestion = ()=>{

    const next = currentQuestion + 1;

    setCurrentQuestion(next);
    setAnswer("");
    setTimeLeft(10);

    setShowNextQuestion(false);

    speakQuestion(next);

  };



  return(

    <div className="min-h-screen flex items-center justify-center bg-[#cfcbd1] px-4">

      <div className="bg-[#e9e9eb] w-full max-w-4xl rounded-2xl shadow-lg p-10 text-center">

        <h1 className="text-3xl font-bold mb-6">
          Part C: Answer the questions about the conversation
        </h1>

        <p className="text-lg mb-6">
          Listen to 2 people have a conversation. Then answer 4 questions about the conversation.
        </p>

        <div className="mb-8">

          <audio
            ref={audioRef}
            src="/audio/Part-C-Audio.mp3"
            controls
            controlsList="nodownload noplaybackrate"
            onEnded={handleAudioEnd}
            onPlay={()=>{
              if(audioPlayed){
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
            }}
            className="mx-auto"
          />

          <p className="mt-4 text-gray-600">
            Please listen to the audio carefully. You will not be able to replay it.
          </p>

        </div>


        {startQuestions && (

          <div className="space-y-6">

            <h2 className="text-xl font-semibold">
              Question {currentQuestion + 1}
            </h2>

            <p className="text-lg">
              {questions[currentQuestion]}
            </p>

            <input
              type="text"
              value={answer}
              onChange={handleTyping}
              disabled={showNextQuestion || showFinalNext}
              placeholder="Type your answer..."
              className="w-full p-3 border rounded-lg disabled:bg-gray-400"
            />

            {timerStarted && (

              <p className="text-red-600 font-semibold">
                Time Left: {timeLeft}s
              </p>

            )}

          </div>

        )}


        {showNextQuestion && (

          <button
            onClick={goToNextQuestion}
            className="mt-6 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg"
          >
            Next Question
          </button>

        )}


        {showFinalNext && (

          <button
            onClick={()=>navigate("/part-d")}
            className="mt-6 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg"
          >
            Next
          </button>

        )}

      </div>

    </div>

  );

};

export default PartC;