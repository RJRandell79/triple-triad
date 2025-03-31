import cardData from '../../data/cards.json';

export interface Card {
  id: number;
  name: string;
  top: number;
  right: number;
  bottom: number;
  left: number;
  owner: string;
}

export const shuffleArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generatePlayerCards = (): { player1Cards: Card[]; player2Cards: Card[] } => {
  const shuffledCards = shuffleArray([...cardData]);
  const player1Cards = shuffledCards.slice(0, 5).map(card => ({ ...card, owner: 'player1' }));
  const player2Cards = shuffledCards.slice(5, 10).map(card => ({ ...card, owner: 'player2' }));
  return { player1Cards, player2Cards };
};