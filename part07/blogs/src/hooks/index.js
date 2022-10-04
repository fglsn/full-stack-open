import { useState } from 'react'

export const useField = (type, label) => {
	const [value, setValue] = useState('')

	const onChange = (event) => setValue(event.target.value)

	return {
		type,
		label,
		value,
		onChange,
	}
}

export const useFieldWithReset = (type, label) => {
	const [value, setValue] = useState('')

	const onChange = (event) => setValue(event.target.value)

	const reset = () => setValue('')

	return {
		type,
		label,
		value,
		onChange,
		reset
	}
}
