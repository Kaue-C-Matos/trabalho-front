import './App.css';
import CharacterList from './pages/CharacterList';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CharacterDetail from './pages/CharacterDetail';

function App() {

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <CharacterList/>
    },
    {
      path: '/:selectedCharacter',
      element: <CharacterDetail/>
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={routes}/>
    </div>
  );
}

export default App;
