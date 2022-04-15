import { createStore } from 'redux';
import produce from 'immer';

// state
const initialState = {
  player1: 0,
  player2: 0,
  advantage: null,
  winner: null,
  playing: true,
};

function reducer(state = initialState, action) {
  if (action.type === 'restart') {
    return initialState;
  }
  if (action.type === 'playPause') {
    if (state.winner) {
      return state;
    }
    return produce(state, (draft) => {
      draft.playing = !draft.playing;
    });
  }
  if (action.type === 'pointScored') {
    const player = action.payload.player;
    const otherPlayer = player === 'player1' ? 'player2' : 'player1';
    if (state.winner) {
      // On ne peut pas marquer de point si le set est terminé
      return state;
    }
    if (state.playing === false) {
      // On ne peut pas marquer de point si le set est en pause
      return state;
    }
    const currentPlayerScore = state[player];
    if (currentPlayerScore <= 15) {
      // 0 ou 15 => on ajoute 15
      return produce(state, (draft) => {
        draft[player] = currentPlayerScore + 15;
      });
    }
    if (currentPlayerScore === 30) {
      return produce(state, (draft) => {
        draft[player] = currentPlayerScore + 10;
      });
    }
    if (currentPlayerScore === 40) {
      if (state[otherPlayer] !== 40) {
        // Le joueur à gagné
        return produce(state, (draft) => {
          draft.winner = player;
        });
      }
      if (state.advantage === player) {
        // Le joueur à gagné
        return produce(state, (draft) => {
          draft.winner = player;
        });
      }
      if (state.advantage === null) {
        // Le joueur a maintenant l'avantage
        return produce(state, (draft) => {
          draft.advantage = player;
        });
      }
      // L'autre joueur a perdu l'avantage
      return produce(state, (draft) => {
        draft.advantage = null;
      });
    }
  }
  return state;
}

export const store = createStore(reducer);

store.subscribe(() => {
  console.log('Nouveau state:');
  console.log(store.getState());
});
