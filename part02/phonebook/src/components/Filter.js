import React from "react"

const Filter = ({search, handleNewSearch}) => {
	return (
		<div>Find contact <input onChange={handleNewSearch} value={search}/></div>
	)
}

export default Filter