import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import styles from './DashboardNavbar.module.css';

interface NavbarProps {
  profilePicUrl?: string;
  onSearchChange?: (query: string) => void;
}

const DashboardNavbar: React.FC<NavbarProps> = ({ 
  profilePicUrl = 'https://avatar.iran.liara.run/public', 
  onSearchChange 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.title}>
        <span><span>HeartLine</span> / Dashboard</span>
        <p>Dashboard</p>
      </div>
      
      <div className={styles.actions}>
        <div className={styles.searchWrapper}>
          <input 
            type="text" 
            placeholder="Search..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search className={styles.searchIcon} size={20} />
        </div>
        
        <div className={styles.icon}>
          <Bell size={24} />
        </div>
        
        <div className={styles.profile}>
          <img 
            src={profilePicUrl} 
            alt="Profile" 
            className={styles.profilePic}
          />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
