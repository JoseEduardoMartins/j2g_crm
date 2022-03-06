import React from "react";
import { Link } from 'react-router-dom';
//css
import styles from './Login.module.css';
//component
const Login = () => {
	return(
		<div className={styles.container}>
        <center><img className={styles.container_logo} src="https://audaces.com/wp-content/themes/Audaces-2018/img/logo.svg" alt="Logo"/></center>
        <form className={styles.contaider_form}>
            <fieldset>
                <legend>Fazer login</legend>
                <input type="email" required placeholder="Login" /> <br/>
                <input type="password" required placeholder="Senha" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="A senha deve conter 8 ou mais caracteres com pelo menos um número e uma letra maiúscula e minúscula"/> <br/>
                <div className={styles.forgot_password}> Esqueceu sua senha? </div>
            </fieldset>
            <Link className={styles.register}to="/register"> Cadastro </Link>
            <button className={styles.enter} type="submit"> Entrar </button>
        </form>
    </div>
	)
}

export default Login;
