import Cell from './Cell.jsx';

function Board({ board, setBoard }) {
  return (
    <section>
      {board.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <Cell
            key={`${rowIndex}-${columnIndex}`}
            value={cell}
          />
        ))
      )}
    </section>
  );
}

export default Board;