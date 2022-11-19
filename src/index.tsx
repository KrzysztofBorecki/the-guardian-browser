import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './ErrorPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// https://reactrouter.com/en/main/routers/create-browser-router

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />
  }
]);

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
       <RouterProvider router={router} />
    </React.StrictMode>
  );
}