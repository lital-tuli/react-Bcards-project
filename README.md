# React Business Cards Project

This project is a business card management platform built with React and Vite. It allows users to create, edit, delete, and manage business cards. Users can also mark cards as favorites and view their profile information.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication (login, logout, register)
- Create, edit, delete business cards
- Mark cards as favorites
- View user profile and edit profile details
- Dark mode support
- Responsive design using Bootstrap

## Project Structure
```
.env
.gitignore
eslint.config.js
index.html
package.json
public/
README.md
src/
  App.css
  App.jsx
  assets/
  components/
    cards/
      BusinessCard.jsx
      CardPage.jsx
      CreateCard.jsx
      FavoriteCards.jsx
      MyCards.jsx
    common/
      FormField.jsx
      SearchBar.jsx
    layout/
      Footer.jsx
      Header.jsx
      Navbar.jsx
    modals/
      DeleteAccount.jsx
      DeleteCard.jsx
      EditCard.jsx
      Login.jsx
      Logout.jsx
      TypeChange.jsx
      UnlikeCard.jsx
    pages/
      About.jsx
      Home.jsx
      Register.jsx
      Sandbox.jsx
    users/
      EditUserDetails.jsx
      MyProfile.jsx
      UserCard.jsx
  hooks/
    useAuth.js
  index.css
  main.jsx
  providers/
    snackBarProvider.jsx
    ThemeProvider.jsx
  services/
    CardService.js
    schemaService.js
    UserService.js
  utils/
    axiosInstance.js
vite.config.js
```

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/react-bcards-project.git
   ```
2. Change to the project directory:
   ```sh
   cd react-bcards-project
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add the following environment variable:
   ```sh
   VITE_API_URL=<your_api_url>
   ```

## Usage
Start the development server:
```sh
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

## Scripts
- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run preview`: Preview the production build.

## Environment Variables
- `VITE_API_URL`: The base URL of the API.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

