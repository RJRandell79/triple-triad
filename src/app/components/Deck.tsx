'use client';

import { useEffect } from 'react';
import { generatePlayerCards } from '../utils/cards';

interface DeckProps {
    setPlayer1Cards: (cards: any[]) => void;
    setPlayer2Cards: (cards: any[]) => void;
}

const Deck: React.FC<DeckProps> = ({ setPlayer1Cards, setPlayer2Cards }) => {
  useEffect(() => {
    const { player1Cards, player2Cards } = generatePlayerCards();
    setPlayer1Cards(player1Cards);
    setPlayer2Cards(player2Cards);
  }, [setPlayer1Cards, setPlayer2Cards]);

  return null;
};

export default Deck;