import { useState } from 'react'

const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange
	}
}


const App = (props) => {
	const name = useField('text')
	const born = useField('date')
	const height = useField('number')

	return (
		<div>
			<form>
				name:
				<input
					type={name.type}
					value={name.value}
					onChange={name.onChange}
				/>
				birthdate:
				<input {...born} // simplified with spread operators
				/>
				height:
				<input {...height} />
			</form>
			<div>
				{name.value} {born.value} {height.value}
			</div>
		</div>
	)
}