import { State } from "./state";
import { Patient, LoadedPatient, Diagnosis } from "../types";

export type Action =
	| {
		type: "SET_PATIENT_LIST";
		payload: Patient[];
	}
	| {
		type: "ADD_PATIENT";
		payload: Patient;
	}
	| {
		type: "LOAD_PATIENT";
		payload: LoadedPatient;
	}
	| {
		type: "SET_DIAGNOSES_LIST";
		payload: Diagnosis[];
	};

export const setPatientList = (patients: Patient[]): Action => {
	return {
		type: "SET_PATIENT_LIST",
		payload: patients
	};
};

export const addPatient = (patient: Patient): Action => {
	return {
		type: "ADD_PATIENT",
		payload: patient
	};
};

export const loadPatient = (patient: LoadedPatient): Action => {
	return {
		type: "LOAD_PATIENT",
		payload: patient
	};
};

export const setDiagnosesList = (diagnoses: Diagnosis[]): Action => {
	return {
		type: "SET_DIAGNOSES_LIST",
		payload: diagnoses
	};
};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_PATIENT_LIST":
			return {
				...state,
				patients: {
					...action.payload.reduce(
						(memo, patient) => ({ ...memo, [patient.id]: patient }),
						{}
					),
					...state.patients
				}
			};
		case "ADD_PATIENT":
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload
				}
			};
		case "LOAD_PATIENT":
			return {
				...state,
				loadedPatients: {
					...state.loadedPatients,
					[action.payload.id]: action.payload,
				}
			};
		case "SET_DIAGNOSES_LIST":
			return {
				...state,
				diagnoses: {
					...action.payload.reduce(
						(memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
						{}
					),
					...state.diagnoses
				}
			};
		default:
			return state;
	}
};
