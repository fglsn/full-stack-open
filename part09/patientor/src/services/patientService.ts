import patients from '../../data/patients';

import { Patient, PatientWithoutSsn } from "../types";

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

export default {
	getAllData,
	getPatientsWithoutSsn
};