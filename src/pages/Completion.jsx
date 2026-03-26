import React from "react";
import { useNavigate } from "react-router-dom";

const Completion = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e9e9eb]">

      <div className="bg-white w-[800px] max-w-[90%] rounded-2xl shadow-xl p-12 text-center">

        <h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
          🎉 Test Completed Successfully
        </h1>

        <p className="text-lg mb-8">
          Thank you for completing the BBC-Test.
        </p>

        <p className="text-lg mb-8">
          <b>Results of this test will be shared with you soon.</b>
        </p>

      </div>

    </div>
  );
};

export default Completion;