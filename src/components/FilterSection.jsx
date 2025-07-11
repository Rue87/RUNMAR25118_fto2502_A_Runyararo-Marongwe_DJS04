import React from 'react';
import '../index.css';

/**
 * FilterSection with dynamic dropdowns for genres and sort options.
 *
 * @param {Object} props
 * @param {Array<string>} props.genreOptions - List of genre titles (e.g., ["Technology", "Education"]).
 * @param {Array<string>} props.sortOptions - List of sort labels (e.g., ["Newest First", "Oldest First"]).
 */
export default function FilterSection({ genreOptions, sortOptions }) {
  return (
    <section className="filter-section">
       {/* Static label */}
      <label className="filter-label">Filter By:</label>

      {/*Genre dropdown with dynamic options*/}
      <select className="filter-dropdown">
        <option>All Genres</option>
        {genreOptions.map((genre, index) => (
          <option key={index}>{genre}</option>
        ))}
      </select>
      
      {/* Sort dropdown with dynamic options */}
      <select className="filter-dropdown">
        <option>Last Updated</option>
        {sortOptions.map((sort, index) => (
          <option key={index}>{sort}</option>
        ))}
      </select>
    </section>
  );
}
