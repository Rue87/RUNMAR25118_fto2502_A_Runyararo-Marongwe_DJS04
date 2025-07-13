import { useEffect, useState } from "react";
import PodcastGrid from "./components/PodcastGrid";
import { genres } from "./data";
// import { fetchPodcasts } from "./api/fetchPodcasts";
import Header from "./components/Header";
import FilterSection from "./components/FilterSection";

import { usePodcastContext } from "./context/PodcastContext";
import { useFilteredPodcasts } from "./hooks/useFilteredPodcasts";

/**
 * App - The root component of the Podcast Explorer application.
 * Handles fetching podcast data, managing loading/error states,
 * rendering podcast grid with filtering, sorting, pagination, or load more.
 *
 * @returns {JSX.Element} The rendered application interface.
 */
export default function App() {
  // Pagination: current page number state
  const [currentPage, setCurrentPage] = useState(1);

  // Toggle between pagination or "Load More" UI modes
  const [useLoadMore, setUseLoadMore] = useState(false);

  // Number of podcasts visible when using "Load More" mode
  const [visibleCount, setVisibleCount] = useState(12);

  // Number of podcasts to show per page (pagination mode)
  const itemsPerPage = 12;

  // Genre options from data (full objects with id and title)
  const genreOptions = genres;

  // Context for shared app state: search, genre, sort, loading, error
  const {
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    sortOrder,
    setSortOrder,
    loading,
    error,
  } = usePodcastContext();

  // Get filtered podcasts list based on search, genre, and sort
  const filteredPodcasts = useFilteredPodcasts();

  // Whenever search term, genre, or sort order changes,
  // reset page number and visible count for consistent UI
  useEffect(() => {
    setVisibleCount(itemsPerPage);
    setCurrentPage(1);
  }, [searchTerm, selectedGenre, sortOrder]);

  // Calculate the index of the last visible podcast based on mode
  const indexOfLastItem = useLoadMore
    ? visibleCount
    : currentPage * itemsPerPage;

  // Podcasts to display currently after filtering, sorting, and pagination/load more
  const visiblePodcasts = filteredPodcasts.slice(0, indexOfLastItem);

  // Total pages count for pagination controls
  const totalPages = Math.ceil(filteredPodcasts.length / itemsPerPage);

  /**
   * Handle changing pages via pagination buttons.
   * @param {number} page - The new page number to switch to.
   */
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {/* Header with search input */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main>
        {/* Loading state UI */}
        {loading && (
          <div className="message-container">
            <div className="spinner"></div>
            <p>Loading podcasts...</p>
          </div>
        )}

        {/* Error state UI */}
        {error && (
          <div className="message-container">
            <div className="error">
              Error occurred while trying to fetch podcasts: {error}
            </div>
          </div>
        )}

        {/* Main content when not loading and no error */}
        {!loading && !error && (
          <>
            <div className="top-bar">
              {/* Filters and sorting */}
              <FilterSection
                genreOptions={genreOptions}
                sortOptions={["Recently Updated", "Oldest First", "A-Z", "Z-A"]}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />

              {/* Toggle button to switch between Pagination and Load More */}
              <div className="toggle-mode-container">
                <button onClick={() => setUseLoadMore(!useLoadMore)}>
                  {useLoadMore ? "Switch to Pagination" : "Use Load More"}
                </button>
              </div>
            </div>

            {/* Podcast grid showing current visible podcasts */}
            <PodcastGrid podcasts={visiblePodcasts} genres={genres} />

            {/* Load More button visible only in Load More mode */}
            {useLoadMore && visibleCount < filteredPodcasts.length && (
              <div className="load-more-container">
                <button
                  onClick={() => setVisibleCount(visibleCount + itemsPerPage)}
                >
                  Load More
                </button>
              </div>
            )}

            {/* Pagination controls visible only in Pagination mode */}
            {!useLoadMore && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  Prev
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
