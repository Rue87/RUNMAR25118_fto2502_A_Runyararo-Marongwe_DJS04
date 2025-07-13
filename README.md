# The Podcast Explorer! 

This is a dynamic web application built with React and Vite that allows users to browse, search, filter, and sort through a collection of podcasts. This project demonstrates modern frontend development practices, including component-based architecture, state management with React Context, and custom hooks.

## Technologies Used

- **React** (Vite)
- **JavaScript** (ES6+)
- **JSX**
- **CSS**
- Context API + Custom Hooks


## Features

*   **Dynamic Search**: Instantly search for podcasts by title.
*   **Genre Filtering**: Filter the podcast list by selecting a specific genre from a dropdown menu.
*   **Advanced Sorting**: Sort podcasts by 'Recently Updated', 'Oldest First', 'A-Z', or 'Z-A'.
*   **Dual Navigation Modes**: Seamlessly switch between a classic pagination system and an infinite-scroll-style   "Load More" button.
*   **Loading & Error States**: User-friendly indicators for data fetching status.
*   **Centralized State Management**: Uses React Context API to manage application state efficiently.

### Installation

1.  **Clone the repository**

    Open your terminal and run the following command to clone the project:
    ```bash
    git clone https://github.com/Rue87.git
    ```
   
2.  **Navigate to the project directory**
    ```bash
    cd RUNMAR25118_fto2502_A_Runyararo-Marongwe_DJS04

    ```

3.  **Install dependencies**

    Install the required project dependencies by running:
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

This will start the Vite development server. Open your web browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).


##  How it Works (JavaScript Functionality)

1. **Filtering and Sorting**  
   The logic for searching, filtering, and sorting is handled inside a custom hook:  
   `useFilteredPodcasts()`  
   - It filters podcasts by the user’s search term and selected genre.
   - Then it sorts them based on what the user selects in the dropdown.
   - Clicking “Load More” shows 12 more items.
   - In pagination, “Next” and “Prev” change the page.
   - Global state (like `searchTerm`, `sortOrder`) is stored in a central context file `PodcastContext.jsx`, so all components can access them.

##  How to Interact

1. Click the 🔍 icon to reveal the search box and type a podcast title.
2. Use the **Genre** dropdown to narrow results.
3. Change the **Sort** dropdown to reorder the list.
4. Click **Load More** at the bottom of the page or **Switch to Pagination** to control how results are displayed.

##  Project Structure

The project is organized to be modular and maintainable:

```
/
├── public/
├── src/
│   ├── api/          # Functions for fetching external data (e.g., fetchPodcasts.js)
│   ├── assets/       # Static assets like images and icons
│   ├── components/   # Reusable React components (Header, PodcastGrid, etc.)
│   ├── context/      # React Context providers (PodcastContext.jsx)
│   ├── hooks/        # Custom hooks (e.g., useFilteredPodcasts.js)
│   ├── utils/        # Utility functions (e.g., formatDate.js)
│   ├── App.jsx       # Main application component
│   ├── main.jsx      # Entry point of the React application
│   └── index.css     # Global styles
├── .gitignore
├── index.html
├── package.json
├── README.md         
└── vite.config.js
```
##  Challenges Faced

 - Understanding how to combine filtering and sorting together in the right order.
 - Managing pagination vs. load more logic without breaking layout.
 - Styling dropdowns and buttons consistently across devices.
 - Fixing an error where useState was not imported correctly.
 - Ensuring the context provider wraps the app properly.

 PS:This project is open for collaboration.My contacts are just below.

 ##  Contact

- **Name**: Runyararo Marongwe  
- **Email**: mrunya87@gmail.com  
- **GitHub**: [Rue87](https://github.com/Rue87)  
- **LinkedIn**: [Runyararo Marongwe](https://www.linkedin.com/in/runyararo-marongwe-24835279)

