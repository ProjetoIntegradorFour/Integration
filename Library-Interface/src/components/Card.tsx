import React from "react";

interface CardProps {
  title: string;
  imageUrl: string;
  line1: string;
  line2: string;
  line3: string;
}

const Card: React.FC<CardProps> = ({ title, imageUrl, line1, line2, line3 }) => {
  return (
    <div className="card-container">
      {/* Título fora do card */}
      <h2 className="card-title">{title}</h2>

      {/* Card */}
      <div className="card">
        {/* Imagem à esquerda */}
        <div className="card-image">
          <img src={imageUrl} alt="Card" />
        </div>

        {/* Conteúdo */}
        <div className="card-content">
          <p>{line1}</p>
          <p>{line2}</p>
          <p>{line3}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
