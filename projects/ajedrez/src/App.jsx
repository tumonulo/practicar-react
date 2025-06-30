import { useState } from 'react'
import Board from './components/Board.jsx'
import config from './configs/config.js'

function App() {
  const [board, setBoard] = useState(() => {
    return Array(config.height).fill(null).map(() => Array(config.width).fill(null))
  })
  return (
    <Board board={board} setBoard={setBoard} />
  )
}

export default App