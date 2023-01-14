import Footer from 'components/Footer'
import Nav from 'components/Nav'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from 'utils/useAxios'
import ICharge from 'interfaces/ICharge'
import IInstalmment from 'interfaces/IInstallment'

export default () => {
	const { chargeId } = useParams()
	const [charge, setCharge] = useState<ICharge>()
	const [installments, setInstallments] = useState<IInstalmment[]>()
	const navigate = useNavigate()
	useEffect(() => {
		;(async () => {
			const reqCharges = useAxios({
				url: `charge/${chargeId}`
			})
			const reqInstallments = useAxios({
				url: `charge/installments/${chargeId}`
			})
			const [{ response: resCharges }, { response: resInstallments }] =
				await Promise.all([reqCharges, reqInstallments])
			setCharge(resCharges?.data)
			setInstallments(resInstallments?.data)
		})()
	}, [])

	return (
		<>
			<Nav />
			<div className='mt-auto d-flex justify-content-center'>
				<div className='container'>
					<div className='row mb-5'>
						<div className='col-md-12'>
							<button
								className='btn btn-light'
								onClick={() => {
									navigate(-1)
								}}
							>
								Voltar
							</button>
						</div>
					</div>
					<div className='row mb-5'>
						{!!charge && (
							<>
								<div className='col-md-3'>Titulo Da Cobrança: </div>
								<div className='col-md-9'>{charge.title}</div>
								<div className='col-md-3'>Descrição Da Cobrança: </div>
								<div className='col-md-9'>{charge.description}</div>
								<div className='col-md-3'>Valor Da Cobrança: </div>
								<div className='col-md-9'>{charge.total_value}</div>
							</>
						)}
					</div>
					<div className='row'>
						<div className='col-md-12 text-center mb-2'>
							<div className='table-responsive'>
								<table className='table table-dark table-hover table-sm caption-top'>
									<caption className=''>Lista de Parcelas</caption>
									<thead>
										<tr>
											<th scope='col'>Nª Parcela</th>
											<th scope='col'>Valor</th>
											<th scope='col'>Data De Vencimento</th>
										</tr>
									</thead>
									<tbody>
										{!!installments &&
											installments.map((installment, key: number) => (
												<tr key={key}>
													<td>{installment.installment_number}</td>
													<td>{installment.value}</td>
													<td>{installment.due_date}</td>
												</tr>
											))}
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
