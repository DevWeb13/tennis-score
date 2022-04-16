import React from 'react';
import { useSelector } from 'react-redux';
import { selectPlayerPoints } from './selectors';

function PlayerPoints({ playerId, playerName }) {
  const playerPoints = useSelector(selectPlayerPoints(playerId));
  return (
    <div className="player-games">
      <p>{playerName}</p>
      <p>
        {playerPoints <= 1
          ? `${playerPoints} jeu gagné`
          : `${playerPoints} jeux gagnées`}
      </p>
    </div>
  );
}

export default PlayerPoints;
