/* eslint-disable @typescript-eslint/no-unsafe-call */
import patients from '../../data/patients';

import { Patient, PatientWithoutSsn, NewPatient } from "../types";
import { v1 as uuid } from 'uuid';

const getAllData = (): Patient[] => {
	return patients;
};

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (patient: NewPatient): Patient => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const id = uuid();

	const newPatient = {
		id: String(id),
		...patient
	};

	patients.push(newPatient);
	return newPatient;
};

export default {
	getAllData,
	getPatientsWithoutSsn,
	addPatient
};