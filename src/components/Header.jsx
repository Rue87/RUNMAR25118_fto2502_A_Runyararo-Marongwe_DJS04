import searchicon from '../assets/searchIcon.png'; 
import profileicon from '../assets/profileIcon.png'; 
import '../index.css';
import { useState } from 'react';
/**
 * Header component with logo, search icon, and user profile.
 * When search icon is clicked, the search bar appears.
 * @returns {JSX.Element}
 */
export default function Header({ searchTerm, setSearchTerm }) {
    const [showSearch, setShowSearch] = useState(false); // Controls whether the input is visible

    const handleSearchClick = () => {
    setShowSearch((prev) => !prev); // flip the switch to show or hide the input field
    const input = document.querySelector('input[type="text"]');
    if (input) input.focus();
  };

  return (
    <header className="app-header">
      <h1>🎙️ Podcast App</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <img
          src={searchicon}
          alt="Search"
          className="search-icon"
          onClick={handleSearchClick}
        />

         {/* Conditionally render the search input */}
        {showSearch && (
          <input
            type="text"
            placeholder="Search shows..."
            value={searchTerm}
            //This instantly filters the podcast list, so users see results live.
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        )}
        <img 
          src={profileicon} 
          alt="User Profile" 
          className="profile-avatar" 
        />
      </div>
    </header>
  );
}
