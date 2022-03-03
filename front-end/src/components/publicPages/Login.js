import React from "react";
import { Link } from 'react-router-dom';
//css
import './Login.css';
//component
const Login = () => {
	return(
		<div className="contaider">
        <center><img className="container_logo" src="https://audaces.com/wp-content/themes/Audaces-2018/img/logo.svg" alt="Logo"/></center>
        <form className="contaider_form">
            <fieldset>
                <legend>Fazer login</legend>
                <input v-model="email" type="email" name="login" required placeholder="E-mail" /> <br/>
                <input v-model="password" type="password" name="senha" required placeholder="Senha" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="A senha deve conter 8 ou mais caracteres com pelo menos um número e uma letra maiúscula e minúscula"/> <br/>
                <div className="forgot_password"> Esqueceu sua senha? </div>
            </fieldset>
            <Link to="/register" className="register">Cadastro</Link>
            <button className="enter" type="submit"> Entrar </button>
        </form>
    </div>
	)
}

export default Login;
