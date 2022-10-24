import React from 'react';

import { HealthCheckEntry } from '../types';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';


const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

	let color: "info" | "inherit" | "disabled" | "action" | "primary" | "secondary" | "warning" | "error" | "success" | undefined;

	switch (entry.healthCheckRating) {
		case 0:
			color = 'success';
			break;
		case 1:
			color = 'warning';
			break;
		case 2:
			color = 'primary';
			break;
		case 3:
			color = 'error';
			break;
		default:
			color = 'success';
			break;
	}
	return (
		<ListItem alignItems="flex-start">
			<ListItemAvatar>
				<MonitorHeartIcon />
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
							{entry.description} <br/>
							<FavoriteIcon color={color} />
						</Typography>
					</React.Fragment>
				}
			/>
		</ListItem>
	);
};

export default HealthCheck;