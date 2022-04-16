// actions creators

export const setPlaying = (playing) => ({
  type: 'setPlaying',
  payload: playing,
});

export const restartGame = () => ({ type: 'restart' });

export const pointScored = (player) => ({
  type: 'pointScored',
  payload: {
    player: player,
  },
});

export const autoPlay = (store) => {
  const isPlaying = store.getState().playing;
  const isWinner = store.getState().winner;
  if (isPlaying || isWinner) {
    // Déjà entrain de jouer, on ne fait rien
    return;
  }
  // on indique que la partie est en cours
  store.dispatch(setPlaying(true));
  playNextPoint();
  function playNextPoint() {
    // le jeu est-il toujours en cours ?
    if (store.getState().playing === false) {
      // Si non, on ne fait rien
      return;
    }

    const time = 1000 + Math.floor(Math.random() * 2000);
    // on utilise setTimeout pour attendre 2 secondes
    window.setTimeout(() => {
      if (store.getState().playing === false) {
        // Si non, on ne fait rien
        return;
      }
      // si oui on marque un point aléatoire
      const pointWinner = Math.random() > 0.5 ? 'player1' : 'player2';
      store.dispatch(pointScored(pointWinner));
      // on remet le jeu en pause
      if (store.getState().winner) {
        store.dispatch(setPlaying(false));
        return;
      }
      playNextPoint();
    }, time);
  }
};
