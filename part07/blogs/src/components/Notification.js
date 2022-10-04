import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'


const Notification = () => {
	const notification = useSelector((state) => state.notification)
	if (notification && notification.includes('Error: '))
		return <Alert severity="error">{notification}</Alert>
	else
		return notification && <Alert severity="success">{notification}</Alert>

}

export default Notification
