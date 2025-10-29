import { createBrowserRouter, Navigate } from 'react-router-dom';
import AfterAuthLayout from './layout/afterAuth';
import Register from '../pages/Register';
import BeforeAuthLayout from './layout/beforeAuth';
import Login from '../pages/Login';
import JobPosting from '../pages/JobPosting';

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
        element: <JobPosting />,
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
