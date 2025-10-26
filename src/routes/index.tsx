import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import AfterAuthLayout from './layout/afterAuth';

const router = createBrowserRouter([
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
]);

export default router;
