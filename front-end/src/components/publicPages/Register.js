import React, { useState } from "react";
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
//css
import Style from './Style.module.css';
//utils
import { getApiKey } from '../../utils/config';
import { alert } from '../../utils/alerts';
//components
const Register = () => {
	const [company, setCompany] = useState();

	function registerUser(e){
		e.preventDefault()

		if(company.password !== company.confirmPassword) return alert("warning", "Senhas diferentes");

		const headers = new Headers({
			"Content-Type": "application/json",
		});
		const requestOptions = {
			method: 'POST',
			headers: headers,
			mode: 'cors',
			body: JSON.stringify({
				company: company
			})
		};
		fetch(`${getApiKey()}/company/create`, requestOptions)
		.then( response => {
			response.json()
			.then( data => {
				if(!!data.id_company){
					alert("success", data.message);
				} else {
					alert("error", data.message);
				}
			})
		})
		.catch( response => {
			response.json()
			.then( data => {
				alert("error", data.message);
				console.log(data);
			})
		})
	}
	
 	return(
		<div className={Style.container}>
			<form className={Style.contaider_form} onSubmit={(e) => registerUser(e)} >
				<fieldset>
					<legend> Cadastro de Cliente </legend>
					<input type="text" required placeholder="Nome da empresa" onChange={(e) => setCompany( prevState => { return { ...prevState, name: e.target.value }})}/><br/>
					<InputMask type="text" required placeholder="CNPJ" onChange={(e) => setCompany( prevState => { return { ...prevState, cnpj: e.target.value }})} mask="99.999.999/9999-99" /><br/>
					<input type="text" required placeholder="Login" onChange={(e) => setCompany( prevState => { return { ...prevState, login: e.target.value }})}/><br/>
					<input type="password" required placeholder="Password" onChange={(e) => setCompany( prevState => { return { ...prevState, password: e.target.value }})}/><br/>
					<input type="password" required placeholder="Comfirm Password" onChange={(e) => setCompany( prevState => { return { ...prevState, confirmPassword: e.target.value }})}/><br/>
				</fieldset>
				<Link className={Style.register} to="/"> Voltar </Link>
				<button className={Style.enter} type="submit"> Cadastrar </button>
			</form>
		</div>
	)
}

export default Register;
