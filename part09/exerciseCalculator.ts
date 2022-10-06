interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

const calculateExercises = (hoursReport: Array<number>, target: number): Result => {

	const periodLength = hoursReport.length;
	const trainingDays = hoursReport.filter(hours => hours > 0).length;
	const average = hoursReport.reduce((a, b) => a + b, 0) / hoursReport.length;
	const success = average >= target ? true : false;

	let rating = 0;
	let ratingDescription = '';

	if (average < target / 2) {
		rating = 1;
		ratingDescription = 'far behind the target, try better next time!';
	}
	else if (average >= target) {
		rating = 3;
		ratingDescription = 'beautiful, well done!';
	}
	else {
		rating = 2;
		ratingDescription = 'not too bad but could be better';
	}

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average
	}
}

console.log(calculateExercises([1, 0], 2));