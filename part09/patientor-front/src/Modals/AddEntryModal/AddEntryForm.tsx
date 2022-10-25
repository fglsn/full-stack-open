import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryTypeOption, DiagnosisSelection } from "../FormField";
import { EntryType, Entry } from "../../types";
import { useStateValue } from "../../state";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}

const entryTypes: EntryTypeOption[] = [
	{ value: EntryType.HealthCheck, label: "Health Check" },
	{ value: EntryType.Hospital, label: "Hospital" },
	{ value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
	const [{ diagnoses }] = useStateValue();

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
			{({ isValid, dirty, setFieldValue, setFieldTouched }) => {
				return (
					<Form className="form ui">
						<SelectField label="Entry" name="entry" options={entryTypes} />
						<Field
							label="Description"
							placeholder="Description"
							name="description"
							component={TextField}
						/>
						<Field
							label="Date"
							placeholder="YYYY-MM-DD"
							name="date"
							component={TextField}
						/>
						<Field
							label="Specialist"
							placeholder="Specialist"
							name="specialist"
							component={TextField}
						/>
						<Field
							label="HealthCheckRating"
							placeholder="Health Check Rating"
							name="healthCheckRating"
							component={TextField}
						/>
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnoses)}
						/>
						<Field
							label="HealthCheckRating"
							placeholder="Health Check Rating"
							name="healthCheckRating"
							component={TextField}
						/>
						<Field
							label="HealthCheckRating"
							placeholder="Health Check Rating"
							name="healthCheckRating"
							component={TextField}
						/>
						<Grid>
							<Grid item>
								<Button
									color="secondary"
									variant="contained"
									style={{ float: "left" }}
									type="button"
									onClick={onCancel}
								>
									Cancel
								</Button>
							</Grid>
							<Grid item>
								<Button
									style={{
										float: "right",
									}}
									type="submit"
									variant="contained"
									disabled={!dirty || !isValid}
								>
									Add
								</Button>
							</Grid>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryForm;
