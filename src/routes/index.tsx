import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import AfterAuthLayout from './layout/afterAuth';
import Register from '../pages/Register';
import BeforeAuthLayout from './layout/beforeAuth';

const router = createBrowserRouter([
  {
    element: <BeforeAuthLayout />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    element: <AfterAuthLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        handle: { title: 'Job Postings' },
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
