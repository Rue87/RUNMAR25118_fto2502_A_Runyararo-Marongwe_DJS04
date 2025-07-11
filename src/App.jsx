import { useEffect, useState } from "react";
import PodcastGrid from "./components/PodcastGrid";
import { genres } from "./data";
import { fetchPodcasts } from "./api/fetchPodcasts";
import Header from "./components/Header";
import FilterSection from "./components/FilterSection";
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
  
  const [sortOrder, setSortOrder] = useState('Newest First');

  // Track the selected genre for filtering 
  const [selectedGenre, setSelectedGenre] = useState('');

  // Extract just the genre titles from the genres array
  const genreTitles = genres.map((g) => g.title);



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
const filteredPodcasts = podcasts
  .filter((podcast) =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
   //Then filter by the selected genre if one is chosen
   .filter((podcast) =>
    selectedGenre ? podcast.genres.includes(selectedGenre) : true
  )
  // Then, sort podcasts by date (newest/oldest) or title (A-Z / Z-A) based on user-selected sortOrder
  .sort((a, b) => {
    //If the user selects "Newest First", sort by date from newest to oldest
    if (sortOrder === 'Recently Updated') {
      return new Date(b.updated) - new Date(a.updated);//recent first
    } 
    //If the user selects "Oldest First", sort by date from oldest to newest
    else if (sortOrder === 'Oldest First') {
      return new Date(a.updated) - new Date(b.updated); //oldest first
    }
    //If the user selects "A-Z", sort podcast titles in ascending alphabetical order
    else if (sortOrder === 'A-Z') {
      return a.title.localeCompare(b.title);
    } 
    //If the user selects "Z-A", sort podcast titles in descending alphabetical order
    else if (sortOrder === 'Z-A') {
      return b.title.localeCompare(a.title);
    }
    return 0; // fallback: no sort
  });
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
          <FilterSection
          genreOptions={genreTitles} // list of genres for dropdown
          sortOptions={['Recently Updated', 'Oldest First', 'A-Z', 'Z-A']} //sorting options
          selectedGenre={selectedGenre} // currently selected genre
          setSelectedGenre={setSelectedGenre} // function to update selected genre
          sortOrder={sortOrder} // current sort selection
          setSortOrder={setSortOrder} // function to change sort selection
          />

           {/* Show podcasts based on filter/sort/pagination */}
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
      );
    }


