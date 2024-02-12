import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import StartView from './pages/StartView/StartView.tsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/mystart" element={<StartView type={0} />} />
      </Routes>
    </Router>
  );
}

export default App;
