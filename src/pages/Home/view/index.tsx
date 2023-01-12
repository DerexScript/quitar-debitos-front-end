import React, { useEffect, useState } from 'react'
import Nav from 'components/Nav/'
import Footer from 'components/Footer/'
import Card from 'components/Card/'
import { useAxios } from 'utils/useAxios'
import { useNavigate } from 'react-router-dom'
import ICharge from 'interfaces/ICharge'

export default () => {
	const navigate = useNavigate()
	const [charges, setCharges] = useState<ICharge[]>([] as ICharge[])
	useEffect(() => {
		;(async () => {
			const { response } = await useAxios({ url: 'charge' })
			setCharges(response?.data)
		})()
	}, [])
	const handleRegisterCharge = (
		evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		evt.preventDefault()
		return navigate('/charge/create')
	}
	return (
		<>
			<Nav />
			<div className='mt-auto d-flex justify-content-center'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12 text-center mb-2'>
							<span className='text-black fw-bold h1'>Cobranças</span>{' '}
							<button
								className='btn btn-outline-primary'
								onClick={evt => handleRegisterCharge(evt)}
							>
								Adicionar +
							</button>
						</div>
					</div>
					<div className='row d-flex justify-content-center'>
						{charges.length &&
							charges.map(charge => (
								<div key={charge.id} className='col-md-4 col-lg-4'>
									<Card
										{...{
											cardHeader: 'Cobrança',
											cardTitle: charge.title,
											cardText: charge.description,
											cardFooter: 'cardFooter'
										}}
									/>
								</div>
							))}
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
