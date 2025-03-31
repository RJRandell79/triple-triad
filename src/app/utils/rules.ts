import { Card } from '../components/Board';

export const getAdjacentPositions = (index: number): Array<{ index: number; side: keyof Card; oppositeSide: keyof Card}> => {
  return [
    { index: index - 3, side: 'top', oppositeSide: 'bottom' },
    { index: index + 1, side: 'right', oppositeSide: 'left' },
    { index: index + 3, side: 'bottom', oppositeSide: 'top' },
    { index: index - 1, side: 'left', oppositeSide: 'right' }
  ];
};

export const checkAndFlipAdjacentCards = (
    grid: Array<Card | null>,
    index: number,
    setGrid: (grid: Array<Card | null>) => void,
    updateScores: (grid: Array<Card | null>) => void
  ) => {
    const card = grid[index];
    if (!card) return;
  
    const newGrid = [...grid];
    const adjacentPositions = getAdjacentPositions(index);

    adjacentPositions.forEach(({ index: adjacentIndex, side, oppositeSide }) => {
      if (adjacentIndex < 0 || adjacentIndex >= 9) return;
      if ((side === 'right' && index % 3 === 2) || (side === 'left' && index % 3 === 0)) return;
  
      const adjacentCard = grid[adjacentIndex];
      if (!adjacentCard) return;
  
      if (adjacentCard && card[side as keyof Card] > adjacentCard[oppositeSide as keyof Card]) {
        newGrid[adjacentIndex] = { ...adjacentCard, owner: card.owner };
      }
    });
  
    setGrid(newGrid);
    updateScores(newGrid);
};