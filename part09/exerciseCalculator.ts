interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface Arguments {
	hoursReport: Array<number>,
	target: number
}

const parseArguments = (args: Array<string>): Arguments => {
	if (args.length < 4) throw Error('Not enough arguments');
	const hoursReport = [];
	const target = Number(args[2]);
	for (let i = 3; i < args.length; i++) {
		if (isNaN(Number(args[i])))
			throw new Error('Provided values were not numbers!');
		hoursReport.push(Number(args[i]));
	}
	return { hoursReport, target };
};

export const calculateExercises = (hoursReport: Array<number>, target: number): Result => {
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
	};
};


try {
	const { hoursReport, target } = parseArguments(process.argv);
	console.log(calculateExercises(hoursReport, target));
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}

