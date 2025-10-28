import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import AfterAuthLayout from './layout/afterAuth';
import Register from '../pages/Register';
import BeforeAuthLayout from './layout/beforeAuth';
import Login from '../pages/Login';

const router = createBrowserRouter([
  {
    element: <BeforeAuthLayout />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    element: <AfterAuthLayout />,
    children: [
      {
        path: '/job-posting',
        element: <Home />,
        handle: { title: 'Job Postings' },
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/job-posting" replace />,
  },
]);

export default router;
