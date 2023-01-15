import React, { useEffect, useState } from 'react'
import Nav from 'components/Nav/'
import Footer from 'components/Footer/'
import Card from 'components/Card/'
import { useAxios } from 'utils/useAxios'
import { Link, useNavigate } from 'react-router-dom'
import ICharge from 'interfaces/ICharge'

export default () => {
	const navigate = useNavigate()
	const [charges, setCharges] = useState<ICharge[]>()
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
						<div className='col-md-6 text-center d-flex justify-content-center'>
							<span className='text-black fw-bold h1  text-center'>
								Cobranças
							</span>
						</div>
						<div className='col-md-6 d-flex justify-content-center'>
							<button
								className='btn btn-outline-primary btn-sm '
								onClick={evt => handleRegisterCharge(evt)}
							>
								Adicionar +
							</button>
						</div>
					</div>
					<hr />
					<div className='row d-flex justify-content-center'>
						{!!charges &&
							charges.map(charge => (
								<div key={charge.id} className='col-md-4 col-lg-4'>
									<Card
										{...{
											cardHeader: 'Cobrança',
											cardTitle: charge.title,
											cardText: charge.description,
											cardFooter: (
												<>
													<Link to={'/charge/' + charge.id.toString()}>
														Gerenciar
													</Link>
												</>
											)
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
