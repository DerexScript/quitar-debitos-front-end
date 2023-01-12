export default interface ICharge {
	id: number
	title: string
	description: string
	total_value: number
	installments: string
	created_at: string
	updated_at: string
	pivot: {
		user_id: number
		charge_id: number
	}
}
