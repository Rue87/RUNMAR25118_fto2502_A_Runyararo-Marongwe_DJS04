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


  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);
console.log("Podcasts:", podcasts);
console.log("Genres:", genres);

// Filter podcasts based on search term (case-insensitive)
const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Error occurred while tyring fetching podcasts: {error}
            </div>
          </div>
        )}

        {!loading && !error && (
          <PodcastGrid podcasts={filteredPodcasts} genres={genres} />
        )}
      </main>
    </>
  );
}

