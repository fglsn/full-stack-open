/* eslint-disable @typescript-eslint/no-unsafe-call */
import patients from '../../data/patients';

import { Patient, PublicPatient, NewPatient, Entry } from "../types";
import { v1 as uuid } from 'uuid';

const getAllData = (): Patient[] => {
	return patients;
};

const getPublicPatients = (): PublicPatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const getPatientInfo = (id: string): Patient | undefined => {
	return patients.find(patient => patient.id === id);
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

const addEntry = (entry: Entry, patientId: string): Entry => {
	const newEntry = { ...entry, id: uuid() };
	const patient = patients.find(patient => patient.id === patientId);
	if (!patient) {
		throw new Error("No patient found");
	}
	(patient.entries).push(newEntry);
	return newEntry;
};

export default {
	getAllData,
	getPublicPatients,
	addPatient,
	getPatientInfo,
	addEntry
};