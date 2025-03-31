import { useState } from "react";
import Head from "next/head";
import styles from "../app/styles/Home.module.css";
import Board from "../app/components/Board";

const Home = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSameRuleEnabled, setIsSameRuleEnabled] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  return (
    <div className="w-full h-full font-[family-name:var(--font-geist-sans)]">
      <Head>
        <title>Triple Triad</title>
        <meta name="description" content="An app to play the Triple Triad card game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <header>
          <h1 className="text-2xl font-bold mb-2">Welcome</h1>
          <p className="text-xl">Challenge your opponent and capture cards in this exciting strategy game!</p>
        </header>

        <div className={styles.main}>
          {!isGameStarted ? (
            <>
            <div className={styles.gameIntro}>
              <h2 className="text-xl font-bold mb-2">How to Play</h2>
              <p className="mb-1">Triple Triad is a strategic card game where you place cards on a 3x3 grid, comparing their sides with adjacent cards to capture them. The player with the most captured cards wins!</p>
              <p>Each card has 4 numeric values representing its sides (top, right, bottom, left). On your turn, you can place a card on the grid to capture neighboring cards with higher values.</p>
            </div>

            <div className={styles.actions}>
              <label className="flex items-center justify-center mb-4">
                <input type="checkbox" checked={isSameRuleEnabled} onChange={(e) => setIsSameRuleEnabled(e.target.checked)} className="mr-2" /> Enable "Same" Rule
              </label>
              <button onClick={handleStartGame} className={styles.startButton}>Start Game</button>
            </div>

            <div className={styles.gameRules}>
              <h3 className="text-base font-bold mb-1">Game Rules:</h3>
              <ul>
                <li>Players take turns placing cards on the grid.</li>
                <li>Cards capture adjacent cards by comparing side values.</li>
                <li>The player with the most captured cards wins!</li>
              </ul>
            </div>
            </>
          ) : (
            <Board isSameRuleEnabled={isSameRuleEnabled} />
          )}

          <footer className={styles.footer}>
            <p>&copy; 2025 Triple Triad Game</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Home;