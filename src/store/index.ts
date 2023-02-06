import { ref } from 'vue'
import { Airlines, FlightRecord } from '../types'

const store = ref<{
	airlines: Record<string, Airlines>
	flights: Array<FlightRecord>
}>()

const displayedFlights = ref<Array<FlightRecord>>()

export default {
	install: () => {
		fetch('./results.json')
			.then(res => res.json())
			.then(result => store.value = result)
			.catch(err => console.log(err))
	}
}

export function useStore() {
	return { store, displayedFlights }
}

