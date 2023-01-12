import React from 'react'

export default () => {
	return (
		<nav className='navbar navbar-expand-md navbar-dark bg-dark rounded'>
			<div className='container-fluid'>
				<a className='navbar-brand' href='#'>
					<img src='/assets/img/logo.png' alt='logo' width={64} />
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<a className='nav-link active' aria-current='page' href='/'>
								Home
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}
