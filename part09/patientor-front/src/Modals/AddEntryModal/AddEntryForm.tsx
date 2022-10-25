import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryTypeOption, DiagnosisSelection, HealthRatingOption } from "../FormField";
import { EntryType, Entry, HealthCheckRating } from "../../types";
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

const healthRatings: HealthRatingOption[] = [
	{ value: HealthCheckRating.Healthy, label: "Healthy" },
	{ value: HealthCheckRating.LowRisk, label: "Low Risk" },
	{ value: HealthCheckRating.HighRisk, label: "High Risk" },
	{ value: HealthCheckRating.CriticalRisk, label: "Critical Risk" }
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
					<SelectField 
					label="Health Rating"
					name="healthCheckRating"
					options={healthRatings}
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
				const invalidError = "Provided value is not valid, empty or wrong formatted";
				const errors: { [field: string]: unknown } = {};
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!isDate(values.date)) {
					errors.date = invalidError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (values.type === EntryType.Hospital) {
					if (!values.discharge.criteria) {
						errors.discharge = {criteria: invalidError};
					}
					if (!isDate(values.discharge.date) || !values.discharge.date) {
						errors.discharge = {date: invalidError};
					}
				}
				if (values.type === EntryType.OccupationalHealthcare) {
					if (!values.employerName) {
						errors.employerName = requiredError;
					}
					if (!isDate(values.sickLeave.startDate)) {
						errors.sickLeave = {startDate: invalidError};
					}
					if (!isDate(values.sickLeave.endDate)) {
						errors.sickLeave = {endDate: invalidError};
					}
				}
				if (values.type === EntryType.HealthCheck) {
					if (values.healthCheckRating === undefined) {
						errors.healthCheckRating = requiredError;
					}
				}
				return errors;
			}}
		>
			{({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
				// console.log(values);
				return (
					<Form className="form ui">
						<SelectField 
							label="Entry"
							name="type"
							options={entryTypes}
						/>
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
