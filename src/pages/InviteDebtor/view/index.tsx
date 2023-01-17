import Footer from 'components/Footer'
import Nav from 'components/Nav'
import IInviteDebtor from 'interfaces/IInviteDebtor'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAxios } from 'utils/useAxios'

export default () => {
	const { chargeId } = useParams()
	const navigate = useNavigate()
	const [invite, setInvite] = useState<IInviteDebtor>({} as IInviteDebtor)
	const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault()
		const { status } = await useAxios({
			url: '/charge/invite',
			data: { ...invite, charge_id: chargeId },
			method: 'POST'
		})
		if (status !== 200) {
			toast.error('Erro ao enviar convite')
		} else {
			toast.success('Email enviado com sucesso')
		}
	}
	return (
		<>
			<Nav />
			<div className='mt-auto d-flex justify-content-center'>
				<div className='container'>
					<div className='row mb-5'>
						<div className='col-md-12'>
							<button
								className='btn btn-light'
								onClick={() => {
									navigate(-1)
								}}
							>
								&lt; Voltar
							</button>
						</div>
					</div>
					<div className='row'>
						<h1 className='text-center'>Convidar Devedor</h1>
						<hr className='mb-4' />
					</div>
					<div className='row'>
						<div className='col-md-12'>
							<form className='row g-3' onSubmit={handleSubmit}>
								<div className='col-5'>
									<label htmlFor='inputEmail'>E-mail: </label>
									<input
										type='email'
										className='form-control'
										id='inputEmail'
										aria-describedby='emailHelp'
										value={invite.email || ''}
										onChange={evt => {
											setInvite({ ...invite, email: evt.target.value })
										}}
										required
									/>
									<div id='emailHelp' className='form-text'>
										Ex: email@email.com
									</div>
								</div>
								<div className='col-2 d-flex align-items-center justify-content-center text-center'>
									ou
								</div>
								<div className='col-5'>
									<label htmlFor='inputTelphone'>Telefone: </label>
									<input
										type='text'
										className='form-control'
										id='inputTelphone'
										aria-describedby='telphoneHelp'
										value={invite.telphone || ''}
										placeholder='Temporarily Disabled'
										onChange={evt => {
											setInvite({ ...invite, telphone: evt.target.value })
										}}
										disabled
									/>
									<div id='telphoneHelp' className='form-text'>
										Ex: 81999999999
									</div>
								</div>

								<div className='col-12'>
									<button type='submit' className='btn btn-primary mb-3 w-100'>
										Convidar
									</button>
								</div>
							</form>
						</div>
					</div>
					<div className='row d-flex justify-content-center'></div>
				</div>
			</div>
			<Footer />
		</>
	)
}
