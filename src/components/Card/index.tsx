import React from 'react'

export default ({
	cardHeader,
	cardTitle,
	cardText,
	cardFooter
}: {
	cardHeader: string
	cardTitle: string
	cardText: string
	cardFooter: JSX.Element
}) => {
	return (
		<div className='card'>
			<div className='card-header'>{cardHeader}</div>
			<div className='card-body'>
				<h5 className='card-title'>{cardTitle}</h5>
				<p className='card-text'>{cardText}</p>
			</div>
			<div className='card-footer text-muted'>{cardFooter}</div>
		</div>
	)
}
