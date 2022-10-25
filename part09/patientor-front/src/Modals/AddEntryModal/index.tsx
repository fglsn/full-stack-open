/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: EntryFormValues) => void;
	error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
	<Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
		<DialogTitle>Add new entry</DialogTitle>
		<Divider />
		<DialogContent>
			{error && <Alert severity="error">{`Error: ${error}`}</Alert>}
			<AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
		</DialogContent>
	</Dialog>
);

export default AddEntryModal;
