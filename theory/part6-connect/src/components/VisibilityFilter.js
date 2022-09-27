import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {

	return (
		<div>
			<input
				type="radio"
				name="filter"
				onChange={() => props.filterChange('ALL')}
			/>
			all
			<input
				type="radio"
				name="filter"
				onChange={() => props.filterChange('IMPORTANT')}
			/>
			important
			<input
				type="radio"
				name="filter"
				onChange={() => props.filterChange('NONIMPORTANT')}
			/>
			nonimportant
		</div>
	)
}

const mapStateToProps = (state) => {
	return { filter: state.filter }
}

const mapDispatchToProps = {
	filterChange
}

const ConnectedFilters = connect(
	mapStateToProps,
	mapDispatchToProps
)(VisibilityFilter);
export default ConnectedFilters;
