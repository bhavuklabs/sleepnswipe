import React from "react";
import styles from "./MatchZone.module.css";
import {SwipeCards} from "../../components";


const MatchZone: React.FC = () => {
  // const [cards, setCards] = useState<Card[]>([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     image: "https://via.placeholder.com/300",
  //     description: "Loves hiking and traveling.",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     image: "https://via.placeholder.com/300",
  //     description: "Avid reader and foodie.",
  //   },
  //   {
  //     id: 3,
  //     name: "Sam Wilson",
  //     image: "https://via.placeholder.com/300",
  //     description: "Passionate about technology and coding.",
  //   },
  // ]);



  return (
    <div className={styles.contentArea}>
      <div className={styles.cardContainer}>
        <SwipeCards/>
      </div>
    </div>
  );
};

export default MatchZone;
