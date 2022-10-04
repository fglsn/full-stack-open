import { Typography } from '@mui/material'

let style = {
	footer: {
		margin: '2rem',
		position: 'fixed',
		bottom: '5px',
		right: '5px'
	}
}

const Footer = () => {
	return <Typography style={style.footer}>Full Stack Open 2022 </Typography>
}

export default Footer