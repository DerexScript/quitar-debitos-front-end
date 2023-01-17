import Footer from 'components/Footer'
import Nav from 'components/Nav'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default () => {
	const navigate = useNavigate()
	useEffect(() => {
		navigate('/charge')
	}, [])
	return (
		<>
			<Nav />
			<div className='container mt-auto'>
				<div className='row d-flex justify-content-center align-items-center'>
					<div className='col-md-6'>
						<h1 className='text-center'>Gerencie suas cobranças</h1>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
