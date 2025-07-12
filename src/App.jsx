import { useEffect, useState } from "react";
import PodcastGrid from "./components/PodcastGrid";
import { genres } from "./data";
//import { fetchPodcasts } from "./api/fetchPodcasts";
import Header from "./components/Header";
import FilterSection from "./components/FilterSection";

import { usePodcastContext } from "./context/PodcastContext";
import { useFilteredPodcasts } from "./hooks/useFilteredPodcasts";
/**
 * App - The root component of the Podcast Explorer application. It handles:
 * - Fetching podcast data from a remote API
 * - Managing loading and error states
 * - Rendering the podcast grid once data is successfully fetched
 * - Displaying a header and fallback UI during loading or error
 * @returns {JSX.Element} The rendered application interface
 */
export default function App() {
 // const [podcasts, setPodcasts] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
// a state variable to track the user's search input.
// 'searchTerm' holds the current text typed in the search box.
// 'setSearchTerm' is the function used to update that text.
// Initially, searchTerm is an empty string ('').
  //const [searchTerm, setSearchTerm] = useState('');

  // Current page number (for pagination)
  const [currentPage, setCurrentPage] = useState(1);
  
  //const [sortOrder, setSortOrder] = useState('Newest First');

  // Track the selected genre for filtering 
  //const [selectedGenre, setSelectedGenre] = useState('');
  // Toggle between pagination or "Load More" mode
const [useLoadMore, setUseLoadMore] = useState(false);
const [visibleCount, setVisibleCount] = useState(12);


  // Extract just the genre titles from the genres array
  //const genreTitles = genres.map((g) => g.title);
  const genreOptions = genres; // Keep full genre objects with id and title

  // Number of podcasts to show per page
  const itemsPerPage = 12;

  //useEffect(() => {
 //   fetchPodcasts(setPodcasts, setError, setLoading);
 // }, []);
  const {
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    sortOrder,
    setSortOrder,
    loading,
    error
  } = usePodcastContext();

  // Filtered podcast list from hook
  const filteredPodcasts = useFilteredPodcasts();
  console.log("Filtered Podcasts:", filteredPodcasts);

//console.log("Podcasts:", podcasts);
console.log("Genres:", genres);


   // Go back to page 1 whenever the search text changes
  useEffect(() => {
      setVisibleCount(12); // Reset visible count when search or filters change
      setCurrentPage(1);
  }, [searchTerm, selectedGenre, sortOrder]);

  //console.log("Selected Genre:", selectedGenre);
  //console.log("All Podcast Genres:", podcasts.map(p => p.genres));


  //const visiblePodcasts = useLoadMore
 // ? filteredPodcasts.slice(0, visibleCount)
  //: filteredPodcasts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
   // Work out which podcasts to show on the current page
  //const indexOfLastItem = currentPage * itemsPerPage;
  //const indexOfFirstItem = 0; //indexOfLastItem - itemsPerPage;
  //const visiblePodcasts = filteredPodcasts.slice(indexOfFirstItem, visibleCount);
  //const currentPodcasts = filteredPodcasts.slice(indexOfFirstItem, indexOfLastItem);
const indexOfFirstItem = 0; // always start from the beginning
const indexOfLastItem = useLoadMore
  ? visibleCount
  : currentPage * itemsPerPage;

const visiblePodcasts = filteredPodcasts.slice(indexOfFirstItem, indexOfLastItem);

   /**
   * Calculates the total number of pages based on filtered results.
   */
  const totalPages = Math.ceil(filteredPodcasts.length / itemsPerPage);

  /**
   * Handles clicking the pagination buttons.
   * @param {number} page - The page number to switch to
   */
  // Change to a different page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

return (
    <>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main>
        {loading && (
          <div className="message-container">
            <div className="spinner"></div>
            <p>Loading podcasts...</p>
          </div>
        )}

        {error && (
          <div className="message-container">
            <div className="error">
              Error occurred while trying to fetch podcasts: {error}
            </div>
          </div>
        )}

 {/* Render filtered & paginated podcasts */}
        {!loading && !error && (
          <>
          <FilterSection
          //genreOptions={genreTitles} // list of genres for dropdown
          genreOptions={genreOptions}
          sortOptions={['Recently Updated', 'Oldest First', 'A-Z', 'Z-A']} //sorting options
          selectedGenre={selectedGenre} // currently selected genre
          setSelectedGenre={setSelectedGenre} // function to update selected genre
          sortOrder={sortOrder} // current sort selection
          setSortOrder={setSortOrder} // function to change sort selection
          />

          <div className="toggle-mode-container">
  <button onClick={() => setUseLoadMore(!useLoadMore)}>
    {useLoadMore ? "Switch to Pagination" : "Use Load More"}
  </button>
</div>
           {/* Show podcasts based on filter/sort/pagination */}
            <PodcastGrid podcasts={visiblePodcasts} genres={genres} />

            {/* Load More button (only if using load more mode) */}
{useLoadMore && visibleCount < filteredPodcasts.length && (
  <div className="load-more-container">
    <button onClick={() => setVisibleCount(visibleCount + 12)}>Load More</button>
  </div>
)}

          {/* Pagination Controls*/}
          {!useLoadMore && (
            <div className="pagination">
              {/* Button to go to the previous page */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}//decrease page by 1
                 disabled={currentPage <= 1}
                //disabled={currentPage === 1}//disable if on last page
              >
                Prev
              </button>
              {/*Display the current page number and total number of pages*/}
              <span>Page {currentPage} of {totalPages}</span>

               {/* "Next" button - goes to the next page */}
               {/* When on the last page, this button is disabled so you can't go further */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                //disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            )}
          </>
          )}
        </main>
        </>
    )};
  



