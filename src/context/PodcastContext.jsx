// context/PodcastContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import { fetchPodcasts } from "../api/fetchPodcasts";

// Create the context object
const PodcastContext = createContext();

/**
 * PodcastProvider - A React Context Provider component that manages shared podcast-related state.
 * This makes key state (search, filter, sort, etc.) available to all components via context.
 *
 * @param {object} props
 * @param {ReactNode} props.children - Components that will consume the context
 */
export function PodcastProvider({ children }) {
  // State to store the fetched podcast list
  const [podcasts, setPodcasts] = useState([]);

  // Search text entered by the user
  const [searchTerm, setSearchTerm] = useState("");

  // Genre selected by the user (used for filtering)
  const [selectedGenre, setSelectedGenre] = useState("");

  // Sort order selected by the user
  const [sortOrder, setSortOrder] = useState("Recently Updated");

  // Loading and error state for API call
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch podcasts from the API on first mount
  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  return (
    // Make context values available to children
    <PodcastContext.Provider
      value={{
        podcasts,           // full podcast list
        searchTerm,         // current search string
        setSearchTerm,      // function to update search string
        selectedGenre,      // currently selected genre
        setSelectedGenre,   // function to update genre
        sortOrder,          // current sort order
        setSortOrder,       // function to change sort order
        loading,            // true if fetching data
        error,              // holds error if fetch failed
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}

/**
 * usePodcastContext - A custom hook to access the podcast context easily.
 * @returns {object} Context value (podcasts, filters, loading, etc.)
 */
export const usePodcastContext = () => useContext(PodcastContext);
