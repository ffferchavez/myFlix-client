# Marvel-Flix

Marvel-Flix is a web application that allows users to browse and view information about movies in the Marvel Cinematic Universe. The application was built using React, React Router, and Bootstrap, and it consumes my own RESTful API to retrieve movie data.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Application](#running-the-application)
4. [File Structure](#file-structure)
5. [Code Explanation](#code-explanation)
   - [Main Components](#main-components)
   - [API Integration](#api-integration)
   - [State Management](#state-management)
   - [Routing and Navigation](#routing-and-navigation)
6. [Future Improvements](#future-improvements)
7. [Contributing](#contributing)
8. [License](#license)

## Features

- Browse a list of Marvel movies with detailed information about each movie, including its title, description, genre, director, and more.
- Search for movies by title.
- View detailed information about a specific movie, including a synopsis, director information, and genre details.
- User authentication and authorization, allowing users to log in, sign up, and manage their account information.
- Ability for users to mark movies as their favorites and view their favorite movies on their profile page.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for handling client-side routing in React applications.
- **React Bootstrap**: A popular UI library for building responsive and mobile-first websites with React.
- **Prop Types**: A library for type checking React components' props.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/marvel-flix.git
```

2. Change to the project directory:

```bash
cd marvel-flix
```

3. Install the dependencies:

```bash
npm install
```

### Running the Application

1. Start the development server:

```bash
npm start
```

2. Open your web browser and navigate to `http://localhost:1234`.

## File Structure

The project's file structure is as follows:

```
marvel-flix/
├── public/
├── src/
│   ├── components/
│   │   ├── movie-card/
│   │   ├── movie-view/
│   │   ├── navigation-bar/
│   │   ├── login-view/
│   │   ├── signup-view/
│   │   └── profile-view/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Code Explanation

### Main Components

The main components of the application are:

1. **`MainView`**: The main component that handles routing and rendering the appropriate views based on the user's navigation.
2. **`MovieCard`**: A reusable component that displays a single movie's information in a card format.
3. **`MovieView`**: A component that displays detailed information about a specific movie.
4. **`NavigationBar`**: A component that handles the application's navigation, including the search functionality.
5. **`LoginView`** and **`SignupView`**: Components that handle user authentication and authorization.
6. **`ProfileView`**: A component that displays the user's profile information and allows them to manage their favorite movies.

### API Integration

The application fetches movie data from a RESTful API using the `fetch` function. The API endpoint is `https://marvel-flix-c3644575f8db.herokuapp.com/movies`, and the application includes the necessary authorization headers to access the data.

### State Management

The application uses React's built-in state management system to handle the state of various components, such as the list of movies, the selected movie, the user's authentication status, and the user's favorite movies.

### Routing and Navigation

The application uses React Router to handle client-side routing. The main routes include `/movies`, `/movies/:movieId`, `/login`, `/signup`, and `/users/profile`.

## Future Improvements

- Implement user reviews and ratings for movies.
- Add the ability to sort and filter movies based on various criteria (e.g., release date, genre, director).
- Enhance the user profile page to allow users to update their personal information and manage their favorite movies more easily.
- Improve the overall design and user experience of the application.
- Implement a more robust error handling and feedback system for the API requests.

## Contributing

If you would like to contribute to the development of Marvel-Flix, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).
