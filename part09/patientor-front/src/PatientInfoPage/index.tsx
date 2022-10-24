import React from "react";
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { useStateValue, loadPatient } from "../state";
import { useParams } from "react-router-dom";
import { LoadedPatient, Entry, Gender } from "../types";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";

import {
	Box,
	Card,
	CardHeader,
	CardContent,
	Typography,
	Avatar,
	List,
	ListSubheader,
	// ListItemText
} from '@mui/material';

import { red } from '@mui/material/colors';
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from '@mui/icons-material/Transgender';

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const PatientInfoPage = () => {
	const { id } = useParams<{ id: string }>();
	if (!id) {
		return null;
	}
	const [{ loadedPatients }, dispatch] = useStateValue();

	const patient: LoadedPatient | undefined = Object.values(loadedPatients).find((patient) => patient.id === id);

	React.useEffect(() => {
		const fetchPatientInfo = async () => {
			if (patient)
				return;
			try {
				const { data: loadedPatient } = await axios.get<LoadedPatient>(
					`${apiBaseUrl}/patients/${id}`
				);
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				console.log(`Loaded patient: ${loadedPatient.name}`);
				dispatch(loadPatient(loadedPatient));
			} catch (e) {
				console.error(e);
			}
		};
		void fetchPatientInfo();
	}, [dispatch, id, patient]);

	if (!patient) {
		return null;
	}

	const entries: Entry[] = patient.entries;
	// const gender: Gender = patient.gender;

	const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
		switch (entry.type) {
			case 'Hospital':
				return <Hospital entry={entry} />;
			case 'OccupationalHealthcare':
				return <OccupationalHealthcare entry={entry} />;
			case 'HealthCheck':
				return <HealthCheck entry={entry} />;
			default:
				return assertNever(entry);
		}
	};

	const GenderIcon: React.FC<{ gender: Gender }> = ({ gender }) => {
		switch (gender) {
			case "male":
				return <MaleIcon fontSize={"small"} />;
			case "female":
				return <FemaleIcon fontSize={"small"} />;
			case "other":
				return <TransgenderIcon fontSize={"small"} />;
			default:
				return <TransgenderIcon fontSize={"small"} />;
		}
	};

	return (
		<Box>
			<Card variant="outlined">
				<CardHeader
					avatar={
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						<Avatar sx={{ bgcolor: red[500] }}>
							{patient.name}
						</Avatar>}

					title={patient.name}
				>
				</CardHeader>
				<CardContent>
					<Typography variant="body2" component={'span'} color="text.primary">
						<GenderIcon gender={patient.gender}/>
						<p>ssn: {patient.ssn}</p>
						<p>occupation: {patient.occupation}</p>
						<List sx={{ width: '100%', bgcolor: 'background.paper' }}
							subheader={
								<ListSubheader component="div" id="nested-list-subheader">
									Diagnoses:
								</ListSubheader>
							}>
							{entries.map((entry, i) => <EntryDetails key={i} entry={entry} />)
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								// const codes = entry.diagnosisCodes;
								// return (
								// 	<div key={i}>
								// 		<strong>{entry.date} |  </strong>
								// 		<i>{entry.description}</i>
								// 		<ul>
								// 			{codes === undefined ? null : codes.map((code, x) => {
								// 				const diagnose = Object.values(diagnoses).find((diagnose) => diagnose.code === code);
								// 				return (<li key={x}>{code}  {diagnose === undefined ? null : diagnose.name}</li>);
								// 			})}
								// 		</ul>
								// 	</div>);
							}
						</List>
					</Typography>
				</CardContent>
			</Card>
		</Box >
	);
};

export default PatientInfoPage;