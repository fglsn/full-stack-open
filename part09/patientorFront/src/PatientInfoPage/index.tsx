import React from "react";
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { LoadedPatient } from "../types";

import {
	Box,
	Card,
	CardHeader,
	CardContent,
	Typography,
	Avatar,
	List,
	ListSubheader,
} from '@mui/material';

import { red } from '@mui/material/colors';
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientInfoPage = () => {
	const { id } = useParams<{ id: string }>();
	if (!id) {
		return null;
	}
	const [{ loadedPatients }, dispatch] = useStateValue();
	// const [error, setError] = React.useState<string>();

	const patient = Object.values(loadedPatients).find((patient) => patient.id === id);
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
				dispatch({ type: "LOAD_PATIENT", payload: loadedPatient });
			} catch (e) {
				console.error(e);
			}
		};
		void fetchPatientInfo();
	}, [dispatch, id, patient]);

	if (!patient) {
		return null;
	}

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
						<strong>{patient.name}</strong>
						{patient.gender === "female" ? (
							<FemaleIcon fontSize={"small"} />
						) : (
							<MaleIcon fontSize={"small"} />
						)}
						<p>ssn: {patient.ssn}</p>
						<p>occupation: {patient.occupation}</p>
						<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
							subheader={
								<ListSubheader component="div" id="nested-list-subheader">
									Diagnoses:
								</ListSubheader>
							}>
						</List>
					</Typography>
				</CardContent>
			</Card>
		</Box >
	);
};

export default PatientInfoPage;