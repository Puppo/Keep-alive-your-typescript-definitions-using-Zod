import React, { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

const OrderList = lazy(() => import("./pages/OrderList"));
const Order = lazy(() => import("./pages/Order"));

const router = createBrowserRouter([{
  path: '/orders/:id',
  element: <React.Suspense><Order /></React.Suspense>
}, {
  path: '/orders',
  element: <React.Suspense><OrderList /></React.Suspense>
}, {
  path: '/',
  element: <React.Suspense><Home /></React.Suspense>
}, {
  path: '**',
  element: <React.Suspense><Home /></React.Suspense>
}], {
  basename: import.meta.env.BASE_URL
})

function App() {
  return <RouterProvider router={router} />;
}

export default App
