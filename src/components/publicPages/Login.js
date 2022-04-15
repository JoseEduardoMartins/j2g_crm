import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
//css
import Style from './Style.module.css';
//utils
import { getApiKey } from '../../utils/config';
import { setToken } from '../../utils/auth';
import { alert } from '../../utils/alerts';
//component
const Login = () => {
	const navigate = useNavigate();
	const [login, setLogin] = useState();
	const [password, setPassword] = useState();

	function authenticate(e){
		e.preventDefault()
		const headers = new Headers({
			"Content-Type": "application/json",
		});
		const requestOptions = {
			method: 'POST',
			headers: headers,
			mode: 'cors',
			body: JSON.stringify({
				login,
				password
			})
		};
		fetch(`${getApiKey()}/company/login`, requestOptions)
		.then( response => {
			response.json()
			.then( data => {
				if(data.code === 10){
					alert("error", data.message)
				} else{
					setToken(data.token);
					alert("success", data.message);
					setTimeout(() => navigate(`/private/home`), 3000);
				}
			})
		})
		.catch( response => {
			response.json()
			.then( data => {
				alert("error", data.message)
			})
		})
	}

	return(
		<div className={Style.container}>
        <form className={Style.contaider_form} onSubmit={authenticate}>
            <fieldset>
                <legend>Fazer login</legend>
                <input type="text" required placeholder="Login" onChange={(e) => setLogin(e.target.value)}/> <br/>
                <input type="password" required placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/> <br/>
                <div className={Style.forgot_password}> Esqueceu sua senha? </div>
            </fieldset>
            <Link className={Style.register} to="/register"> Cadastro </Link>
            <button className={Style.enter} type="submit"> Entrar </button>
        </form>
    </div>
	)
}

export default Login;
