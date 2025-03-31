import React, { useState } from 'react';
import { checkAndFlipAdjacentCards } from '../utils/rules';
import GridCell from './GridCell';
import CardComponent from './Card';
import Deck from './Deck';
import Scoreboard from './Scoreboard';
import styles from '../styles/Board.module.css';

export interface Card {
    id: number;
    name: string;
    top: number;
    right: number;
    bottom: number;
    left: number;
    owner: 'player1' | 'player2';
}

const Board: React.FC = () => {
  const [grid, setGrid] = useState<Array<Card | null>>(Array(9).fill(null));
  const [player1Cards, setPlayer1Cards] = useState<Card[]>([]);
  const [player2Cards, setPlayer2Cards] = useState<Card[]>([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>('player1');
  const [gameResult, setGameResult] = useState<string | null>(null);

  const updateScores = (grid: Array<Card | null>) => {
    const player1Count = grid.filter(card => card?.owner === 'player1').length;
    const player2Count = grid.filter(card => card?.owner === 'player2').length;
    setPlayer1Score(player1Count);
    setPlayer2Score(player2Count);
  };

  const handleDrop = (item: Card, index: number) => {
    const newGrid = [...grid];
    newGrid[index] = item;
    setGrid(newGrid);

    if(player1Cards.some(card => card.id === item.id)) {
      setPlayer1Cards(player1Cards.filter(card => card.id !== item.id));
    } else if(player2Cards.some(card => card.id === item.id)) {
      setPlayer2Cards(player2Cards.filter(card => card.id !== item.id));
    }

    checkAndFlipAdjacentCards(newGrid, index, setGrid, updateScores);

    const flippedCards = grid.map((card, i) => card?.owner !== newGrid[i]?.owner ? i : null).filter(index => index !== null) as number[];
    console.log(flippedCards);

    updateScores(newGrid);

    if(newGrid.every(card => card !== null)) {
      console.log(player1Score, player2Score);
      if(player1Score > player2Score) {
          setGameResult('Player 1 wins!');
      } else if(player2Score > player1Score) {
          setGameResult('Player 2 wins!');
      } else {
          setGameResult('Draw');
      }
    }

    setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
  };

  return (
    <>
        <Scoreboard player1Score={player1Score} player2Score={player2Score} />
        <div className={styles.board}>
            <Deck setPlayer1Cards={setPlayer1Cards} setPlayer2Cards={setPlayer2Cards} />
            {gameResult && <p className={styles.result}>{gameResult}</p>}

            <div className={`${styles.playerCards} ${currentPlayer !== 'player1' ? styles.fade : ''}`}>
                {player1Cards.map(card => (
                    <CardComponent key={card.id} {...card} currentPlayer={currentPlayer} />
                ))}
            </div>
            <div className={styles.grid}>
                {grid.map((card, index) => (
                    <GridCell key={index} index={index} onDrop={handleDrop} card={card} currentPlayer={currentPlayer} />
                ))}
            </div>
            <div className={`${styles.playerCards} ${currentPlayer !== 'player2' ? styles.fade : ''}`}>
                {player2Cards.map(card => (
                    <CardComponent key={card.id} {...card} currentPlayer={currentPlayer} />
                ))}
            </div>
        </div>
    </>
  );
};

export default Board;