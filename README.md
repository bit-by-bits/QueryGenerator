# Query Generator

## Overview

The Query Generator is a web application designed for fetching medical diagnosis test data from a central data lake based on user-defined criteria. It provides an easy-to-use interface to generate queries for extracting relevant patient data, helping healthcare professionals make data-driven decisions. This project is built with modern web technologies and offers interactive features, including customizable themes, authentication, and advanced filtering options.

## Features

1. **Authentication System**

   - Secure login and signup functionality with support for Google OAuth.
   - Password recovery interface for seamless account management.

2. **Query Generation**

   - Customizable filters for generating queries based on specific criteria (e.g., patient age, gender, test type).
   - Ability to export data in multiple formats (e.g., CSV, Excel).

3. **User-Friendly Interface**

   - Responsive and intuitive UI for managing queries and visualizing data.
   - Interactive charts and visualizations to represent medical test data.

4. **Theme Customization**

   - Light, dark, and system-based modes for accessibility and user preference.

5. **Error Handling and Unavailability Pages**

   - Clear error and unavailable pages to improve the user experience when encountering issues.

6. **Routing and Navigation**
   - Seamless navigation using React Router DOM, with clear route management for both authentication and app-related pages.

## Tech Stack

### Frontend:

- **React**: Component-based architecture for creating reusable UI components.
- **TailwindCSS**: Utility-first CSS framework for styling the app with minimal effort.
- **Radix UI**: Provides accessible and reusable UI components.
- **Recharts**: Used for rendering interactive and customizable charts and graphs.

### State Management:

- **React Context API**: Global state management for themes, authentication, and filters.
- **React Router DOM**: For client-side routing to enable multi-page navigation within the app.

### Development Tools:

- **Vite**: A fast build tool for optimized development and production builds.
- **TypeScript**: Ensures type safety across the app for better maintainability and debugging.
- **ESLint and Prettier**: For code linting and formatting to maintain consistent coding styles.

## File Structure

```
src/
├── assets/             # Static assets like images
├── components/         # Reusable UI components
├── context/            # Context providers for state management
├── layouts/            # Layout components for different pages
├── pages/              # Page components for each route
├── routes/             # Routes for navigation
├── services/           # API services for data fetching
├── styles/             # Global styles and tailwind configuration
└── utils/              # Utility functions
```

## Setup and Installation

1. **Clone the repository**:

   ```
   git clone https://github.com/bit-by-bits/QueryGenerator
   ```

2. **Install dependencies**:

   ```
   npm install
   ```

3. **Run the development server**:

   ```
   npm run dev
   ```

4. **Build for production**:

   ```
   npm run build
   ```

5. **Preview the build**:
   ```
   npm run preview
   ```

## Available Scripts

- **dev**: Starts the development server using Vite.
- **build**: Builds the application for production (compiling TypeScript and bundling assets).
- **lint**: Lints the codebase with ESLint.
- **format**: Formats the code using Prettier.
- **preview**: Previews the production build locally.

## Routing

- **Authentication Routes**:

  - `/auth/login`: Login page.
  - `/auth/signup`: Signup page.
  - `/auth/forgot-password`: Forgot password page.
  - `/auth/google`: Google OAuth login page.

- **App Routes**:

  - `/app/filters`: Page to apply filters for querying data.
  - `/app/queries`: Page to view and generate queries.
  - `/app/illustrations`: Page for visualizing data in graphical formats.
  - `/app/settings`: Page for user settings and preferences.

- **API Route**:
  - `/api/inspect`: Inspect data from the API for generating queries.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write tests and documentation if applicable.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
