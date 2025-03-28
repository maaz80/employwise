# Project Setup Guide

## How to Run the Project

Follow these steps to set up and run the project locally:

### Prerequisites
- Node.js (>=16.x)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/maaz80/employwise.git
   cd your-repo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Running the Project
To start the development server, run:
```bash
npm run dev
```
or
```bash
yarn start
```
This will launch the app in development mode on `http://localhost:3000`.

## Tools & Technologies Used
- **React.js** - Frontend framework
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - API requests
- **Reqres.in API** - Fake authentication API

## Folder Structure
```
root/
│── public/           # Static assets
│── src/
│   │── components/   # Reusable UI components
│   │── pages/        # Page components (Login, Users List, etc.)
│   │── redux/        # Redux slices and store configuration
│   │── images/       # Image used in the project
│   │── App.js        # Main app component
│   │── index.js      # Entry point
│── package.json      # Dependencies and scripts
│── README.md         # Project setup guide
```

## Notes
- Ensure your Node.js version is up to date.
- Modify API URLs if needed.
- Authentication is handled using `localStorage` for simplicity.

Depolyed Link :- https://empwise.netlify.app/

