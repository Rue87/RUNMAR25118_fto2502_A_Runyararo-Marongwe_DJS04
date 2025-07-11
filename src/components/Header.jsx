import searchicon from '../assets/searchIcon.png'; 
import profileicon from '../assets/profileIcon.png'; 
import '../index.css';
/**
 * Header component with logo, search icon, and user profile.
 * @returns {JSX.Element}
 */
export default function Header() {

    const handleSearchClick = () => {
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
        <img 
          src={profileicon} 
          alt="User Profile" 
          className="profile-avatar" 
        />
      </div>
    </header>
  );
}
