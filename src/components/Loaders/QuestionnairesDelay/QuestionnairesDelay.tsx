import React from 'react';
import styles from './QuestionnairesDelay.module.css';

const QuestionnaireDelay: React.FC = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.loaderContent}>
                <div className={styles.loadingIcon}>
                    <div className={styles.loadingPulse}></div>
                    <div className={styles.loadingIconCenter}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2L1 22h22L12 2zm1 17h-2v-2h2v2zm0-4h-2V9h2v6z" />
                        </svg>
                    </div>
                </div>
                <div className={styles.loadingText}>Loading Questionnaire</div>
                <div className={styles.loadingSubtext}>
                Getting everything ready for you. Just a moment<span className={styles.loadingDots}></span>
                </div>
            </div>
        </div>
    );
};

export default QuestionnaireDelay;
