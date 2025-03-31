'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useDrag } from 'react-dnd';
import styles from '../styles/Card.module.css';

interface CardProps {
  id: number;
  name: string;
  top: number;
  right: number;
  bottom: number;
  left: number;
  owner: 'player1' | 'player2';
  currentPlayer: 'player1' | 'player2';
}

const CardComponent: React.FC<CardProps> = ({ id, name, top, right, bottom, left, owner, currentPlayer }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isDragging }, drag] = useDrag({
        type: 'CARD',
        item: { id, name, top, right, bottom, left, owner },
        canDrag: () => owner === currentPlayer,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [prevOwner, setPrevOwner] = useState<'player1' | 'player2'>(owner);

    useEffect(() => {
        const otherPlayer = owner === 'player1' ? 'player2' : 'player1';
        console.log(`Owner for card ${id}: ${prevOwner}`);
        console.log(`Owner for card ${id} updated to: ${owner}`);
        if (prevOwner !== owner) {
            console.log(`Adding flip class for card ${id}`);
            ref.current?.classList.add(styles.flip);
            setTimeout(() => {
                console.log(`Removing flip class for card ${id}`);
                ref.current?.classList.remove(styles.flip);
            }, 600);
            setPrevOwner(otherPlayer);
        }
    }, [owner, prevOwner]);

    drag(ref);

  return (
    <div ref={ref} className={`${styles.card} ${styles[owner]}`} style={{ opacity: isDragging ? 0.75 : 1 }}>
      <div className={styles.front}>
        <div className={`${'drop-shadow-sm text-base text-white'} ${styles.name}`}>{name} ({id})</div>
        <div className={styles.numbers}>
          <div className={`${'drop-shadow-sm text-xl'} ${styles.top}`}>{top}</div>
          <div className={`${'drop-shadow-sm text-xl'} ${styles.right}`}>{right}</div>
          <div className={`${'drop-shadow-sm text-xl'} ${styles.bottom}`}>{bottom}</div>
          <div className={`${'drop-shadow-sm text-xl'} ${styles.left}`}>{left}</div>
        </div>
      </div>
      <div className={styles.back}>
        <Image src="/card-back.png" alt="Card Back" width={150} height={200} />
      </div>
    </div>
  );
};

export default CardComponent;