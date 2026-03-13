import React from "react";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center bg-[#cfcbd1] py-16">
      
      <h1 className="text-4xl font-bold mb-6 text-black">
        Test Overview
      </h1>

      <p className="text-xl text-black mb-10 text-center">
        The test consists of 7 parts. Please read carefully before starting.
      </p>

      <div className="bg-[#e9e9eb] w-[700px] rounded-xl shadow-md p-10 mb-10">
        <div className="space-y-6 text-lg">
          <p><span className="font-bold">Part A</span> – Give a short answer to the question</p>
          <p><span className="font-bold">Part B</span> – Repeat a sentence</p>
          <p><span className="font-bold">Part C</span> – Answer the questions about the conversation</p>
          <p><span className="font-bold">Part D</span> – Write a passage</p>
          <p><span className="font-bold">Part E</span> – MCQ type questions</p>
          <p><span className="font-bold">Part F</span> – Answer the questions verbally about a passage</p>
          <p><span className="font-bold">Part G</span> – Give your opinion</p>
        </div>
      </div>

      <button
        onClick={() => navigate("/speaking-tips")}
        className="bg-[#1f2f3f] text-white px-12 py-3 rounded-lg hover:opacity-90 transition"
      >
        Continue
      </button>

    </div>
  );
};

export default Overview;