import React from "react";
import { Link } from 'react-router-dom';
//css
import './Login.css';

const Register = () => {
	return(
		<div className="contaider">
			<center><img className="container_logo" src="https://audaces.com/wp-content/themes/Audaces-2018/img/logo.svg" alt="Logo"/></center>
			<form>
				<fieldset>
					<legend> Cadastro de Cliente </legend>
					<input type="text" />
				</fieldset>
				<Link to="/" className="login_back"> Voltar para pagina de login </Link>
				<button type="submit"> Cadastrar </button>
			</form>
		</div>
	)
}

export default Register;
