import React, { FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../context/AuthContext'
// import { useAxios } from '../../../utils/useAxios'

type TUser = {
	credential: string
	password: string
}

export default () => {
	const [user, setUser] = useState<TUser>({ credential: '', password: '' })
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault()
		const logged = await auth.authenticate(user.credential, user.password)
		if (logged) {
			navigate('/')
		} else {
			toast.error('Login ou senha invalidos', {
				position: toast.POSITION.TOP_CENTER
			})
		}
	}

	return (
		<div className='container-fluid' style={{ backgroundColor: '#e9ecef' }}>
			<div className='row'>
				<div className='col-12'>
					<div
						className='d-flex align-items-center justify-content-center'
						style={{ height: '100vh' }}
					>
						<div className='col-6'>
							<form onSubmit={handleSubmit}>
								<div className='mb-3'>
									<label htmlFor='credentialInput' className='form-label'>
										Credencial
									</label>
									<input
										type='text'
										className='form-control'
										id='credentialInput'
										aria-describedby='credentialHelp'
										onChange={evt =>
											setUser({
												...user,
												credential: evt.target.value
											})
										}
										value={user.credential}
									/>
									<div id='credentialHelp' className='form-text'>
										Entre com seu e-mail ou nome de usuario.
									</div>
								</div>

								<div className='mb-3'>
									<label htmlFor='passwordInput' className='form-label'>
										Senha
									</label>

									<input
										type='password'
										className='form-control'
										id='passwordInput'
										onChange={evt =>
											setUser({
												...user,

												password: evt.target.value
											})
										}
										value={user.password}
									/>
								</div>

								<button
									type='submit'
									className='btn btn-outline-primary mx-auto d-block w-100'
								>
									Entrar
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
