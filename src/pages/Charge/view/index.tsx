import Footer from 'components/Footer'
import Nav from 'components/Nav'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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

	const creditor = charge?.users.find(user => user.pivot.status === 'Creditor')
	const debtor = charge?.users.find(user => user.pivot.status === 'Debtor')

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

	const confirmPayment = async (installmentID: number) => {
		const isConfirmed = window.confirm('Deseja dar baixa nesse pagamento?')
		const installment = charge?.installments.find(
			installment => installment.id === installmentID
		)
		if (!installment) {
			toast.error('Parcela n??o encontrada')
			return
		}
		if (installment?.voucher === null) {
			toast.warning('Voc?? precisa subir um comprovante antes de dar baixa.')
			return
		}
		if (isConfirmed) {
			setLoading(true)
			const formData = new FormData()
			formData.append('_method', 'PUT')
			formData.append('number', installment.number.toString())
			formData.append('value', installment.value)
			formData.append('due_date', installment.due_date)
			formData.append('status', 'true')
			const { status } = await useAxios({
				url: `installment/${installmentID}`,
				method: 'POST',
				data: formData
			})
			if (status === 200) {
				setCharge(oldCharge => {
					if (!oldCharge?.installments) {
						return oldCharge
					}
					oldCharge.installments = oldCharge.installments.map(installment => {
						if (installment.id === installmentID) {
							installment.status = true
						}
						return installment
					})
					return oldCharge
				})
				toast.success('Baixa realizada com sucesso.')
			} else {
				toast.error('Erro ao dar baixa no pagamento')
			}
			await new Promise(resolve => setTimeout(resolve, 10))
			setLoading(false)
		}
	}

	const askPaymentConfirmation = async (installmentID: number) => {
		const isConfirmed = window.confirm(
			'Deseja solicitar baixa nesse pagamento?'
		)
		const installment = charge?.installments.find(
			installment => installment.id === installmentID
		)
		if (!installment) {
			toast.error('Parcela n??o encontrada')
			return
		}
		if (installment?.voucher === null) {
			toast.warning(
				'Voc?? precisa subir um comprovante antes de solicitar baixa.'
			)
			return
		}
		if (isConfirmed) {
			console.log('')
		}
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
									<div className='col-md-3'>Titulo Da Cobran??a: </div>
									<div className='col-md-9 text-muted fst-italic text-capitalize'>
										{charge.title}
									</div>
									<div className='col-md-3'>Descri????o Da Cobran??a: </div>
									<div className='col-md-9 text-muted fst-italic text-capitalize'>
										{charge.description}
									</div>
									<div className='col-md-3'>Valor Da Cobran??a: </div>
									<div className='col-md-9 text-muted fst-italic text-capitalize'>
										R$ {charge.total_value}
									</div>
									<div className='col-md-6 mt-5 text-start'>
										Credor:{' '}
										<span className='text-capitalize text-muted fst-italic'>
											{creditor?.user}
										</span>
									</div>
									<div className='col-md-6 mt-5 text-end'>
										Devedor:{' '}
										<span className='text-capitalize text-muted fst-italic'>
											{debtor ? (
												debtor.user
											) : (
												<Link to={'/invite-debtor/' + chargeId}>
													Convidar Devedor
												</Link>
											)}
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
												<th scope='col'>N?? Parcela</th>
												<th scope='col'>Valor</th>
												<th scope='col'>Data De Vencimento</th>
												<th scope='col'>Status</th>
												<th scope='col'>A????es</th>
											</tr>
										</thead>
										<tbody>
											{!!charge &&
												charge.installments.map((installment, key: number) => (
													<tr key={key}>
														<td>{installment.number}</td>
														<td>R$ {installment.value}</td>
														<td>{installment.due_date}</td>
														<td>{installment.status ? `Pago` : `Pendente`}</td>
														<td>
															{!installment.status && (
																<>
																	{charge.pivot.status === 'Creditor' ? (
																		<button
																			onClick={() =>
																				confirmPayment(installment.id)
																			}
																			className='btn btn-sm btn-primary me-2 mb-2'
																		>
																			Dar Baixa
																		</button>
																	) : (
																		<button
																			onClick={() =>
																				askPaymentConfirmation(installment.id)
																			}
																			className='btn btn-sm btn-primary me-2 mb-2'
																		>
																			Pedir Baixa
																		</button>
																	)}
																</>
															)}
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
																	className='btn btn-sm btn-info mb-2'
																>
																	Ver o Comprovante
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
