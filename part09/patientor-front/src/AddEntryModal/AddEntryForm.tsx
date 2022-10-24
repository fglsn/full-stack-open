import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryTypeOption } from "./FormField";
import { EntryType, Entry } from "../types";

export type PatientFormValues = Omit<Entry, "id">;

interface Props {
	onSubmit: (values: PatientFormValues) => void;
	onCancel: () => void;
}

const genderOptions: EntryTypeOption[] = [
	{ value: EntryType.HealthCheck, label: "Health Check" },
	{ value: EntryType.Hospital, label: "Hospital" },
	{ value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
	return (
		<Formik
			initialValues={{
				type: EntryType.HealthCheck,
				description: "",
				date: "",
				specialist: "",
				diagnosisCodes: [],
				healthCheckRating: 0,
				sickLeave: {
					startDate: "",
					endDate: "",
				},
				discharge: {
					date: "",
					criteria: ""
				},
			}}
			onSubmit={onSubmit}
		// validate={(values) => {
		// 	const requiredError = "Field is required";
		// 	const errors: { [field: string]: string } = {};
		// 	if (!values.name) {
		// 		errors.name = requiredError;
		// 	}
		// 	if (!values.ssn) {
		// 		errors.ssn = requiredError;
		// 	}
		// 	if (!values.dateOfBirth) {
		// 		errors.dateOfBirth = requiredError;
		// 	}
		// 	if (!values.occupation) {
		// 		errors.occupation = requiredError;
		// 	}
		// 	return errors;
		// }}
		>
}