import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import diceimage from "./Assit/icon-dice.svg";
import divider from "./Assit/pattern-divider-desktop.svg";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [adviceId, setAdviceId] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      const adviceData = response.data.slip;
      setAdvice(adviceData.advice);
      setAdviceId(adviceData.id);
    } catch (error) {
      console.error("Error fetching advice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-dark-blue">
      <div className="bg-dark-grayish-blue text-light-cyan p-8 rounded-lg text-center shadow-lg max-w-md w-full relative">
        <h1 className="text-neon-green text-xs tracking-widest mb-4">
          ADVICE #{adviceId}
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <div className="loader"></div>
          </div>
        ) : (
          <p className="text-2xl mb-6 font-bold">{advice}</p>
        )}
        <div className="flex justify-center mb-6">
          <img src={divider} alt="divider" className="w-full" />
        </div>
        <button
          onClick={fetchAdvice}
          className="bg-neon-green p-4 rounded-full hover:shadow-lg transition absolute -bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <img src={diceimage} alt="dice" />
        </button>
      </div>
    </div>
  );
};

export default App;
