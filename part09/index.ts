import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

const isNumeric = (str: string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined) : boolean => {
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
	}
	const calculator = calculateBmi(Number(height), Number(weight));

	res.send({height, weight, calculator});
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
