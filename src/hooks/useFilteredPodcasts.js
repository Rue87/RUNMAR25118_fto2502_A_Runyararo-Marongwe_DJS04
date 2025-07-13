import { useMemo } from "react";
import { usePodcastContext } from "../context/PodcastContext";

/**
 * useFilteredPodcasts - A custom hook that returns the filtered and sorted podcast list.
 * It reads shared state values (search, genre, sort) from the PodcastContext.
 * useMemo is used to optimize performance by memoizing the filtered list.
 *
 * @returns {Array} Filtered and sorted list of podcasts
 */
export function useFilteredPodcasts() {
  // Get relevant state values from the PodcastContext
  const { podcasts, searchTerm, selectedGenre, sortOrder } = usePodcastContext();

  // useMemo ensures this heavy computation only runs when dependencies change
  const filtered = useMemo(() => {
    return podcasts
      // Filter by search term (case-insensitive match in podcast title)
      .filter(podcast =>
        podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
      )

      // Filter by selected genre (if any is selected)
      .filter(podcast =>
        selectedGenre ? podcast.genres.includes(Number(selectedGenre)) : true
      )

      // Sort based on the selected sort order
      .sort((a, b) => {
        if (sortOrder === "Recently Updated") {
          return new Date(b.updated) - new Date(a.updated); // Newest first
        }
        if (sortOrder === "Oldest First") {
          return new Date(a.updated) - new Date(b.updated); // Oldest first
        }
        if (sortOrder === "A-Z") {
          return a.title.localeCompare(b.title); // Alphabetical A → Z
        }
        if (sortOrder === "Z-A") {
          return b.title.localeCompare(a.title); // Alphabetical Z → A
        }
        return 0; // If no sortOrder matches, return as-is
      });
  }, [podcasts, searchTerm, selectedGenre, sortOrder]); // These values trigger recalculation when changed

  // Return the final filtered + sorted podcast list
  return filtered;
}