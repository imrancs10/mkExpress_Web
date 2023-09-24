import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from './Components/Middleware/ErrorBoundary';
import Login from './Components/Login/Login';
import UrlNotFound from './Components/Middleware/UrlNotFound/UrlNotFound';
import Footer from './Components/Common/Footer/Footer';
import { ToastContainer } from 'react-toastify'
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

function App() {
  const [loginDetails, setLoginDetails] = useState({
    isAuthenticated: true
  });
  if (window.location.pathname === '/forgetpassword')
    return <ForgetPassword />
  if (!loginDetails.isAuthenticated)
    return <Login setLoginDetails={setLoginDetails} />
  return (
    <>
      <Router>
        <Header loginDetails={loginDetails} />
        <div id='root-container'>
          <ErrorBoundary>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/customer' element={<Customer />} />
              <Route path='/members' element={<Member />} />
              <Route path='/shipments' element={<Shipment />} />
              <Route path='/admin' element={<AdminLayout />}>
                <Route path='/admin/master/data' element={<MasterData />} />
                <Route path='/admin/master/type' element={<MasterDataType />} />
                <Route path='/admin/customer' element={<CustomerDetails />} />
              </Route>
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
