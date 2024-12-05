import React, { useEffect, useState, useRef } from "react";
import styles from "./SwipeCard.module.css";
import Hammer from "hammerjs";
import { Heart, X, MessageCircleHeart } from "lucide-react";

// Define an interface for card data
interface CardData {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
}

const SwipeCards: React.FC = () => {
  // State to store cards
  const [cards, setCards] = useState<CardData[]>([]);
  
  // Refs for DOM elements
  const swipeContainerRef = useRef<HTMLDivElement>(null);
  const nopeButtonRef = useRef<HTMLButtonElement>(null);
  const loveButtonRef = useRef<HTMLButtonElement>(null);

  // Generate initial demo cards if no images are fetched
  const generateDemoCards = (): CardData[] => [
    {
      id: 1,
      imageUrl: "https://picsum.photos/600/300?random=1",
      name: "Demo Card 1",
      description: "This is a demo for swipe-like cards"
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/600/300?random=2", 
      name: "Demo Card 2",
      description: "Another demo card to showcase functionality"
    },
    {
      id: 3,
      imageUrl: "https://picsum.photos/600/300?random=3",
      name: "Demo Card 3", 
      description: "Third demo card in the sequence"
    }
  ];

  useEffect(() => {
    // Fetch images from Unsplash API
    const fetchImages = async () => {
      const accessKey = "iqbaNGfK_62oWEeq0ODZ6kUiZIsDJA0d4CZdvkYVPNk"; 
      const url = `https://api.unsplash.com/search/photos?query=woman+full+body&per_page=10`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        });

        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fetchedCards: CardData[] = data.results.map((photo: any, index: number) => ({
          id: index + 1,
          imageUrl: photo.urls.regular,
          name: `Card ${index + 1}`,
          description: "This is a demo for swipe-like cards"
        }));

        setCards(fetchedCards.length > 0 ? fetchedCards : generateDemoCards());
      } catch (error) {
        console.error("Error fetching images from Unsplash:", error);
        setCards(generateDemoCards());
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (cards.length === 0) return;

    const swipeContainer = swipeContainerRef.current;
    if (!swipeContainer) return;

    const cardElements = Array.from(
      swipeContainer.querySelectorAll(`.${styles.swipeCard}`)
    ) as HTMLElement[];

    const moveOutWidth = document.body.clientWidth * 1.5;

    const handleSwipe = (card: HTMLElement, isRightSwipe: boolean) => {
      const toX = isRightSwipe ? moveOutWidth : -moveOutWidth;
      const toY = -100;
      const rotate = isRightSwipe ? 30 : -30;

      card.style.transform = `translate(${toX}px, ${toY}px) rotate(${rotate}deg)`;
      card.classList.add(styles.removed);

      setTimeout(() => {
        card.style.display = "none";
        reorderCards();
      }, 300);
    };

    const reorderCards = () => {
      const remainingCards = swipeContainer.querySelectorAll(
        `.${styles.swipeCard}:not(.${styles.removed})`
      ) as NodeListOf<HTMLElement>;

      remainingCards.forEach((card, index) => {
        card.style.zIndex = `${remainingCards.length - index}`;
        card.style.transform = `scale(${(20 - index) / 20}) translateY(-${
          30 * index
        }px)`;
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
      const cards = swipeContainer.querySelectorAll(
        `.${styles.swipeCard}:not(.${styles.removed})`
      ) as NodeListOf<HTMLElement>;

      if (!cards.length) return;
      const card = cards[0];
      handleSwipe(card, isRightSwipe);
    };

    // Initialize Hammer for each card
    cardElements.forEach((card) => {
      initHammer(card);
    });

    // Add click listeners to buttons
    const nopeButton = nopeButtonRef.current;
    const loveButton = loveButtonRef.current;

    if (nopeButton) nopeButton.addEventListener("click", createButtonListener(false));
    if (loveButton) loveButton.addEventListener("click", createButtonListener(true));

    // Cleanup function
    return () => {
      if (nopeButton) nopeButton.removeEventListener("click", createButtonListener(false));
      if (loveButton) loveButton.removeEventListener("click", createButtonListener(true));
    };
  }, [cards]);

  return (
    <div className={styles.swipe} ref={swipeContainerRef}>
      <div className={styles.swipeCards}>
        {cards.map((card) => (
          <div 
            key={card.id} 
            id={`card-${card.id}`} 
            className={styles.swipeCard}
          >
            <img src={card.imageUrl} alt={card.name} />
            <div className={styles.textBlock}>
            <h3>{card.name}</h3>
            <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actionButtons}>
        <button
          ref={nopeButtonRef}
          id="nope"
          className={`${styles.actionButton} ${styles.skipButton}`}
        >
          <X size={24} />
        </button>
        <button
          ref={loveButtonRef}
          id="love"
          className={`${styles.actionButton} ${styles.likeButton}`}
        >
          <Heart size={24} />
        </button>
        <button
          id="chat"
          className={`${styles.actionButton} ${styles.messageButton}`}
        >
          <MessageCircleHeart size={24} />
        </button>
      </div>
    </div>
  );
};

export default SwipeCards;