//react
import React from "react";
import { BrowserRouter, Routes , Route } from 'react-router-dom';
//routes
import PublicRoute from '../Routes/PublicRoute';
import PrivateRoute from '../Routes/PrivateRoute';
//components
import Home from '../components/privatePages/Home';
import Login from '../components/publicPages/Login';
import Register from '../components/publicPages/Register';
//component
const MainRoute = () => {
  return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={ <PublicRoute />}>
					<Route path='/' element={ <Login />} />
					<Route path='/register' element={ <Register />} />
				</Route>
				<Route path='/private' element={ <PrivateRoute />} >
					<Route path='/private/home' element={<Home/>} />
				</Route>
			</Routes>
		</BrowserRouter>
  );
}

export default MainRoute;
