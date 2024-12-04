import React, { useEffect } from "react";
import styles from "./SwipeCard.module.css";
import Hammer from "hammerjs";
import { Heart, X, MessageCircleHeart } from "lucide-react";

const SwipeCards: React.FC = () => {
  useEffect(() => {
    const allCards = Array.from(
      document.querySelectorAll(`.${styles.swipeCard}`)
    ) as HTMLElement[];

    const swipeContainer = document.querySelector(`.${styles.swipe}`) as HTMLElement;
    const nope = document.getElementById("nope");
    const love = document.getElementById("love");

    const moveOutWidth = document.body.clientWidth * 1.5;

    const handleSwipe = (card: HTMLElement, isRightSwipe: boolean) => {
      const toX = isRightSwipe ? moveOutWidth : -moveOutWidth;
      const toY = -100;
      const rotate = isRightSwipe ? 30 : -30;

      card.style.transform = `translate(${toX}px, ${toY}px) rotate(${rotate}deg)`;
      card.classList.add(styles.removed);

      setTimeout(() => {
        card.style.display = "none"; // Remove card visually after animation
        reorderCards();
      }, 300);
    };

    const reorderCards = () => {
      const remainingCards = document.querySelectorAll(
        `.${styles.swipeCard}:not(.${styles.removed})`
      ) as NodeListOf<HTMLElement>;

      remainingCards.forEach((card, index) => {
        card.style.zIndex = `${remainingCards.length - index}`;
        card.style.transform = `scale(${(20 - index) / 20}) translateY(-${30 * index}px)`;
        card.style.opacity = `${(10 - index) / 10}`;
      });
    };

    const initHammer = (card: HTMLElement) => {
      const hammertime = new Hammer(card);

      hammertime.on("pan", (event) => {
        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;

        card.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
        swipeContainer?.classList.toggle(styles.swipeLove, event.deltaX > 0);
        swipeContainer?.classList.toggle(styles.swipeNope, event.deltaX < 0);
      });

      hammertime.on("panend", (event) => {
        swipeContainer?.classList.remove(styles.swipeLove);
        swipeContainer?.classList.remove(styles.swipeNope);

        if (Math.abs(event.deltaX) > 100 || Math.abs(event.velocityX) > 0.5) {
          handleSwipe(card, event.deltaX > 0);
        } else {
          card.style.transform = "";
        }
      });
    };

    const createButtonListener = (isRightSwipe: boolean) => () => {
      const cards = document.querySelectorAll(
        `.${styles.swipeCard}:not(.${styles.removed})`
      ) as NodeListOf<HTMLElement>;

      if (!cards.length) return;
      const card = cards[0];
      handleSwipe(card, isRightSwipe);
    };

    allCards.forEach((card) => {
      initHammer(card);
    });

    if (nope) nope.addEventListener("click", createButtonListener(false));
    if (love) love.addEventListener("click", createButtonListener(true));
  }, []);

  return (
    <div className={styles.swipe}>
      <div className={styles.swipeCards}>
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} id={`card-${index}`} className={styles.swipeCard}>
            <img
              src={`https://picsum.photos/600/300?random=${index}`}
              alt={`Card ${index}`}
            />
            <h3>Demo card {index}</h3>
            <p>This is a demo for swipe-like cards</p>
          </div>
        ))}
      </div>

      <div className={styles.actionButtons}>
        <button
          id="nope"
          className={`${styles.actionButton} ${styles.skipButton}`}>
          <X size={24} />
        </button>
        <button
          id="love"
          className={`${styles.actionButton} ${styles.likeButton}`}>
          <Heart size={24} />
        </button>
        <button
          id="chat"
          className={`${styles.actionButton} ${styles.messageButton}`}>
          <MessageCircleHeart size={24} />
        </button>
      </div>
    </div>
  );
};

export default SwipeCards;
