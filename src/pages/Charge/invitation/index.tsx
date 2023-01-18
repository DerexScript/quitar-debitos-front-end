import Loading from 'components/Loading'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAxios } from 'utils/useAxios'

export default () => {
	const { invitation_code } = useParams()
	const navigate = useNavigate()
	useEffect(() => {
		;(async () => {
			const { status } = await useAxios({
				url: `acceptDebtorInvitation/${invitation_code}`,
				method: 'POST'
			})
			if (status === 200) {
				toast.success('Convite aceito com sucesso')
			} else {
				toast.error('Falha ao aceitar convite')
			}
			navigate('/charge')
		})()
	}, [])
	return (
		<>
			<Loading />
		</>
	)
}
