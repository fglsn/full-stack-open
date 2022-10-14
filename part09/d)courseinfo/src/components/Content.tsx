import { CoursePart } from '../types' 
import Part from './Part'

const Content = ({ parts }: { parts: CoursePart[] }) => {
	return (
		<>
			{parts.map(part =>
				<p key={part.name}>
					<Part part={part}/>
				</p>
			)}
		</>
	)
}

export default Content