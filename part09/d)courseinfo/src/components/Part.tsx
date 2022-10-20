import { CoursePart } from '../types'

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const Part = ({ part }: { part: CoursePart }) => {
	return (
		<p>
			<div>
				<strong>{part.name} {part.exerciseCount}</strong>
				<br />
				<SubPart part={part} />
			</div>
		</p>
	)
}

const SubPart = ({ part }: { part: CoursePart }) => {
	switch (part.type) {
		case 'normal':
			return (
				<i>{part.description}</i>
			)
		case 'groupProject':
			return (
				<>
					project exercises {part.groupProjectCount}
				</>
			)
		case 'submission':
			return (
				<>
					<i>{part.description}</i>
					<br />
					submit to: {part.exerciseSubmissionLink}
				</>
			)
		case 'special':
			return (
				<>
					<i>{part.description}</i>
					<br />
					required skills: {(part.requirements).map(req => req + " ")}
				</>
			)
		default:
			return assertNever(part);
	}
}

export default Part