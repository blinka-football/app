import React, { useEffect, useState } from 'react';
import '../css/confetti.scss'; // Import the CSS

const Confetti = ({ isVisible }) => {
  const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {
    if (isVisible) {
      const pieces = Array.from({ length: 150 }).map((_, i) => i);
      setConfettiPieces(pieces);
    } else {
      setConfettiPieces([]);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null; // Do not render anything if not visible
  }

  return (
    <div className="confetti-wrapper confetti-active">
      {confettiPieces.map((piece) => (
        <div key={piece} className={`confetti-piece confetti-${piece}`}></div>
      ))}
    </div>
  );
};

export default Confetti;
