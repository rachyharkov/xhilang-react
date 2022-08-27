import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom';

import PageLogin from './Pages/PageLogin';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<PageLogin />} />
    </Routes>
  );
}

export default App;
