
## Project Title & Overview

**Project Title:** Vue JS Machine Test - CountryPedia

**Overview:** This project is a simple Country Management System built with Vue.js and Express.js. It allows users to add, view, and manage countries, including uploading country flags. The application demonstrates efficient state management, form validation, error handling and dynamic UI updates.

## Table of Contents
- [Installation](#installation)
- [File Structure](#file-structure)
- [Features](#features)
- [Validations](#validations)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Improvements](#improvements)
- [Conclusion](#conclusion)

## Installation

**Prerequisites**
- Node.js (v14 or later)
- npm

### Clone the repository:
```sh
git clone https://github.com/adarsh272/Vue-JS-Assignment-.git
cd Vue-JS-Assignment
```
### Backend Setup

1. Navigate to the country-backend directory:
   ```
   cd country-backend
   ```
2. Create a .env file for environment variables (PORT 8080).
3. Install backend dependencies:
   ```
   npm install
   ```
4. Start the backend server:
   ```
   node server.js
   ```

The backend server should now be running on http://localhost:8080.

### Frontend Setup

1. Navigate to the country-frontend directory:
   ```
   cd country-frontend
   ```
2. Install frontend dependencies:
   ```
   npm install
   ```
4. Start the frontend server:
   ```
   npm run dev
   ```
The frontend app should now be running on http://localhost:{someport}.

With the frontend and backend servers running, you can access the application via the frontend URL at http://localhost:{someport}. The frontend will communicate with the backend server running on http://localhost:8080.

## File Structure
The project follows a clear separation of concerns, ensuring each part of the codebase has a specific responsibility. This ensures easy debugging and avoidance of tightly coupled components/logic:

Inside *country-frontend*:
- **src/**: Contains the frontend Vue.js components and store.
  - **components/**: Reusable Vue components.
  - **pages/**: Container/Parent page for layout management.
  - **store/**: Vuex store file for state management.
  - **api/**: Custom hooks for API calls.
  - **validation/**: Custom hooks for UI form validation.

Inside *country-backend*:
  - **server.js**: Contains the backend Express.js code.
  - **controllers/**: Handles business logic for each API route.
  - **routes/**: Defines the API routes.
  - **utils/**: Utility functions such as file handling.
  - **data/**: Contains the source JSON file.
  - **images/**: Contains all country flag images.

  ## Features
  - Select a country from a dropdown and get detailed information
  - Add new countries with validations for each field - both UI and API level.
  - Upload country flags with size and format checks.
  - Dynamic country list update without page refresh.

  ## Validations

  - **Name**: 
    - Must be a string between 3-20 characters
    - No special characters. 
    - Should be uniqque against countries in the JSON file
    
This is to ensure data consistency and prevent invalid inputs on both UI and API level.

- **Rank**: 
  - Only numeric values are accepted

- **Image**: 
  - Only `jpg` or `png` formats are allowed
  - Maximum size of 4 MB, to maintain performance and compatibility.

## Error Handling

- **Backend**: All API routes include error handling to catch and respond with meaningful messages. For example, if a country already exists, a 400 status with a descriptive message is returned.

- **Frontend**: Errors are captured and displayed in the form. The state management ensures that error messages are stored and can be managed smoothly.

## Deployment

The application is deployed on Vercel + Render.

## Improvements

**If I could enhance this application further:**

- Implement user authentication to secure the country management operations.
- Add a search filter
- Add additional modules like an admin dashboar and a user-facing web app like a Wikipedia for countries
- Add AI integration to know the history of each country
- Geocoding API to dive deep into the geographic landscape of each country
- Write robust test cases
- Set up Continuous integration with GitHub Actions to ensure that all tests pass before deployment.

## Demo

Check out the live demo [here](https://cf-2fo8oer9m-adarshs-projects-34f88032.vercel.app/).

## Conclusion

This project allowed me to apply best practices in state management, API integration, and form validation in Vue.js. I utilized my expertise in building seamless UI features. There are room for improvements in my code structure and logic management that could further enhance the robustness of the web app.

Thank you for allwowing my prove my expertise.









