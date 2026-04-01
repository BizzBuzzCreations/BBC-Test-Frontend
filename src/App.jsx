import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import SpeakingTips from "./pages/SpeakingTips";
import SampleSpeechTest from "./pages/SampleSpeechTest";
import PartA from "./pages/PartA";
import PartB from "./pages/PartB";
import PartC from "./pages/PartC";
import PartE from "./pages/PartE";
import PartG from "./pages/PartG";
import Completion from "./pages/Completion";

import { ToastContainer, Bounce } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <div className="flex-1">
            <Routes>

              <Route path="/" element={<Dashboard />} />

              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<Register />} />

              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/overview" element={<Overview />} />
              <Route path="/speaking-tips" element={<SpeakingTips />} />
              <Route
                path="/sample-speech-test"
                element={<SampleSpeechTest />}
              />

              <Route path="/part-a" element={<PartA />} />
              <Route path="/part-b" element={<PartB />} />
              <Route path="/part-c" element={<PartC />} />
              <Route path="/part-e" element={<PartE />} />
              <Route path="/part-g" element={<PartG />} />

              <Route path="/completion" element={<Completion />} />

            </Routes>
          </div>

          <Footer />
        </div>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;

