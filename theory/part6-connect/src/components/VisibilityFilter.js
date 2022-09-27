import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
	const dispatch = useDispatch()

	return (
		<div>
			<input
				type="radio"
				name="filter"
				onChange={() => dispatch(filterChange('ALL'))}
			/>
			all
			<input
				type="radio"
				name="filter"
				onChange={() => dispatch(filterChange('IMPORTANT'))}
			/>
			important
			<input
				type="radio"
				name="filter"
				onChange={() => dispatch(filterChange('NONIMPORTANT'))}
			/>
			nonimportant
		</div>
	)
}

export default VisibilityFilter