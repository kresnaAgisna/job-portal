import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import { useAppDispatch } from './global/redux/store';
import { useEffect } from 'react';
import { setUserData } from './pages/Login/loginSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      dispatch(setUserData(JSON.parse(stored)));
    }
  }, [dispatch]);

  return <RouterProvider router={routes} />;
}

export default App;
