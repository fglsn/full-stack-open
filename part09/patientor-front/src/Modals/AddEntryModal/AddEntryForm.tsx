import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryTypeOption, DiagnosisSelection, NumberField } from "../FormField";
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

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
	const [{ diagnoses }] = useStateValue();

	const fieldsByTypes = (type: EntryType) => {
		switch (type) {
			case "Hospital":
				return (
					<>
						<Field
							label="Discharge cause"
							placeholder="Discharge cause"
							name="discharge.criteria"
							component={TextField}
						/>
						<Field
							label="Discharge date"
							placeholder="YYYY-MM-DD"
							name="discharge.date"
							component={TextField}
						/>
					</>
				);
			case "OccupationalHealthcare":
				return (
					<>
						<Field
							label="Employer name"
							placeholder="Employer name"
							name="employerName"
							component={TextField}
						/>
						<Field
							label="Sick leave starting date"
							placeholder="YYYY-MM-DD"
							name="sickLeave.startDate"
							component={TextField}
						/>
						<Field
							label="Sick leave ending date"
							placeholder="Sick leave ending date"
							name="sickLeave.endDate"
							component={TextField}
						/>
					</>
				);
			case "HealthCheck":
				return (
					<Field
						label="healthCheckRating"
						name="healthCheckRating"
						component={NumberField}
						min={0}
						max={3}
					/>
				);
		}
	};

	return (
		<Formik
			initialValues={{
				type: EntryType.HealthCheck,
				description: "",
				date: "",
				specialist: "",
				employerName: "",
				diagnosisCodes: [],
				healthCheckRating: 0,
				sickLeave: {
					startDate: "",
					endDate: ""
				},
				discharge: {
					date: "",
					criteria: ""
				},
			}}
			enableReinitialize
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = "Field is required";
				const invalidError = "Provided value is not valid or wrong formatted";
				const errors: { [field: string]: string } = {};
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (values.type === EntryType.Hospital) {
					if (!values.discharge.criteria || !values.discharge.date) {
						errors.discharge = requiredError;
					}
				}
				if (values.type === EntryType.OccupationalHealthcare) {
					if (!values.employerName) {
						errors.employerName = requiredError;
					}
					if ((values.sickLeave.startDate && !values.sickLeave.endDate)
						|| (values.sickLeave.endDate && !values.sickLeave.startDate)) {
						errors.sickLeave = requiredError;
					}
					if (!isDate(values.sickLeave.startDate) || !isDate(values.sickLeave.endDate)) {
						errors.sickLeave = invalidError;
					}
				}
				if (values.type === EntryType.HealthCheck) {
					if (values.healthCheckRating === undefined) {
						errors.healthCheckRating = requiredError;
					}
					if (Number(values.healthCheckRating) < 0 || Number(values.healthCheckRating) > 3) {
						errors.healthCheckRating = invalidError;
					}
				}
				return errors;
			}}
		>
			{({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
				console.log(values);
				return (
					<Form className="form ui">
						<SelectField label="Entry" name="type" options={entryTypes} />
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
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnoses)}
						/>
						{fieldsByTypes(values.type)}
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
