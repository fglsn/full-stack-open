/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	NewPatient, Gender,
	Entry, HealthCheckEntry,
	OccupationalHealthcareEntry,
	EntryType, HealthCheckRating,
	SickLeave, HospitalEntry, Discharge
} from "./types";

import { v1 as uuid } from 'uuid';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(HealthCheckRating).includes(param);
};

const isEntryType = (param: any): param is EntryType => {
	return Object.values(EntryType).includes(param);
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error(`Incorrect or missing field name: ${name}`);
	}
	return name;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	return date;
};

const parseSsn = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error(`Incorrect or missing field ssn: ${ssn}`);
	}
	return ssn;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender)) {
		throw new Error(`Invalid or missing field gender: ${gender}`);
	}
	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error(`Incorrect or missing field occupation: ${occupation}`);
	}
	return occupation;
};

const parseDescription = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error(`Invalid or missing field descripton: ${description}`);
	}
	return description;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error(`Invalid or missing field specialist: ${specialist}`);
	}
	return specialist;
};

const parseEmployer = (employerName: unknown): string => {
	if (!employerName || !isString(employerName)) {
		throw new Error(`Invalid or missing field employer/company name: ${employerName}`);
	}
	return employerName;
};


const parseDischarge = (discharge: any): Discharge => {
	if (!discharge) {
		throw new Error(`Missing fields discharge: ${discharge}`);
	} else if (!discharge.criteria || !isString(discharge.criteria)) {
		throw new Error(`Invalid or missing field criteria: ${discharge.criteria}`);
	} else if (!discharge.date || !isString(discharge.date) || !isDate(discharge.date)) {
		throw new Error(`Invalid or missing field date in discharge section: ${discharge.date}`);
	}
	return { criteria: discharge.criteria, date: discharge.date };
};

const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
	if (sickLeave) {
		if (!isString(sickLeave.startDate) || !isString(sickLeave.endDate)
			|| !isDate(sickLeave.endDate) || !isDate(sickLeave.startDate)) {
			throw new Error(`Invalid field sick leave: ${sickLeave}`);
		}
		return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
	}
	return undefined;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
	if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
		throw new Error(`Invalid or missing health rating: ${healthCheckRating}`);
	}
	return healthCheckRating;
};

const parseEntryType = (entryType: any): EntryType => {
	if (!entryType || !isEntryType(entryType)) {
		throw new Error(
			"Invalid or missing field entry type" + `${entryType}`
		);
	}
	return entryType;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
	const newPatient: NewPatient = {
		name: parseName(name),
		dateOfBirth: parseDate(dateOfBirth),
		ssn: parseSsn(ssn),
		gender: parseGender(gender),
		occupation: parseOccupation(occupation),
		entries: []
	};
	return newPatient;
};

export const toNewEntry = (entryFields: any): Entry => {
	const newBaseEntry = {
		type: parseEntryType(entryFields.type),
		description: parseDescription(entryFields.description),
		date: parseDate(entryFields.date),
		specialist: parseSpecialist(entryFields.specialist),
		diagnosisCodes: entryFields.diagnosisCodes
	};

	if (entryFields.type === 'HealthCheck') {
		const newHealthCheck: HealthCheckEntry = {
			...newBaseEntry,
			id: uuid(),
			type: "HealthCheck",
			healthCheckRating: parseHealthCheckRating(entryFields.healthCheckRating),
		};
		return newHealthCheck;
	} else if (entryFields.type === 'OccupationalHealthcare') {
		const newOccupationalHealthcareEntry: OccupationalHealthcareEntry = {
			...newBaseEntry,
			id: uuid(),
			type: "OccupationalHealthcare",
			employerName: parseEmployer(entryFields.employer),
			sickLeave: parseSickLeave(entryFields.sickLeave)
		};
		return newOccupationalHealthcareEntry;
	} else if (entryFields.type === 'Hospital') {
		const newHospitalEntry: HospitalEntry = {
			...newBaseEntry,
			id: uuid(),
			type: "Hospital",
			discharge: parseDischarge(entryFields.discharge),
		};
		return newHospitalEntry;
	} else {
		throw new Error("Wrong entry type, please try again");
	}
};
