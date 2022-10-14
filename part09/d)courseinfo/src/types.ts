interface CoursePartBase {
	name: string;
	exerciseCount: number;
	type: string;
}

interface CourseDescription extends CoursePartBase {
	description: string;
}

interface CourseNormalPart extends CourseDescription {
	type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
	type: "groupProject";
	groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescription {
	type: "submission";
	exerciseSubmissionLink: string;
}

interface CoursePartSpecial extends CourseDescription {
	type: "special";
	requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CoursePartSpecial;