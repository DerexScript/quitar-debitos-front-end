import React from 'react';

export default () => (
	<div className='container-fluid'>
		<div className='row placeholder-glow'>
			<div className='col-12 placeholder'>
				<div
					className='d-flex align-items-center justify-content-center '
					style={{ height: '100vh' }}
				>
					<div className='spinner-border text-light' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);
