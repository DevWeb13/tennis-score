export const selectPlayerHasAdvantage = (playerId) => {
  return (state) => state.advantage === playerId;
};

export const selectPlayerScore = (playerId) => {
  return (state) => state[playerId];
};

export const selectDisplayText = (state) => {
  if (state.winner) {
    if (state.winner === 'player1') {
      return 'Le joueur 1 a gagné !';
    } else {
      return 'Le joueur 2 a gagné !';
    }
  } else {
    let text = 'Le score est: ' + state.player1 + ' - ' + state.player2;
    if (state.advantage) {
      if (state.advantage === 'player1') {
        text += ' avantage joueur 1';
      } else {
        text += ' avantage joueur 2';
      }
    }
    return text;
  }
};

export const selectPlayerPoints = (playerId) => {
  return (state) =>
    state.history.filter((item) => item.winner === playerId).length;
};

export const selectPointsBeforeWin = (playerId) => {
  const otherPlayer = playerId === 'player1' ? 'player2' : 'player1';
  return (state) => {
    if (state.winner) {
      return null;
    }
    if (state.advantage === playerId) {
      return 1;
    }
    if (state.advantage === otherPlayer) {
      return 3;
    }
    const playerScore = state[playerId];
    const otherPlayerScore = state[otherPlayer];
    const pointsToWin =
      playerScore === 0
        ? 4
        : playerScore === 15
        ? 3
        : playerScore === 30
        ? 2
        : 1;
    if (otherPlayerScore === 40) {
      return pointsToWin + 1;
    }
    return pointsToWin;
  };
};

export const selectGameIsPlaying = (state) => {
  return state.playing;
};
