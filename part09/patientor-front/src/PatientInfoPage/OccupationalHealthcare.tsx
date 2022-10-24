import React from 'react';

import { OccupationalHealthcareEntry } from '../types';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import Moment from 'moment';

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => (
	<ListItem alignItems="flex-start">
		<ListItemAvatar>
			<VaccinesIcon />
		</ListItemAvatar>
		<ListItemText
			primary={Moment(entry.date).format('ddd D MMM YYYY') + ' / ' + entry.employerName}
			secondary={
				<React.Fragment>
					<Typography
						sx={{ display: 'inline' }}
						component="span"
						variant="body2"
						color="text.primary"
					>
						{entry.description} <br/>
						Diagnosed by: {entry.specialist}
					</Typography>
				</React.Fragment>
			}
		/>
	</ListItem>
);

export default OccupationalHealthcare;