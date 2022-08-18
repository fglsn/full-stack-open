import React from 'react'

const Header = ({name}) => <h1>{name}</h1>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => 
	parts.map(part => 
		<Part name={part.name} exercises={part.exercises} key={part.name}/>
	)

const Total = ({parts}) => {
	const total = parts.reduce((total, i) => total + i.exercises, 0);
	return <h4>Total of {total} exercises</h4>
}

const Course = ({course}) => {
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default Course