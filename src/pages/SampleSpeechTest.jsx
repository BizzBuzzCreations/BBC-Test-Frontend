import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SampleSpeechTest = () => {

const [showRecordBtn,setShowRecordBtn]=useState(false);
const [isRecording,setIsRecording]=useState(false);
const [timeLeft,setTimeLeft]=useState(30);
const [liveTranscript,setLiveTranscript]=useState("");
const [showNext,setShowNext]=useState(false);

const navigate = useNavigate();
const recognitionRef = useRef(null);
const timerRef = useRef(null);
const transcriptRef = useRef("");
const hasSpokenRef = useRef(false);

useEffect(()=>{

if(hasSpokenRef.current) return;
hasSpokenRef.current=true;

const text=`
Speech Test.
Record a speech sample.
Could you please give a brief introduction about yourself and tell us where you see yourself in the next five years?
`;

const speech=new SpeechSynthesisUtterance(text);
speech.rate=0.9;

speech.onend=()=>{
setShowRecordBtn(true);
};
speech.onerror=()=>{
setShowRecordBtn(true);
};

window.speechSynthesis.cancel();
window.speechSynthesis.speak(speech);

const fallbackTimer=setTimeout(()=>setShowRecordBtn(true),30000);
return ()=>clearTimeout(fallbackTimer);

},[]);


const startTimer=()=>{

setTimeLeft(30);

timerRef.current=setInterval(()=>{

setTimeLeft(prev=>{

if(prev === 1){
clearInterval(timerRef.current);
stopRecording();
setShowNext(true);
return 0;
}

return prev - 1;

});

},1000);

};


const startRecording=()=>{

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(!SpeechRecognition){
alert("Speech recognition not supported");
return;
}

const recognition = new SpeechRecognition();
recognition.lang="en-US";
recognition.interimResults=true;
recognition.continuous=true;

recognition.onresult=(event)=>{

let interim="";
let final="";

for(let i=event.resultIndex;i<event.results.length;i++){

const res=event.results[i];

if(res.isFinal){
final+=res[0].transcript+" ";
}else{
interim+=res[0].transcript+" ";
}

}

if(final){
transcriptRef.current+=final;
}

setLiveTranscript((transcriptRef.current+interim).trim());

};

recognitionRef.current=recognition;
recognition.start();

setIsRecording(true);
setShowNext(false);
transcriptRef.current="";
setLiveTranscript("");

startTimer();

};


const stopRecording=()=>{

clearInterval(timerRef.current);

if(recognitionRef.current){
recognitionRef.current.stop();
}

setIsRecording(false);

};


return(

<div className="min-h-screen flex items-center justify-center bg-[#cfcbd1] px-4">

<div className="bg-[#e9e9eb] max-w-3xl w-full rounded-xl shadow-lg p-12 text-center">

<h1 className="text-3xl font-bold underline mb-6">
Speech Test:
</h1>

<h2 className="text-2xl font-semibold mb-6">
Record a speech sample
</h2>

<p className="text-xl leading-relaxed">
Could you please give a brief introduction about yourself and tell us where you see yourself in the next five years?
</p>

{showRecordBtn && !isRecording && !showNext &&(

<button
onClick={startRecording}
className="mt-10 bg-[#1f2f3f] text-white px-10 py-3 rounded-lg hover:opacity-90 transition"
>
Record Answer
</button>

)}

{isRecording &&(

<div className="mt-6">

<p className="text-red-600 font-semibold text-xl">
Time Left: {timeLeft}s
</p>

<p className="mt-4 bg-gray-100 p-3 rounded text-sm min-h-[80px]">
{liveTranscript || "Listening..."}
</p>

</div>

)}

{showNext &&(

<div className="mt-8">

<p className="mb-4 text-green-700 font-semibold">
Recording completed.
</p>

<button
onClick={() => navigate("/part-a")}
className="bg-[#1f2f3f] text-white px-6 py-2 rounded"
>
Next
</button>

</div>

)}

</div>

</div>

);

};

export default SampleSpeechTest;    