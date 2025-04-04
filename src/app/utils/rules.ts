import { Card } from '../components/Board';

export const getAdjacentPositions = (index: number): Array<{ index: number; side: keyof Card; oppositeSide: keyof Card}> => {
  return [
    { index: index - 3, side: 'top', oppositeSide: 'bottom' },
    { index: index + 1, side: 'right', oppositeSide: 'left' },
    { index: index + 3, side: 'bottom', oppositeSide: 'top' },
    { index: index - 1, side: 'left', oppositeSide: 'right' }
  ];
};

export const checkPlusRule = (
  grid: Array<Card | null>,
  index: number,
  setPlusMessage: (value: boolean) => void,
  updateScores: (grid: Array<Card | null>) => void,
  setGrid: (grid: Array<Card | null>) => void
) => {
  const card = grid[index];
  if (!card) return;

  const newGrid = [...grid];
  const matchedPairs: number[] = [];
  const adjacentPositions = getAdjacentPositions(index);
  const sums: { [key: number]: number } = {};

  let hasOpponentCard = false;

  adjacentPositions.forEach(({ index: adjacentIndex, side, oppositeSide }) => {
    if (adjacentIndex < 0 || adjacentIndex >= 9) return;
    const adjacentCard = grid[adjacentIndex];
    if (!adjacentCard) return;

    if (adjacentCard.owner !== card.owner) {
      hasOpponentCard = true;
    }

    const sum = (card[side as keyof Card] as number) + (adjacentCard[oppositeSide as keyof Card] as number);
    sums[adjacentIndex] = sum;
  });

  const sumEntries = Object.entries(sums);

  for (let i = 0; i < sumEntries.length; i++) {
    for (let j = i + 1; j < sumEntries.length; j++) {
      if (sumEntries[i][1] === sumEntries[j][1]) {
        matchedPairs.push(parseInt(sumEntries[i][0]), parseInt(sumEntries[j][0]));
      }
    }
  }

  if (matchedPairs.length > 0 && hasOpponentCard) {
    console.log('Plus rule matched');
    setPlusMessage(true);
    setTimeout(() => setPlusMessage(false), 2000);

    matchedPairs.forEach((matchedIndex) => {
      if (newGrid[matchedIndex]) {
        newGrid[matchedIndex] = { ...newGrid[matchedIndex]!, owner: card.owner };
      }
    });

    setGrid(newGrid);
    updateScores(newGrid);
  }
};

export const checkSameRule = (
  grid: Array<Card | null>,
  index: number,
  setSameMessage: (value: boolean) => void,
  updateScores: (grid: Array<Card | null>) => void,
  setGrid: (grid: Array<Card | null>) => void
) => {
  const card = grid[index];
  if (!card) return;

  const newGrid = [...grid];
  const matchedCards: number[] = [];
  const adjacentPositions = getAdjacentPositions(index);

  let hasOpponentCard = false;

  adjacentPositions.forEach(({ index: adjacentIndex, side, oppositeSide }) => {
    if (adjacentIndex < 0 || adjacentIndex >= 9) return;
    const adjacentCard = grid[adjacentIndex];
    if (!adjacentCard) return;

    if (adjacentCard.owner !== card.owner) {
      hasOpponentCard = true;
    }

    if (card[side] === adjacentCard[oppositeSide]) {
      matchedCards.push(adjacentIndex);
    }
  });

  if (matchedCards.length >= 2 && hasOpponentCard) {
    console.log('Same rule matched');
    setSameMessage(true);
    setTimeout(() => setSameMessage(false), 2000);
    matchedCards.forEach((matchedIndex) => {
      newGrid[matchedIndex] = { ...newGrid[matchedIndex]!, owner: card.owner };
    });
    setGrid(newGrid);
    updateScores(newGrid);
  }
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