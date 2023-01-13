import Footer from 'components/Footer'
import Nav from 'components/Nav'
import React from 'react'

export default () => {
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
