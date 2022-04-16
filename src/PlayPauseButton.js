import { useSelector, useStore } from 'react-redux';
import { autoPlay } from './actions';
import { selectGameIsPlaying } from './selectors';

export function PlayPauseButton() {
  const store = useStore();
  const playing = useSelector(selectGameIsPlaying);

  return (
    <button
      className="button"
      onClick={() => {
        autoPlay(store);
      }}
    >
      {playing ? 'Jeu en cours...' : 'Jouer'}
    </button>
  );
}
