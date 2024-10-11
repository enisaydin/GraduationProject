import React from "react";
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Main from "../pages/Main"
import Register from "../pages/Register";
import Login from "../pages/Login"
import Navbar from "../components/Navbar";
import PrivateRouter from "./PrivateRouter";
import DragAndDrop from "../pages/DragAndDrop";
import Footer from "../components/footer";

const AppRouter = () => {
  return <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Main/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    
    <Route path="/dragdrop" element= { <PrivateRouter/> }>
    <Route path="" element={<DragAndDrop/>}/>
    
    
    </Route>
  </Routes>
  <Footer/>
  
  
  </BrowserRouter>;
};

export default AppRouter;
