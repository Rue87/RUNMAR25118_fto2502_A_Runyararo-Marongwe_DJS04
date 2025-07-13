Welcome to the Podcast Explorer! This is a dynamic and responsive web application built with React and Vite that allows users to browse, search, filter, and sort through a collection of podcasts. This project demonstrates modern frontend development practices, including component-based architecture, state management with React Context, and custom hooks.

## ✨ Features

*   **Dynamic Search**: Instantly search for podcasts by title.
*   **Genre Filtering**: Filter the podcast list by selecting a specific genre from a dropdown menu.
*   **Advanced Sorting**: Sort podcasts by 'Recently Updated', 'Oldest First', 'A-Z', or 'Z-A'.
*   **Dual Navigation Modes**: Seamlessly switch between a classic pagination system and an infinite-scroll-style "Load More" button.
*   **Responsive Design**: A clean and modern UI that looks great on all screen sizes.
*   **Loading & Error States**: User-friendly indicators for data fetching status.
*   **Centralized State Management**: Uses React Context API to manage application state efficiently.



## 📸 Screenshot

!Podcast Explorer Screenshot 
<!-- It's a good practice to add a screenshot of your application. Create a screenshot, name it `screenshot.png`, and place it in your project's `public` folder. -->

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

*   Node.js (v18.x or newer is recommended)
*   npm (comes with Node.js)

### Installation

1.  **Clone the repository**

    Open your terminal and run the following command to clone the project:
    ```bash
    git clone https://github.com/Rue87.git
    ```
   

2.  **Navigate to the project directory**
    ```bash
    cd your-repository-name
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

## 🎮 How to Interact

Once the application is running, you can explore its features:

*   **Searching**: Click the search icon (🔍) in the header. A search bar will appear. Type in your query to see the podcast list filter in real-time.
*   **Filtering by Genre**: Use the "All Genres" dropdown menu to select a specific genre. The grid will update to show only podcasts from that genre.
*   **Sorting**: Use the second dropdown (defaulting to 'Recently Updated') to change the sort order of the displayed podcasts.
*   **Changing Navigation Style**: Click the "Switch to Pagination" or "Use Load More" button to toggle between the two navigation modes.
    *   **Pagination Mode**: Use the "Prev" and "Next" buttons to navigate through pages of results.
    *   **Load More Mode**: Scroll to the bottom and click the "Load More" button to append more podcasts to the list.

## 🛠️ Technologies Used

*   **React**: A JavaScript library for building user interfaces.
*   **Vite**: A next-generation frontend tooling that provides a faster and leaner development experience.
*   **React Context API**: For global state management (search terms, filters, etc.).
*   **JavaScript (ES6+)**: The programming language used.
*   **HTML5 & CSS3**: For structure and styling.

## 📂 Project Structure

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
├── README.md         # You are here!
└── vite.config.js
```

## 👤 Author

**Runyararo Marongwe**
*   GitHub: https://github.com/rue87 <!-- Add your GitHub profile -->
*   LinkedIn: https://www.linkedin.com/in/runyararo-marongwe-24835279 <!-- Add your LinkedIn profile -->
