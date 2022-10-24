import React from 'react';

import { HospitalEntry } from '../types';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
	<ListItem alignItems="flex-start">
		<ListItemAvatar>
			<LocalHospitalIcon />
		</ListItemAvatar>
		<ListItemText
			primary={entry.date}
			secondary={
				<React.Fragment>
					<Typography
						sx={{ display: 'inline' }}
						component="span"
						variant="body2"
						color="text.primary"
					>
						{entry.description}
					</Typography>
					{" name "}
				</React.Fragment>
			}
		/>
	</ListItem>
);

export default Hospital;