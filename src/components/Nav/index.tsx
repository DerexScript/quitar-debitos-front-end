import React from 'react'
import { NavLink } from 'react-router-dom'
import routes from 'routes/routes'

export default () => {
	return (
		<header>
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
							{routes
								.filter(route => !!route.visible && false)
								.map((page, index) => (
									<li className='nav-item' key={index}>
										<NavLink className='nav-link' to={page.path}>
											{page.displayName}
										</NavLink>
									</li>
								))}
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}
