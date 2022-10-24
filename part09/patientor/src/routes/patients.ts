/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getPublicPatients());
});

router.post('/', (req, res) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

router.get('/:id', (req, res) => {
	res.send(patientService.getPatientInfo(req.params.id));
});

router.post('/:id/entries', (req, res) => {
	try {
		const newEntry = toNewEntry(req.body);
		const addedEntry = patientService.addEntry(newEntry, req.params.id);
		res.json(addedEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
