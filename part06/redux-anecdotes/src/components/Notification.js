import { useSelector } from 'react-redux'

const Notification = (props) => {

	const notification = useSelector((state) => state.notification)

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}

	return (
		notification &&
		<div style={style}>
			{notification}
		</div>
	)
}

export default Notification