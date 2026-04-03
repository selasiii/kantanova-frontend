import { createBrowserRouter } from 'react-router-dom';
import { CustomerLayout } from './layouts/CustomerLayout';


const LandingPage = () => (
  <div className="p-20 min-h-[50vh] flex items-center justify-center">
    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-center">WELCOME TO<br/>THE ARCHIVE</h1>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerLayout />,
    children: [
      { index: true, element: <LandingPage /> },
    ],
  },
  {
    path: '/login',
    element: <div className="p-20"><h1 className="text-5xl font-black">LOGIN</h1></div>,
  }
]);
