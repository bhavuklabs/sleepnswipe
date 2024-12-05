import React from 'react';
import styles from './AnalyzingData.module.css';

const AnalyzingData: React.FC = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingBlock}>
                <div className={styles.loadingIllustration}>
                    <div className={styles.dataSpinner}></div>
                    <div className={styles.dataIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M19 2c0-1.104-.896-2-2-2h-10c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2v-20zm-8.5 0h3c.275 0 .5.225.5.5s-.225.5-.5.5h-3c-.275 0-.5-.225-.5-.5s.225-.5.5-.5zm1.5 20c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm5-3h-10v-14h10v14z" />
                        </svg>
                    </div>
                </div>
                <div className={styles.loadingTitle}>Analyzing Your Data</div>
                <div className={styles.loadingMessage}>
                    We're processing your information and generating your personalized profile. 
                    This may take a few moments<span className={styles.loadingDots}></span>
                </div>
            </div>
        </div>
    );
};

export default AnalyzingData;
