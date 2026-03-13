import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
  const [userName,setUserName] = useState("");

  useEffect(()=>{

    const name = localStorage.getItem("userName");

    if(name){
      setUserName(name);
    }else{
      setUserName("User");
    }

  },[]);


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">

      <div className="bg-white max-w-xl w-full rounded-2xl shadow-xl p-10 text-center">

        <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-snug">

          Hello {userName}, Welcome to <br />
          BBC Test Application

        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Click below to start your English speaking and writing assessment.
        </p>

        <button
          onClick={() => navigate("/overview")}
          className="bg-[#1f2f3f] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#16232f] transition duration-300 shadow-md"
        >
          Go to Test Overview
        </button>

      </div>

    </div>

  );

};

export default Dashboard;