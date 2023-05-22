import IInstallment from './IInstallment'

export default interface ICharge {
	id: number
	title: string
	description: string
	total_value: number
	number_of_installments: number
	created_at: string
	updated_at: string
	payment_day: number
	installments: IInstallment[]
	users: {
		id: number
		user: string
		pivot: { user_id: number; charge_id: number; status: string }
	}[]
	pivot: {
		user_id: number
		charge_id: number
		status: string
	}
	confirm_payments: {
		id: number
		installment_id: number
		request_message: string
		response_message: string
		status: boolean
		created_at: string
	}[]
}
