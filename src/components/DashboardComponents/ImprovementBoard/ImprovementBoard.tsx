import React from "react";
import styles from "./ImprovementBoard.module.css";

interface ImprovementBoardProps {
  data: {
    Name: string;
    Score: number;
    Improvement: number;
  }[];
  improved: number;
}

const ImprovementBoard: React.FC<ImprovementBoardProps> = ({
  data,
  improved,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>LeaderBoard</h2>
      <p className={styles.subtitle}>
        {improved} Improved their mental health this month
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th className={styles.improve}>Improvement</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Name}</td>
              <td>{item.Score}%</td>
              <td
                className={
                  item.Improvement >= 0
                    ? styles.positiveImprovement
                    : styles.negativeImprovement
                }
              >
                <div className={styles.improve}>
                  {item.Improvement >= 0
                    ? `+${item.Improvement}`
                    : item.Improvement}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImprovementBoard;
