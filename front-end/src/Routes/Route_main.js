//react
import React from "react";
import { BrowserRouter, Routes , Route } from 'react-router-dom';
//components
import Login from '../components/publicPages/Login';
import Register from '../components/publicPages/Register';
//component
const Route_main = () => {
  return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={ <Login />} />
				<Route path='/register' element={ <Register />} />
			</Routes>
		</BrowserRouter>
  );
}

export default Route_main;
