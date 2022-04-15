// on import useSelector depuis react-redux
import { useSelector } from 'react-redux';

export function Display() {
  // on utilise useSelector avec en paramètre une fonction
  // qui permet de récupérer uniquement la propriété `playing`
  // du state
  // @ts-ignore
  const playing = useSelector((state) => state.playing);
  // @ts-ignore
  const winner = useSelector((state) => state.winner);
  // @ts-ignore
  const player1Score = useSelector((state) => state.player1);
  // @ts-ignore
  const player2Score = useSelector((state) => state.player2);
  // @ts-ignore
  const advantage = useSelector((state) => state.advantage);
  // on peut ensuite utiliser cette valeur dans le rendu

  if (winner) {
    if (winner === 'player1') {
      return <p className="display">Le joueur 1 a gagné !</p>;
    } else {
      return <p className="display">Le joueur 2 a gagné !</p>;
    }
  } else if (playing === false) {
    return <p className="display">Pause</p>;
  } else {
    let text = 'Le score est: ' + player1Score + ' - ' + player2Score;
    if (advantage) {
      if (advantage === 'player1') {
        text += ' avantage joueur 1';
      } else {
        text += ' avantage joueur 2';
      }
    }
    return <p className="display">{text}</p>;
  }
}
