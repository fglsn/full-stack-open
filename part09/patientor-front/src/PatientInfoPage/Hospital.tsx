import React from 'react';

import { HospitalEntry } from '../types';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Moment from 'moment';

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
	<ListItem alignItems="flex-start">
		<ListItemAvatar>
			<LocalHospitalIcon />
		</ListItemAvatar>
		<ListItemText
			primary={Moment(entry.date).format('ddd D MMM YYYY')}
			secondary={
				<React.Fragment>
					<Typography
						sx={{ display: 'inline' }}
						component="span"
						variant="body2"
						color="text.primary"
					>
						{entry.description} <br />
						Diagnosed by: {entry.specialist}
					</Typography>
				</React.Fragment>
			}
		/>
	</ListItem>
);

export default Hospital;