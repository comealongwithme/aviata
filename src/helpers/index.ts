export function convertSecondsToHoursMinutes(seconds: number): string {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	return `${hours} ч ${minutes} м`
}
