import Cell from './components/Cell.jsx';
import { useState } from 'react';

const WINNER_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? turnFromStorage : 'x'
  })
  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem('winner')
    return winnerFromStorage ? winnerFromStorage : null
  })

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBINATIONS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }

  const checkGameEnded = (boardToCheck) => {
    return boardToCheck.every(cell => cell !== null)
  }

  const updateBoard = (cell, index) => {
    if (cell === 'x' || cell === 'o' || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    const newTurn = turn === 'x' ? 'o' : 'x'
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    const newWinner = checkWinner(newBoard)

    if (newWinner) {
      setWinner(newWinner)
    } else if (checkGameEnded(newBoard)) {
      setWinner(false)
    }

    window.localStorage.setItem('winner', newWinner)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    setTurn('x')

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('winner')
  }

  return (
    <>
      <h1>3 en raya</h1>
      <div className="board">
        {board.map((cell, index) => {
          return (
            <Cell
              key={index}
              value={cell}
              onClick={() => updateBoard(cell, index)}
            ></Cell>
          )
        })}
      </div>
      <div className="turno">
        <p>Turno del jugador: <strong>{turn}</strong></p>
      </div>
      {
        winner !== null && (
          <section className="winner">
            <p>
                {
                  winner === false ?
                  'Empate' :
                  'Ganó ' + winner
                }
            </p>

            <button onClick={resetGame}>Empezar de nuevo</button>
          </section>
        )
      }
    </>
  )
}

export default App