import { useState } from "react";
import { Square } from "./Square";

export function Board() {
    const [isXTurn, setIsXTurn] = useState(true);

    const initialSquares = Array(9).fill(" ");

    const [squares, setSquares] = useState(initialSquares);

    function calculateWinner (squares: Array<string>)
    {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
            [0, 4, 8], [2, 4, 6]             //diagonals         
        ]

        for (let line of lines){
            const [a, b, c] = line;
            if(squares[a]!= " " && squares[a] == squares[b] && squares[a] == squares[c])
                return squares[a];
        }

        return null;
    }

    function calculateGameOver (squares: Array<string>)
    {
        const winnerDeclared = Boolean(calculateWinner(squares));
        const boardFilled = !squares.includes(" ");

        return (winnerDeclared || boardFilled);
    }

    const winner = calculateWinner(squares);
    const gameOver = calculateGameOver(squares);
    const status = winner ?
    `${winner} won!` :
    gameOver ? 
    `Game Over!` : 
    `${isXTurn ? 'X' : 'O'} turn!`;

    const renderSquare = (index: number) => {
        return (
            <Square 
                value={squares[index]} 
                onClickEvent={() => handleClickEvent(index)}
            />
        );
    };

    const handleClickEvent = (index: number) => {
        const newSquares = [...squares];

        const winnerDeclared = Boolean(calculateWinner(newSquares));
        const squareFilled = newSquares[index] != " ";
        const gameOver = calculateGameOver(newSquares);

        if(winnerDeclared || squareFilled || gameOver) return;

        newSquares[index] = isXTurn ? "X" : "O";
        setSquares(newSquares);
        setIsXTurn(!isXTurn);
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
            </div>
        </div>
    );
};