'use client';

import { useEffect } from 'react';
import cardData from '../../data/cards.json';

interface Card {
    id: number;
    name: string;
    top: number;
    right: number;
    bottom: number;
    left: number;
    owner: string;
}

interface DeckProps {
    setPlayer1Cards: (cards: any[]) => void;
    setPlayer2Cards: (cards: any[]) => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Deck: React.FC<DeckProps> = ({ setPlayer1Cards, setPlayer2Cards }) => {
  useEffect(() => {
    const shuffledCards = shuffleArray([...cardData]);
    const player1Cards = shuffledCards.slice(0, 5).map(card => ({ ...card, owner: 'player1' }));
    const player2Cards = shuffledCards.slice(5, 10).map(card => ({ ...card, owner: 'player2' }));
    setPlayer1Cards(player1Cards);
    setPlayer2Cards(player2Cards);
  }, [setPlayer1Cards, setPlayer2Cards]);

  return null;
};

export default Deck;