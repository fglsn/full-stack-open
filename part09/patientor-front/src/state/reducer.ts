import { State } from "./state";
import { Patient, LoadedPatient } from "../types";

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
		default:
			return state;
	}
};
