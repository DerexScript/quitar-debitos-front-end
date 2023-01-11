import Footer from 'components/Footer';
import Nav from 'components/Nav';
import React, { useState } from 'react';
import ICharge from 'interfaces/ICharge';
import { useAxios } from 'utils/useAxios';

export default () => {
	const [charge, setCharge] = useState<ICharge>({} as ICharge);
	const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		const { response } = await useAxios({
			url: 'charge/store',
			method: 'POST',
			data: charge
		});
		if (response) {
			console.log(response);
		}
		evt.preventDefault();
	};
	return (
		<>
			<Nav />
			<div className='mt-auto d-flex justify-content-center'>
				<div className='container'>
					<div className='row'>
						<h1 className='text-center'>Adicionar nova cobrança</h1>
						<hr className='mb-4' />
					</div>
					<div className='row'>
						<div className='col-md-12'>
							<form className='row g-3' onSubmit={evt => handleSubmit(evt)}>
								<div className='col-6'>
									<label htmlFor='inputTitle'>Titulo: </label>
									<input
										type='text'
										className='form-control'
										id='inputTitle'
										value={charge.title || ''}
										onChange={evt => {
											setCharge({ ...charge, title: evt.target.value });
										}}
										required
									/>
								</div>
								<div className='col-6'>
									<label htmlFor='inputDescription'>Descrição: </label>
									<input
										type='text'
										className='form-control'
										id='inputDescription'
										value={charge.description || ''}
										onChange={evt => {
											setCharge({ ...charge, description: evt.target.value });
										}}
										required
									/>
								</div>
								<div className='col-6'>
									<label htmlFor='inputTotalValue'>Valor Total: </label>
									<input
										type='text'
										className='form-control'
										id='inputTotalValue'
										value={charge.total_value || ''}
										onChange={evt => {
											setCharge({
												...charge,
												total_value: parseFloat(evt.target.value)
											});
										}}
										required
									/>
								</div>
								<div className='col-6'>
									<label htmlFor='inputInstallments'>Parcelas: </label>
									<input
										type='text'
										className='form-control'
										id='inputInstallments'
										value={charge.installments || ''}
										onChange={evt => {
											setCharge({
												...charge,
												installments: evt.target.value
											});
										}}
										required
									/>
								</div>
								<div className='col-12'>
									<button type='submit' className='btn btn-primary mb-3 w-100'>
										Registrar
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
	);
};
