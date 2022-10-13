import diaries from '../../data/diaries';

import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
	return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
	return diaries.map(({ id, date, weather, visibility }) => ({
		id,
		date,
		weather,
		visibility,
	}));
};

// const getNonSensitiveEntries =
// 	(): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
// 		return diaries;
// 	};

// const getNonSensitiveEntries = (): Omit<DiaryEntry, 'comment'>[] => {
// 	return diaries;
// };

const addDiary = () => {
	return null;
};

export default {
	getEntries,
	addDiary,
	getNonSensitiveEntries
};