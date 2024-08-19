import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinatons";
import GameOver from "./components/GameOver";

const initalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function dericeActivePlayer(gameTurns, board){
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer =  'O'
  }
  return currentPlayer
}

function App() {
  const [players, setPlayers] =useState({
    X: 'Player 1',
    O: 'Player 2',
  })
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");


  const activePlayer = dericeActivePlayer(gameTurns)

  let gameBoard = [...initalGameBoard.map(array => [...array])];
    
  for (const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} =  square

      gameBoard [row][col] = player
  }

  let winner;
  for (const combinaton of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinaton[0].row][combinaton[0].column]
    const secondSquareSymbol = gameBoard[combinaton[1].row][combinaton[1].column]
    const thirdSquareSymbol = gameBoard[combinaton[2].row][combinaton[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  let hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = dericeActivePlayer(prevTurns);

      // if (prevTurns.length > 0 && prevTurns[0].player === 'X'){
      //   currentPlayer =  'O'
      // }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns
    });
  }


  function handleRematch(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol] :newName
      }
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) &&  <GameOver winner ={winner} onRematch={handleRematch}/>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          //activePlayerSymbol={activePlayer}
          board= {gameBoard}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
