import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../Config';

export class SignUp extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error:''
		};

		this.submitAction = this.submitAction.bind(this);
	}

	submitAction(e) {
		e.preventDefault();

		let email = document.getElementById('email').value;
		let pass = document.getElementById('password').value;
		let structure_name = document.getElementById('structure_name').value;

		let url = Config.API_URL+'/u/new';
		fetch(url, {
			method:'POST',
			body:JSON.stringify({email, pass, structure_name})
		})
		.then(r=>r.json())
		.then(json=>{
			if(json.error != '') {
				this.setState({error:json.error});
			} else {
				localStorage.setItem('jwt', json.jwt);
				this.props.history.push('/');
			}
		});
	}

	render() {
		return (
			<div class="d-flex flex-column align-items-center mt-4">
				<h2>B7CRUD 1.0</h2>
				<h6>Criado por Bonieky Lacerda</h6>

				<div class="login-area">
					<form onSubmit={this.submitAction}>
						<h4>Faça o Cadastro</h4>
						<hr/>

						{this.state.error != '' &&
							<div class="alert alert-danger" role="alert">
								{this.state.error}
							</div>
						}

						<div class="form-group">
							<label for="email">E-mail</label>
							<input required type="email" class="form-control" id="email" placeholder="Seu email" />
						</div>
						<div class="form-group">
							<label for="password">Senha</label>
							<input required type="password" class="form-control" id="password" placeholder="Sua senha" />
						</div>
						<div class="form-group">
							<label for="structure_name">Nome da estrutura</label>
							<input required type="text" class="form-control" id="structure_name" placeholder="(Apenas letras)" />
						</div>
						<div class="form-group">
							<button type="submit" class="btn btn-primary">Cadastrar</button>
						</div>
						<div class="form-group">
							<Link class="d-block" to="/login">Fazer o Login</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}

}