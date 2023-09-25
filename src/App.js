import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from './Components/Middleware/ErrorBoundary';
import Login from './Components/Login/Login';
import UrlNotFound from './Components/Middleware/UrlNotFound/UrlNotFound';
import Footer from './Components/Common/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify'
import jwt_decode from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Common/Header/Header';
import ForgetPassword from './Components/Login/ForgetPassword';
import Dashboard from './Components/Dashboard/Dashboard';
import Customer from './Components/Customer/Customer';
import Member from './Components/Member/Member';
import Shipment from './Components/Shipments/Shipment';
import MasterData from './Components/Admin/Master/MasterData';
import MasterDataType from './Components/Admin/Master/MasterDataType';
import AdminLayout from './Components/Admin/AdminLayout';
import CustomerDetails from './Components/Admin/Customer/CustomerDetails';
import { common } from './Components/Utility/common';
import UserProfile from './Components/Login/UserProfile';
import UnauthorizedAccess from './Components/Middleware/UnauthorizedAccess';

function App() {
  const [loginDetails, setLoginDetails] = useState({
    isAuthenticated: false
  });
  useEffect(() => {
    var loginStorageData = window.localStorage.getItem(process.env.REACT_APP_ACCESS_STORAGE_KEY);
    try {
      var loginStorageJsonData = JSON.parse(loginStorageData);
      var tokenData = jwt_decode(loginStorageJsonData.accessToken);

      if (!common.checkTokenExpiry(tokenData?.exp)) {
        setLoginDetails({ isAuthenticated: false });
        toast.warn("Your login session expire. Please login again.");
      }

      if (loginStorageJsonData?.isAuthenticated === undefined || loginStorageJsonData?.isAuthenticated === false)
        setLoginDetails({ isAuthenticated: false });
      else {
        setLoginDetails({ ...loginStorageJsonData });
      }

    } catch (error) {
      setLoginDetails({ isAuthenticated: false })
    }
  }, []);

  if (window.location.pathname === '/forgetpassword')
    return <ForgetPassword />
  if (!loginDetails.isAuthenticated)
    return <Login setLoginDetails={setLoginDetails} />

  return (
    <>
      <Router>
        <Header loginDetails={loginDetails} setLoginDetails={setLoginDetails} />
        <div id='root-container'>
          <ErrorBoundary>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/customer' element={<Customer />} />
              <Route path='/members' element={<Member />} />
              <Route path='/shipments' element={<Shipment />} />
              <Route path='/user-profile' element={<UserProfile loginDetails={loginDetails}/>} />
              <Route path='/admin' element={<AdminLayout loginDetails={loginDetails} />}>
                <Route path='/admin/master/data' element={<MasterData />} />
                <Route path='/admin/master/type' element={<MasterDataType />} />
                <Route path='/admin/customer' element={<CustomerDetails />} />
              </Route>
              <Route path='*' element={<UrlNotFound />} />
              <Route path='/unauthorized' element={<UnauthorizedAccess/>}/>
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
