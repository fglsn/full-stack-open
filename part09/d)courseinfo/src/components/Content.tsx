import { CoursePart, CourseParts } from '../types' 

const Part = ({ part }: { part: CoursePart } ) => {
	return <p>{part.name} {part.exerciseCount}</p>
}

const Content = ({ parts }: CourseParts ) => {
	return (
	<>
		{parts.map(part =>
			<Part key={part.name} part={ part }/> 
		)}
	</>
	)
}

export default Content