// Game.jsx
import { useState, useEffect } from "react";
import Cards from "./cards";
import "../styles/Game.css";

const Game = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [points, setPoints] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);

  const shuffleCards = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dragonball-api.com/api/characters");
        if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
        const result = await res.json();
        setData(shuffleCards(result.items)); // shuffle once when loaded
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChoice = (card) => {
    // Logic to check for matching cards
    if (card && !selectedCards.includes(card)) {
        setPoints((p) => p + 1);
        setSelectedCards((prev) => [...prev, card]);
    }else{
        resetGame();
    }
  };

  const resetGame = () => {
    setPoints(0);
    setSelectedCards([]);
    setData(shuffleCards(data)); // reshuffle current cards
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      {points >= 10 ? <p>Congratulations! You've won!</p> : <p>Points: {points}</p>}
      <button onClick={resetGame}>Reset</button>
      <Cards
        data={data}
        loading={loading}
        error={error}
        handleChoice={handleChoice}
        shuffleCards={() => setData(shuffleCards(data))}
      />
    </div>
  );
};

export default Game;
