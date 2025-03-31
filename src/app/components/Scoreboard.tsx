import React from 'react';
import styles from '../styles/Scoreboard.module.css';

interface ScoreboardProps {
    player1Score: number;
    player2Score: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ player1Score, player2Score }) => {
    return (
        <div className={styles.scoreboard}>
            <div className="text-xl font-bold">Player 1: {player1Score}</div>
            <div className="text-xl font-bold">Player 2: {player2Score}</div>
        </div>
    );
}

export default Scoreboard;