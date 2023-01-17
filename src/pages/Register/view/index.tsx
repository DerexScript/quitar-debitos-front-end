import IUser from 'interfaces/IUser'
import React, { useState, FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAxios } from 'utils/useAxios'

export default () => {
	const { invitation_code } = useParams()
	const [user, setUser] = useState<IUser>({} as IUser)
	const navigate = useNavigate()

	const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault()
		if (user.password === user.confirm_password) {
			const { status } = await useAxios({
				url: invitation_code ? `register/${invitation_code}` : 'register',
				method: 'POST',
				data: user
			})
			if (status === 201) {
				toast.success('Registro Realizado Com Sucesso')
				navigate('/login')
			} else {
				toast.error('Falha ao registrar usuario')
			}
		} else {
			toast.warning('Senha não confere')
		}
	}

	return (
		<>
			<div className='container mt-auto mb-auto'>
				<div className='row'>
					<form className='row' onSubmit={handleSubmit}>
						<div className='col-6 mb-2'>
							<label htmlFor='inputName' className='form-label'>
								Nome
							</label>
							<input
								type='text'
								className='form-control'
								id='inputName'
								value={user?.name || ''}
								onChange={evt => setUser({ ...user, name: evt.target.value })}
								required
							/>
						</div>
						<div className='col-6 mb-2'>
							<label htmlFor='inputUser' className='form-label'>
								Usuario
							</label>
							<input
								type='text'
								className='form-control'
								id='inputUser'
								value={user?.user || ''}
								onChange={evt => setUser({ ...user, user: evt.target.value })}
								required
							/>
						</div>
						<div className='col-12 mb-2'>
							<label htmlFor='inputEmail' className='form-label'>
								Email
							</label>
							<input
								type='email'
								className='form-control'
								id='inputEmail'
								aria-describedby='emailHelp'
								value={user?.email || ''}
								onChange={evt => setUser({ ...user, email: evt.target.value })}
								required
							/>
							<div id='emailHelp' className='form-text'>
								Nunca compartilharemos seu e-mail com mais ninguém.
							</div>
						</div>
						<div className='col-6'>
							<label htmlFor='inputPassword' className='form-label'>
								Senha
							</label>
							<input
								type='password'
								className='form-control'
								id='inputPassword'
								value={user?.password || ''}
								onChange={evt =>
									setUser({ ...user, password: evt.target.value })
								}
								required
							/>
						</div>
						<div className='col-6'>
							<label htmlFor='inputConfirmPassword' className='form-label'>
								Confirmar Senha
							</label>
							<input
								type='password'
								className='form-control'
								id='inputConfirmPassword'
								value={user?.confirm_password || ''}
								onChange={evt =>
									setUser({ ...user, confirm_password: evt.target.value })
								}
								required
							/>
						</div>
						<button type='submit' className='btn btn-primary mt-3'>
							Registrar
						</button>
					</form>
				</div>
			</div>
		</>
	)
}
