type Operation = 'multiply' | 'add' | 'divide';

type Result = number;

export const calculator = (a: number, b: number, op: Operation): Result => {
	switch (op) {
		case 'multiply':
			return a * b;
		case 'divide':
			if (b === 0) throw new Error('Can\'t divide by 0!');
			return a / b;
		case 'add':
			return a + b;
		default:
			throw new Error('Operation is not multiply, add or divide!');
	}
};

try {
	const a = Number(process.argv[2]);
	const b = Number(process.argv[3]);
	console.log(calculator(a, b, 'multiply'));
	console.log(calculator(a, b, 'add'));
	console.log(calculator(a, b, 'divide'));
} catch (error: unknown) {
	let errorMessage = 'Something went wrong.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}

