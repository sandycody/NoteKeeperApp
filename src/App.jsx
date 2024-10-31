import { createBrowserRouter, NavLink, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Note from './components/Note';
import ViewNote from './components/ViewNote';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element:
        <div className='w-full h-full flex flex-col'>
          <Navbar />
          <Home />
        </div>
    },
    {
      path: '/notes',
      element:
        <div className='w-full h-full flex flex-col'>
          <Navbar />
          <Note />
        </div>
    },
    {
      path: '/notes/:id',
      element:
        <div className='w-full h-full flex flex-col'>
          <Navbar />
          <ViewNote />
        </div>
    }
  ]
);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
