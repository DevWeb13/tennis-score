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
  } else if (state.playing === false) {
    return 'Pause';
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
