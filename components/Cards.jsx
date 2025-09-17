import "../styles/cards.css";

const Cards = ({ data, loading, error, handleChoice, shuffleCards }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="card-grid">
      {data.map((character) => (
        <div key={character.id} className="card">
          <img
            onClick={() => {
              handleChoice(character.name);
              shuffleCards();
            }}
            src={character.image}
            alt={character.name}
          />
          <p>{character.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
