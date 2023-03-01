import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';
import App from './components/app/App';
import ErrorBoundary from './components/error/ErrorBoundary';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorBoundary />,
    },
]);

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);