import { CourseParts } from "../types"

const Total = ({ parts }: CourseParts) => {
	return (
		<p>
			Number of exercises{" "}
			{parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
		</p>
	)
}

export default Total