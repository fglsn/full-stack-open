import React from 'react'

const Notification = ({ error, info }) => {
	if (error === null && info === null) {
	  return null
	}
  
	if (error) {
		return (
			<div className='error'>
			  {error}
			</div>
		  )
	}

	if (info) {
		return (
			<div className='info'>
			  {info}
			</div>
		  )
	}
  }

export default Notification