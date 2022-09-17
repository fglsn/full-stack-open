import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<div>
			<div className='container' style={hideWhenVisible}>
				<button className='btn' onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div className='container' style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>hide</button>
			</div>
		</div>
	)
})

export default Togglable