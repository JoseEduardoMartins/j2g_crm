//React
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
//Utils
import { isLogged, getToken, removeToken } from '../utils/auth';
import { getApiKey } from '../utils/config';
//Component
const PrivateRoute = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState();

	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': getToken()
			}
		}
		fetch(`${getApiKey()}/company/getById`, requestOptions)
		.then( response => {
			response.json().then( data =>
				setUser(data)
			)
		})
  }, [])

	function logout(){
		removeToken()
		navigate("/")
	}

	if(!isLogged()) return <Navigate  to="/"/>

	return(
		<>
			<Outlet />
			<button type='button' onClick={()=> logout()}>sair</button>
		</>
	)
}

export default PrivateRoute;
