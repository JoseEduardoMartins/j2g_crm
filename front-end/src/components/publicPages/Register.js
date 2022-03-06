import React from "react";
import { Link } from 'react-router-dom';
//css
import styles from './Login.module.css';
//components
const Register = () => {
	return(
		<div className={styles.container}>
			<center><img className={styles.container_logo} src="https://audaces.com/wp-content/themes/Audaces-2018/img/logo.svg" alt="Logo"/></center>
			<form>
				<fieldset>
					<legend> Cadastro de Cliente </legend>
					<input type="text" required placeholder="Nome da empresa"/><br/>
					<input type="text" required placeholder="Cnpj"/><br/>
					<input type="text" required placeholder="Login"/><br/>
					<input type="password" required placeholder="Password"/><br/>
				</fieldset>
				<Link className="login_back" to="/"> Voltar para pagina de login </Link>
				<button type="submit"> Cadastrar </button>
			</form>
		</div>
	)
}

export default Register;
