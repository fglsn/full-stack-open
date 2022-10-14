import { CoursePart } from '../types'

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const Part = ({ part }: { part: CoursePart }) => {
	switch (part.type) {
		case 'normal':
			return (
				<div>
					<strong>{part.name} {part.exerciseCount}</strong>
					<br />
					<i>{part.description}</i>
				</div>
			)
		case 'groupProject':
			return (
				<div>
					<strong>{part.name} {part.exerciseCount}</strong>
					<br />
					project exercises {part.groupProjectCount}
				</div>
			)
		case 'submission':
			return (
				<div>
					<strong>{part.name} {part.exerciseCount}</strong>
					<br />
					<i>{part.description}</i>
					<br />
					submit to: {part.exerciseSubmissionLink}
				</div>
			)
		case 'special':
			return (
				<div>
					<strong>{part.name} {part.exerciseCount}</strong>
					<br />
					<i>{part.description}</i>
					<br />
					required skills: {(part.requirements).map(req => req + " ")}
				</div>
			)
		default:
			return assertNever(part);
	}
}

export default Part