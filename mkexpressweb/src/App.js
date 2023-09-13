import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from './Components/Middleware/ErrorBoundary';
import Login from './Components/Login/Login';
import UrlNotFound from './Components/Middleware/UrlNotFound/UrlNotFound';
import Footer from './Components/Common/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path='*' element={<UrlNotFound />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          <Footer></Footer>
        </ErrorBoundary>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
