import Footer from 'components/Footer'
import Nav from 'components/Nav'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAxios } from 'utils/useAxios'
import ICharge from 'interfaces/ICharge'

export default () => {
	const { chargeId } = useParams()
	const [charge, setCharge] = useState<ICharge>()
	useEffect(() => {
		;(async () => {
			const { response } = await useAxios({ url: `charge/${chargeId}` })
			setCharge(response?.data)
		})()
	}, [])
	return (
		<>
			<Nav />
			<div className='mt-auto d-flex justify-content-center'>
				<div className='container'>
					<div className='row'>
						{!!charge && (
							<>
								<span>{charge.id}</span>
								<span>{charge.title}</span>
								<span>{charge.description}</span>
								<span>{charge.created_at}</span>
								<span>{charge.installments}</span>
								<span>{charge.total_value}</span>
							</>
						)}
					</div>
					<div className='row'>
						<div className='col-md-12 text-center mb-2'>
							<div className='table-responsive'>
								<table className='table table-dark table-hover table-sm border-light caption-top rounded'>
									<caption className=''>Lista de Parcelas</caption>
									<thead>
										<tr className='rounded'>
											<th className='rounded' scope='col'>
												#
											</th>
											<th className='rounded' scope='col'>
												First
											</th>
											<th className='rounded' scope='col'>
												Last
											</th>
											<th className='rounded' scope='col'>
												Handle
											</th>
										</tr>
									</thead>
									<tbody className='rounded'>
										<tr className='rounded'>
											<th className='rounded' scope='row'>
												1
											</th>
											<td className='rounded'>Mark</td>
											<td className='rounded'>Otto</td>
											<td className='rounded'>@mdo</td>
										</tr>
										<tr className='rounded'>
											<th className='rounded' scope='row'>
												2
											</th>
											<td className='rounded'>Jacob</td>
											<td className='rounded'>Thornton</td>
											<td className='rounded'>@fat</td>
										</tr>
										<tr className='rounded'>
											<th className='rounded' scope='row'>
												3
											</th>
											<td className='rounded'>Larry the Bird</td>
											<td className='rounded'>@twitter</td>
											<td className='rounded'>@twitter</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}
