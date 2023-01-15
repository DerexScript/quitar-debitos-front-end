import Footer from 'components/Footer'
import Nav from 'components/Nav'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from 'utils/useAxios'
import ICharge from 'interfaces/ICharge'
import { toast } from 'react-toastify'
import Loading from 'components/Loading'

export default () => {
	const { chargeId } = useParams()
	const [charge, setCharge] = useState<ICharge>()
	const [loading, setLoading] = useState<boolean>(true)
	const navigate = useNavigate()
	useEffect(() => {
		;(async () => {
			const { response: resCharges } = await useAxios({
				url: `charge/${chargeId}`
			})
			setCharge(resCharges?.data)
			setLoading(false)
		})()
	}, [])

	const debtor = charge?.users.find(user => user.id !== charge.pivot.user_id)

	const handleSendVoucher = async (
		files: FileList | null,
		installmentID: number
	) => {
		setLoading(true)
		if (files?.length && /image/.test(files[0].type)) {
			const formData = new FormData()
			formData.append('voucher', files[0], files[0].name)
			formData.append('_method', 'PUT')
			const { response, status } = await useAxios({
				url: `installment/${installmentID}`,
				method: 'POST',
				data: formData
			})
			if (status === 200 && response?.data) {
				setCharge(oldCharge => {
					if (!oldCharge?.installments) {
						return oldCharge
					}
					oldCharge.installments = oldCharge.installments.map(installment => {
						if (installment.id === installmentID) {
							const { voucher } = response.data
							installment.voucher = voucher.toString()
						}
						return installment
					})
					return oldCharge
				})
				toast.success('Comprovante enviado com sucesso')
			} else {
				toast.error('falha ao enviar comprovante')
			}
		}
		setLoading(false)
	}

	return (
		<>
			<Nav />
			{!loading ? (
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
									&lt; Voltar
								</button>
							</div>
						</div>
						<div className='row mb-5'>
							{!!charge && (
								<>
									<div className='col-md-3'>Titulo Da Cobrança: </div>
									<div className='col-md-9 text-muted fst-italic text-capitalize'>
										{charge.title}
									</div>
									<div className='col-md-3'>Descrição Da Cobrança: </div>
									<div className='col-md-9 text-muted fst-italic text-capitalize'>
										{charge.description}
									</div>
									<div className='col-md-3'>Valor Da Cobrança: </div>
									<div className='col-md-9 text-muted fst-italic text-capitalize'>
										R$ {charge.total_value}
									</div>
									<div className='col-md-12 mt-3 text-end'>
										Devedor:{' '}
										<span className='text-capitalize text-muted fst-italic'>
											{debtor ? debtor.user : <a href='#'>Convidar Devedor</a>}
										</span>
									</div>
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
												<th scope='col'>Status</th>
												<th scope='col'>Ações</th>
											</tr>
										</thead>
										<tbody>
											{!!charge &&
												charge.installments.map((installment, key: number) => (
													<tr key={key}>
														<td>{installment.number}</td>
														<td>R$ {installment.value}</td>
														<td>{installment.due_date}</td>
														<td>
															{installment.status ? (
																<a href='./'>Pago</a>
															) : (
																<a href='./'>Aberto</a>
															)}
														</td>
														<td>
															<button className='btn btn-sm btn-primary me-2 mb-2'>
																{charge.pivot.status === 'Creditor'
																	? 'Dar Baixa'
																	: 'Pedir Baixa'}
															</button>
															{!installment.voucher ? (
																<label className='btn btn-sm btn-primary mb-2'>
																	Enviar Comprovante
																	<input
																		type='file'
																		required={true}
																		accept='image/*'
																		onChange={evt =>
																			handleSendVoucher(
																				evt.target.files as FileList,
																				installment.id
																			)
																		}
																		hidden
																	/>
																</label>
															) : (
																<a
																	href={
																		'http://localhost:8000' +
																		installment.voucher
																	}
																	className='btn btn-sm btn-info'
																>
																	{'-'}
																	Ver o Comprovante{'-'}
																</a>
															)}
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
			<Footer />
		</>
	)
}
