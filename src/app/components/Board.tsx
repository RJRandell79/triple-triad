import React, { useState } from 'react';
import { generatePlayerCards } from '../utils/cards';
import { checkAndFlipAdjacentCards, checkSameRule, checkPlusRule } from '../utils/rules';
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

interface BoardProps {
  isSameRuleEnabled: boolean;
  isPlusRuleEnabled: boolean;
}

const Board: React.FC<BoardProps> = ({ isSameRuleEnabled, isPlusRuleEnabled }) => {
  const [grid, setGrid] = useState<Array<Card | null>>(Array(9).fill(null));
  const [player1Cards, setPlayer1Cards] = useState<Card[]>([]);
  const [player2Cards, setPlayer2Cards] = useState<Card[]>([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>('player1');
  const [sameMessage, setSameMessage] = useState(false);
  const [plusMessage, setPlusMessage] = useState(false);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [showNewGameDialog, setShowNewGameDialog] = useState(false);

  const updateScores = (grid: Array<Card | null>) => {
    const player1Count = grid.filter(card => card?.owner === 'player1').length;
    const player2Count = grid.filter(card => card?.owner === 'player2').length;
    setPlayer1Score(player1Count);
    setPlayer2Score(player2Count);
  };

  const resetGame = () => {
    const { player1Cards, player2Cards } = generatePlayerCards();

    setGrid(Array(9).fill(null));
    setPlayer1Cards(player1Cards as Card[]);
    setPlayer2Cards(player2Cards as Card[]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentPlayer('player1');
    setGameResult(null);
    setShowNewGameDialog(false);
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
    
    if (isSameRuleEnabled) {
      checkSameRule(newGrid, index, setSameMessage, updateScores, setGrid);
    }
    if (isPlusRuleEnabled) {
      checkPlusRule(newGrid, index, setPlusMessage, updateScores, setGrid);
    }

    setGrid(newGrid => {
      updateScores(newGrid);
      return newGrid;
    });

    if(newGrid.every(card => card !== null)) {
      const player1Count = newGrid.filter(card => card?.owner === 'player1').length || 0;
      const player2Count = newGrid.filter(card => card?.owner === 'player2').length || 0;

      console.log(player1Count, player2Count);

      if(player1Count > player2Count) {
          setGameResult('Player 1 wins!');
      } else if(player2Count > player1Count) {
          setGameResult('Player 2 wins!');
      } else {
          setGameResult('Draw');
      }
      setShowNewGameDialog(true);
    }

    setCurrentPlayer(currentPlayer === 'player1' ? 'player2' : 'player1');
  };

  return (
    <>
        <Scoreboard player1Score={player1Score} player2Score={player2Score} />
        <div className={styles.board}>
            <Deck setPlayer1Cards={setPlayer1Cards} setPlayer2Cards={setPlayer2Cards} />

            {sameMessage && <p className={styles.same}>Same</p>}
            {plusMessage && <p className={styles.plus}>Plus</p>}

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

        {showNewGameDialog && (
        <div className={styles.dialog}>
          <p>{gameResult}</p>
          <button onClick={resetGame}>Start New Game</button>
        </div>
      )}
    </>
  );
};

export default Board;