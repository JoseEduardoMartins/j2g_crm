//React
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
//Utils
import { isLogged, getToken, removeToken } from '../utils/auth';
import { getApiKey } from '../utils/config';
import { alert } from '../utils/alerts';

//Component
const PrivateRoute = () => {
	const navigate = useNavigate();

	const [company, setCompany] = useState();

	useEffect(() => {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': getToken()
			}
		}
		fetch(`${getApiKey()}/company/getByToken`, requestOptions)
		.then( response => {
			console.log(response);
			response.json()
			.then( data =>
				setCompany(data.company)
			)
		})
		.catch(response => {
			response.json()
			.then( data =>{
				alert("error", data.message);
				setTimeout(() => navigate(`/`), 3000);
			})
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

	console.log(company);

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
