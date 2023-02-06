<script setup lang="ts">
import { FlightRecord } from '../types'
import { convertSecondsToHoursMinutes } from '../helpers'

const {flight} = defineProps<{
	flight: FlightRecord
}>()

const segments = flight.itineraries[0][0].segments

const layoversSeconds = flight.itineraries[0][0].layovers.reduce((acc, curr) => acc + curr, 0)

const intermidiateCity = segments[0].dest

const departureDate = segments[0].dep_time.slice(0, segments[0].dep_time.length - 5).trim().toLowerCase()
const departureTime = segments[0].dep_time.slice(segments[0].dep_time.length - 5).trim().toLowerCase()

const arrivalDate = segments[segments.length - 1].dep_time.slice(0, segments[segments.length - 1].dep_time.length - 5).trim().toLowerCase()
const arrivalTime = segments[segments.length - 1].dep_time.slice(segments[segments.length - 1].dep_time.length - 5).trim().toLowerCase()
</script>

<template>
	<article class="bg-white grid grid-cols-1 grid-rows-[1fr_145px] lg:grid-cols-[1fr_240px] lg:grid-rows-1 rounded">
		<div class="flex flex-col px-5 pt-[18px] pb-[28px] lg:pl-[43px] lg:pb-4 lg:pt-0">
			<div class="flex items-center space-x-[13px] p-0 lg:pt-10 lg:pb-11.5">
				<div class="flex items-center justify-between w-full lg:w-auto">
					<div class="flex space-x-[7px] items-center">
						<div class="h-5 w-5">
							<img :src="`https://aviata.kz/static/airline-logos/80x80/${flight.itineraries[0][0].carrier}.png`"
							     :alt="flight.itineraries[0][0].carrier_name">
						</div>
						<div class="text-sm font-semibold w-[100px]">{{ flight.itineraries[0][0].carrier_name }}</div>
					</div>
					<div class="text-xs flex lg:hidden">{{
							segments.every(item => item.baggage_options.every(baggage => baggage.value > 0)) ? 'Есть багаж' : 'Нет багажа'
						}}
					</div>
				</div>
				<div class="hidden lg:flex items-center space-x-8">
					<div class="text-center">
						<div class="text-xs">{{ departureDate }}</div>
						<div class="text-2xl font-semibold">{{ departureTime }}</div>
					</div>
					<div class="w-[168px]">
						<div class="flex justify-between">
							<div class="text-[10px] leading-3 text-gray">{{ segments[0].origin_code }}</div>
							<div class="text-xs">{{ convertSecondsToHoursMinutes(flight.best_time) }}</div>
							<div class="text-[10px] leading-3 text-gray">{{ segments[segments.length - 1].dest_code }}</div>
						</div>
						<div class="my-0.5 h-[5px] flex relative  justify-between">
							<div class="border border-gray rounded-full h-[5px] w-[5px] bg-white z-10"></div>
							<div class="h-[1px] w-full bg-gray flex justify-center absolute top-1/2 -translate-y-1/2 z-0">
								<div
										class="border border-gray rounded-full h-[5px] w-[5px] absolute top-1/2 -translate-y-1/2 bg-white"></div>
							</div>
							<div class="border border-gray rounded-full h-[5px] w-[5px] bg-white z-10"></div>
						</div>
						<div class="text-xs text-orange text-center" v-if="flight.itineraries[0][0].stops">через {{
								intermidiateCity
							}}, {{ convertSecondsToHoursMinutes(layoversSeconds) }}
						</div>
					</div>
					<div class="text-center">
						<div class="text-xs">{{ arrivalDate }}</div>
						<div class="text-2xl font-semibold">{{ arrivalTime }}</div>
					</div>
				</div>
			</div>
			<div class="hidden lg:flex space-x-11.5">
				<div class="flex space-x-6">
					<button
							class="text-blue text-xs border-b border-b-blue border-dashed pb-0.5 hover:text-blue-deep hover:border-b-blue-deep transition-colors">
						Детали перелета
					</button>
					<button
							class="text-blue text-xs border-b border-b-blue border-dashed pb-0.5 hover:text-blue-deep hover:border-b-blue-deep transition-colors">
						Условия тарифа
					</button>
				</div>
				<div v-if="!flight.refundable" class="flex items-center space-x-2 pl-11.5">
					<svg class="w-4 h-4" width="20" height="20" viewBox="0 0 20 20" fill="none"
					     xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd"
						      d="M4.62478 4.63246L2.18383 5.00012L2 3.77965L5.66142 3.22815L6.21291 6.88957L4.99244 7.0734L4.62478 4.63246Z"
						      fill="#707276"/>
						<path fill-rule="evenodd" clip-rule="evenodd"
						      d="M5.50024 3.53114C3.45478 4.96005 2.1168 7.33197 2.1168 10.0164C2.1168 14.3824 5.65618 17.9218 10.0222 17.9218C14.3883 17.9218 17.9277 14.3824 17.9277 10.0164C17.9277 5.66296 14.4087 2.13143 10.0601 2.11104L10.035 3.11096C13.8429 3.11787 16.9277 6.20689 16.9277 10.0164C16.9277 13.8302 13.836 16.9218 10.0222 16.9218C6.20847 16.9218 3.1168 13.8302 3.1168 10.0164C3.1168 7.8267 4.13598 5.87505 5.72584 4.60994L5.50024 4.61574V3.99863V3.53114Z"
						      fill="#707276"/>
						<path
								d="M1.64918 16.7664L1.2933 17.1176L1.64451 17.4735L2.51148 18.352L2.86269 18.7078L3.21857 18.3566L18.2986 3.47418L18.6545 3.12296L18.3032 2.76709L17.4363 1.88861L17.0851 1.53274L16.7292 1.88395L1.64918 16.7664Z"
								fill="#707276" stroke="white"/>
					</svg>
					<div class="text-xs leading-[13.8px] text-gray-dark">невозвратный</div>
				</div>
			</div>
			<div class="flex lg:hidden justify-between pt-[28px] pb-8">
				<div class="text-center">
					<div class="text-xs">{{ departureDate }}</div>
					<div class="text-2xl font-semibold">{{ departureTime }}</div>
				</div>
				<div class="text-center">
					<div class="text-xs">{{ arrivalDate }}</div>
					<div class="text-2xl font-semibold">{{ arrivalTime }}</div>
				</div>
			</div>
			<div class="block lg:hidden w-full">
				<div class="flex justify-between">
					<div class="text-[10px] leading-3 text-gray">{{ segments[0].origin_code }}</div>
					<div class="text-xs">{{ convertSecondsToHoursMinutes(flight.best_time) }}</div>
					<div class="text-[10px] leading-3 text-gray">{{ segments[segments.length - 1].dest_code }}</div>
				</div>
				<div class="my-5 h-[5px] flex relative  justify-between">
					<div class="border border-gray rounded-full h-[5px] w-[5px] bg-white z-10"></div>
					<div class="h-[1px] w-full bg-gray flex justify-center absolute top-1/2 -translate-y-1/2 z-0">
						<div
								class="border border-gray rounded-full h-[5px] w-[5px] absolute top-1/2 -translate-y-1/2 bg-white"></div>
					</div>
					<div class="border border-gray rounded-full h-[5px] w-[5px] bg-white z-10"></div>
				</div>
				<div class="text-xs text-orange text-center" v-if="flight.itineraries[0][0].stops">через {{ intermidiateCity }},
					{{ convertSecondsToHoursMinutes(layoversSeconds) }}
				</div>
			</div>
		</div>
		<div class="lg:pt-3 lg:px-5 lg:pb-[15px] bg-gray-light text-center flex flex-col justify-center items-center">
			<div class="text-[26px] leading-7 mb-2 font-arial">{{ flight.price }} ₸</div>
			<button
					class="bg-green text-lg leading-[25px] text-white font-bold px-[12.5] pt-[7px] pb-[8px] rounded mb-3.5 lg:mb-2 hover:bg-green/75 transition-colors w-[199px] lg:max-w-full">
				Выбрать
			</button>
			<div class="text-xs text-gray-dark lg:mb-3">Цена за всех пассажиров</div>
			<div class="hidden lg:flex space-x-1.5 items-center">
				<div class="text-xs flex-auto">{{
						segments.every(item => item.baggage_options.every(baggage => baggage.value > 0)) ? 'Есть багаж' : 'Нет багажа'
					}}
				</div>
				<button
						class="rounded font-semibold text-blue-deep bg-blue-pale px-2 py-[3px] text-xs flex-auto hover:bg-blue/75 hover:text-blue-pale transition-colors">
					+ Добавить багаж
				</button>
			</div>
		</div>
	</article>
</template>
