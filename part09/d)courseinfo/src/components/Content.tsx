import { CoursePart } from '../types'
import Part from './Part'

const Content = ({ parts }: { parts: CoursePart[] }) => {
	return (
		<>
			{parts.map(part =>
				<Part key={part.name} part={part} />
			)}
		</>
	)
}

export default Content