//React
import React from 'react';
import { Outlet , Navigate } from 'react-router-dom';
//Auth
import { isLogged } from '../utils/auth';
//Component
const PublicRoute = props =>
		isLogged()
		? <Navigate to="/private/home"/>
		: <Outlet  {...props}/>

export default PublicRoute;
