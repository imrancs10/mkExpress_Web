import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from './Components/Middleware/ErrorBoundary';
import UrlNotFound from './Components/Middleware/UrlNotFound';
import Login from './Components/Login/Login';

function App() {
  return (
    <>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path='*' element={<UrlNotFound />} />
            <Route path='/login' element={<Login />} />
          </Routes>
         
        </ErrorBoundary>
      </Router>

    </>
  );
}

export default App;
