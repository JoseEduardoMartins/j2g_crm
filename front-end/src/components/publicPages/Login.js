import React from "react";
import { Link } from 'react-router-dom';
//css
import Style from './Style.module.css';
//component
const Login = () => {
	return(
		<div className={Style.container}>
        <form className={Style.contaider_form}>
            <fieldset>
                <legend>Fazer login</legend>
                <input type="email" required placeholder="Login" /> <br/>
                <input type="password" required placeholder="Senha" minLength={8} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="A senha deve conter 8 ou mais caracteres com pelo menos um número e uma letra maiúscula e minúscula"/> <br/>
                <div className={Style.forgot_password}> Esqueceu sua senha? </div>
            </fieldset>
            <Link className={Style.register} to="/register"> Cadastro </Link>
            <button className={Style.enter} type="submit"> Entrar </button>
        </form>
    </div>
	)
}

export default Login;
