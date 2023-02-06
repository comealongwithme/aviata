<script setup lang="ts">
import FilterCheckboxList from './components/FilterCheckboxList.vue'
import FlightListItem from './components/FlightListItem.vue'
import { useStore } from './store'
import { computed, nextTick, ref } from 'vue'

const {store} = useStore()

const carriers = computed(() => store.value?.airlines!)

const services = {
	straight: 'Только прямые',
	baggage: 'Только с багажом',
	refundable: 'Только возвратные'
}

const filters = ref<{
	carriers: Set<string>,
	services: Set<string>
}>({
	carriers: new Set(),
	services: new Set()
})

const flights = computed(() => {
	let filteredFlights = store.value?.flights!

	if (filters.value?.carriers.size && !filters.value?.carriers.has('all')) {
		filteredFlights = filteredFlights?.filter(item => {
			return filters.value?.carriers.has(item.itineraries[0][0].carrier)
		})
	}

	if (filters.value?.services.has('straight')) {
		filteredFlights = filteredFlights?.filter(item => {
			return item.itineraries[0][0].stops === 0
		})
	}

	if (filters.value?.services.has('baggage')) {
		filteredFlights = filteredFlights?.filter(item => {
			return item.itineraries[0][0].segments.every(segment => segment.baggage_options.every(baggage => baggage.value > 0))
		})
	}

	if (filters.value?.services.has('refundable')) {
		filteredFlights = filteredFlights?.filter(item => {
			return item.itineraries[0][0].refundable
		})
	}

	return filteredFlights
})

const clear = ref(false)

const clearAllFilters = () => {
	clear.value = true

	nextTick(() => {
		clear.value = false
	})
}
</script>

<template>
	<main class="container grid grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-main lg:grid-rows-1 gap-y-5 gap-x-0 lg:gap-x-5 lg:gap-y-0 py-16">
		<section class="space-y-3">
			<FilterCheckboxList title="Опции тарифа" v-model="filters.services" :clear="clear" :filters="services"/>
			<FilterCheckboxList title="Авиакомпании" v-model="filters.carriers" :clear="clear" :filters="carriers" :show-all="true"/>
			<button @click="clearAllFilters" class="text-blue text-xs border-b border-b-blue/50 border-dashed pb-0.5 hover:text-blue-deep hover:border-b-blue-deep transition-colors">Сбросить все фильтры</button>
		</section>
		<section class="space-y-3">
			<template v-for="flight in flights">
				<FlightListItem :flight="flight"/>
			</template>
		</section>
	</main>
</template>

<style scoped>
</style>
