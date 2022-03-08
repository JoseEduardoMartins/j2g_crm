//React
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
//Utils
import { isLogged, removeToken } from '../utils/auth';
//Component
const PrivateRoute = () => {
	const navigate = useNavigate();

	if(!isLogged()) navigate('/')

	function logout(){
		removeToken()
		navigate("/")
	}

	return(
		<>
			<Outlet />
			<button type='button' onClick={()=> logout()}>sair</button>
		</>
	)
}

export default PrivateRoute;
