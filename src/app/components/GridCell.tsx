import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import CardComponent from './Card';
import styles from '../styles/GridCell.module.css';

interface Card {
  id: number;
  name: string;
  top: number;
  right: number;
  bottom: number;
  left: number;
  owner: 'player1' | 'player2';
}

interface GridCellProps {
  index: number;
  onDrop: (item: Card, index: number) => void;
  card: Card | null;
  currentPlayer: 'player1' | 'player2';
}

const GridCell: React.FC<GridCellProps> = ({ index, onDrop, card, currentPlayer }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item: Card) => onDrop(item, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  drop(ref);

  return (
    <div ref={ref} className={styles.cell} style={{ backgroundColor: isOver ? 'lightgreen' : '#f2f2f2' }}>
      {card && <CardComponent {...card} currentPlayer={currentPlayer} />}
    </div>
  );
};

export default GridCell;