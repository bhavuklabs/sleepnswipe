import React from 'react';
import styles from './Error.module.css';


interface ErrorProps {
  error: string;
  errorMessage: string;
}

const Error: React.FC<ErrorProps> = ({error, errorMessage}) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorBlock}>
        <div className={styles.errorIllustration}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2L1 22h22L12 2zm1 17h-2v-2h2v2zm0-4h-2V9h2v6z" />
          </svg>
        </div>
        <div className={styles.errorTitle}>{error}</div>
        <div className={styles.errorMessage}>
          {errorMessage}
        </div>
        <button className={styles.errorAction} onClick={handleRefresh}>
          Refresh and Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
