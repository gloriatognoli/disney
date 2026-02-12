# Disney Web Application

A modern, responsive Single Page Application for exploring the magical world of Disney characters. Built with React and powered by the Disney API, this project showcases over 500 beloved characters from the Disney universe.

## Overview
This project is a comprehensive web application that allows users to browse, search, and discover detailed information about their favorite Disney characters. The application features a clean, intuitive interface with multiple viewing options and smooth navigation.

## Features

- **Character Browser**: Explore up to 9820 Disney characters
- **Advanced Search**: Real-time search functionality with API integration and debouncing
- **Dual View Modes**: Toggle between grid and list views for personalized browsing
- **Character Details**: Comprehensive information including films, TV shows, video games, and more
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Navigation System**: Previous/Next navigation for easy character browsing
- **Fallback Images**: Handling of missing character images
- **Loading States**: Smooth loading indicators with custom Mickey Mouse spinner
- **Error Handling**: User-friendly error pages with helpful navigation options

## Technologies Used

### Frontend
- **React 19.2.0** - UI library
- **Vite & Node.js** - Build Tool & Dev Server
- **React Router DOM** - Client-side routing
- **Reactstrap** - Bootstrap components for React
- **Bootstrap 5** - CSS framework
- **CSS Modules** - Scoped and modular styling

### Architecture
- **MVVM Pattern** - Model-View-ViewModel architectural pattern
    - **Models**: Data layer and API services
    - **ViewModels**: Business logic and state management (custom hooks)
    - **Views**: UI components and presentation

### API
- **Disney API** (https://disneyapi.dev) - Restful API for Disney character data

## INSTALLATION
- **1.** Download the project
- **2.** Open the terminal from the project's root
- **3.** npm install
- **4.** npm run dev