import { useEffect, useState } from "react";
import PodcastGrid from "./components/PodcastGrid";
import { genres } from "./data";
import { fetchPodcasts } from "./api/fetchPodcasts";
import Header from "./components/Header";

/**
 * App - The root component of the Podcast Explorer application. It handles:
 * - Fetching podcast data from a remote API
 * - Managing loading and error states
 * - Rendering the podcast grid once data is successfully fetched
 * - Displaying a header and fallback UI during loading or error
 * @returns {JSX.Element} The rendered application interface
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// a state variable to track the user's search input.
// 'searchTerm' holds the current text typed in the search box.
// 'setSearchTerm' is the function used to update that text.
// Initially, searchTerm is an empty string ('').
  const [searchTerm, setSearchTerm] = useState('');

  // Current page number (for pagination)
  const [currentPage, setCurrentPage] = useState(1);

  // Number of podcasts to show per page
  const itemsPerPage = 12;


  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);
console.log("Podcasts:", podcasts);
console.log("Genres:", genres);

   // Go back to page 1 whenever the search text changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


// Filter podcasts based on search term (case-insensitive)
const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

   // Work out which podcasts to show on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPodcasts = filteredPodcasts.slice(indexOfFirstItem, indexOfLastItem);

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
            <PodcastGrid podcasts={currentPodcasts} genres={genres} />

          {/* Pagination Controls*/}
            <div className="pagination">
              {/* Button to go to the previous page */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}//decrease page by 1
                disabled={currentPage === 1}//disable if on last page
              >
                Prev
              </button>
              {/*Display the current page number and total number of pages*/}
              <span>Page {currentPage} of {totalPages}</span>

               {/* "Next" button - goes to the next page */}
               {/* When on the last page, this button is disabled so you can't go further */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
                </div>
              </>
            )}
          </main>
        </>
      )};



