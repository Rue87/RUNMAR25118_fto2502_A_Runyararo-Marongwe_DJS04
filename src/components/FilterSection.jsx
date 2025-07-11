import React from 'react';
import '../index.css';

/**
 * FilterSection - Displays dropdown filters for genre and sorting.
 *
 * @param {Object} props - Props passed to the component
 * @param {Array<string>} props.genreOptions - List of genre titles for the dropdown (e.g., ["Fiction", "Business"])
 * @param {Array<string>} props.sortOptions - List of sort order options (e.g., ["Recently Updated", "Oldest First", "A-Z", "Z-A"])
 * @param {string} props.selectedGenre - The genre currently selected by the user
 * @param {Function} props.setSelectedGenre - Function to update the selectedGenre state in the parent
 * @param {string} props.sortOrder - The current sorting option selected
 * @param {Function} props.setSortOrder - Function to update the sortOrder state in the parent
 */
export default function FilterSection({ 
  genreOptions, 
  sortOptions, 
  selectedGenre,
  setSelectedGenre,
  sortOrder,
  setSortOrder,
}) {
  return (
    <section className="filter-section">
      {/* Static label shown above the dropdowns */}
      <label className="filter-label">Filter By:</label>

      {/* Genre Dropdown */}
      {/* Allows user to choose a genre to filter podcasts */}
      {/* When user selects a genre, it updates the selectedGenre in App.jsx */}
      <select
        className="filter-dropdown"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        {/* Default option to show all genres */}
        <option value="">All Genres</option>

        {/* Loop through genreOptions array to create a dropdown option for each genre */}
        {genreOptions.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Sort Dropdown */}
      {/* Lets user pick how podcasts are sorted (e.g. by date or alphabetically) */}
      {/* When changed, updates the sortOrder in App.jsx */}
      <select
        className="filter-dropdown"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        {/* Render each sort option (like "Recently Updated", "A-Z") dynamically */}
        {sortOptions.map((sort, index) => (
          <option key={index} value={sort}>
            {sort}
          </option>
        ))}
      </select>
    </section>
  );
}
