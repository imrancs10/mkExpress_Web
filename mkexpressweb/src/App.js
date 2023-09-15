import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from './Components/Middleware/ErrorBoundary';
import Login from './Components/Login/Login';
import UrlNotFound from './Components/Middleware/UrlNotFound/UrlNotFound';
import Footer from './Components/Common/Footer/Footer';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Common/Header';
import ForgetPassword from './Components/Login/ForgetPassword';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  const [loginDetails, setLoginDetails] = useState({
    isAuthenticated: true
  });
  if (window.location.pathname === '/forgetpassword')
    return <ForgetPassword />
  if (!loginDetails.isAuthenticated)
    return <Login setLoginDetails={setLoginDetails}/>
  return (
    <>
      <Router>
        <Header loginDetails={loginDetails}/>
        <div id='root-container'>
          <ErrorBoundary>
            <Routes>
            <Route path='/' element={<Dashboard />} />
              <Route path='*' element={<UrlNotFound />} />
            </Routes>
          </ErrorBoundary>
          <ToastContainer></ToastContainer>
        </div>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
