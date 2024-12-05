import React from 'react'
import styles from './Home.module.css';
import { Sidebar } from '../../components';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default Home;
