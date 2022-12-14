import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNumeric = (str: any): boolean => {
	if (typeof str != "string") return false;
	return !isNaN(parseInt(str));
};

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const height = req.query.height;
	const weight = req.query.weight;
	if (!isNumeric(height) || !isNumeric(weight)) {
		res.send({ error: "malformatted parameters" });
	} else {
		const calculator = calculateBmi(Number(height), Number(weight));
		res.send({ height, weight, calculator });
	}
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = req.body;

	if (!daily_exercises || !target) {
		return res.status(400).send({ error: "parameters missing" });
	}
	if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
		return res.status(400).send({ error: "malformatted parameters" });
	} else if (!daily_exercises.length) {
		return res.status(400).send({ error: "no daily report provided" });
	} else {
		if(!daily_exercises.every(element => !isNaN(Number(element)))) {
			return res.status(400).send({ error: "malformatted parameters" });
		} else {
			const parsedExecises = daily_exercises.map(Number);
			const result = calculateExercises(parsedExecises, Number(target));
			return res.send(result);
		}
	}
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
