<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'

const props = defineProps<{
	title: string,
	clear: boolean,
	showAll?: boolean,
	filters: Record<string, string>
}>()

const {clear, title, filters} = toRefs(props)

const selected = ref(new Set())

const clearSelected = () => {
	selected.value = new Set()
}

const emits = defineEmits(['update:modelValue'])

watch(selected, () => {
	emits('update:modelValue', selected)
})

watch(clear, () => {
	clearSelected()
	emits('update:modelValue', selected)
})
</script>

<template>
	<div class="bg-white rounded pb-3">
		<div class="flex justify-between px-3 pt-3 pb-4">
			<div class="font-bold text-sm">{{ title }}</div>
			<button @click="clearSelected" class="fill-gray hover:fill-blue transition-colors relative">
				<svg width="20" height="20">
					<path fill-rule="evenodd"
					      d="M10.646 8.646 13.293 6l-2.647-2.646.707-.708L14 5.293l2.646-2.647.707.708L14.707 6l2.646 2.646-.707.708L14 6.707l-2.646 2.647-.708-.708ZM2.915 6H8c0 .34.028.675.083 1H2.915a1.5 1.5 0 1 1 0-1Zm5 4h1.613c.34.38.728.717 1.154 1H7.915a1.5 1.5 0 0 1-2.83 0H.5a.5.5 0 1 1 0-1h4.585a1.5 1.5 0 0 1 2.83 0Zm-5 4a1.5 1.5 0 1 0 0 1H14.5a.5.5 0 1 0 0-1H2.915Z"
					      clip-rule="evenodd"/>
				</svg>
			</button>
		</div>
		<div class="scrollbar max-h-80 overflow-x-hidden overflow-y-scroll">
			<div class="flex items-center px-3 hover:bg-gray-pale transition-colors relative group" v-if="showAll">
				<input :id="`filter-checkbox-all`" v-model="selected" type="checkbox" value="all"
				       class="opacity-0 absolute h-3 w-3 peer">
				<label :for="`filter-checkbox-all`"
				       class="cursor-pointer min-h-[32px] flex items-center w-full text-xs pl-6 select-none">
					<span class="absolute h-3 w-3 left-3">
						<transition
								enter-active-class="duration-300 ease-out"
								enter-from-class="transform opacity-0"
								enter-to-class="opacity-100"
								leave-active-class="duration-200 ease-in"
								leave-from-class="opacity-100"
								leave-to-class="transform opacity-0">
							<svg class="absolute" v-if="selected.has('all')" width="12" height="12" fill="none">
								<rect width="11" height="11" x=".5" y=".5" fill="#55BB06" stroke="#55BB06" rx="1.5"/>
								<g clip-path="url(#a)">
									<path fill="#fff" fill-rule="evenodd"
									      d="M9.955 4.153 5.25 9.445 2 6.195l1.414-1.414 1.75 1.75L8.46 2.824l1.495 1.329Z"
									      clip-rule="evenodd"/>
								</g>
								<defs>
									<clipPath id="a">
										<path fill="#fff" d="M2 2h8v8H2z"/>
									</clipPath>
								</defs>
							</svg>
							<svg class="absolute" v-else width="12" height="12" fill="none">
								<rect width="11" height="11" x=".5" y=".5" fill="#fff" stroke="#B9B9B9" rx="1.5"/>
								<path class="opacity-0 group-hover:opacity-100 transition-colors" fill="#B9B9B9" fill-rule="evenodd"
								      d="M9.955 4.153 5.25 9.445 2 6.195l1.414-1.414 1.75 1.75L8.46 2.824l1.495 1.329Z"
								      clip-rule="evenodd"/>
							</svg>
						</transition>
					</span>
					Все
				</label>
			</div>
			<template v-for="(value, key) in filters" :key="key">
				<div class="flex items-center px-3 hover:bg-gray-pale transition-colors relative group">
					<input :id="`filter-checkbox-${key}`" v-model="selected" type="checkbox" :value="key"
					       class="opacity-0 absolute h-3 w-3 peer">
					<label :for="`filter-checkbox-${key}`"
					       class="cursor-pointer min-h-[32px] flex items-center w-full text-xs pl-6 select-none">
						<span class="absolute h-3 w-3 left-3">
							<transition
									enter-active-class="duration-300 ease-out"
									enter-from-class="transform opacity-0"
									enter-to-class="opacity-100"
									leave-active-class="duration-200 ease-in"
									leave-from-class="opacity-100"
									leave-to-class="transform opacity-0">
								<svg class="absolute" v-if="selected.has(key)" width="12" height="12" fill="none">
									<rect width="11" height="11" x=".5" y=".5" fill="#55BB06" stroke="#55BB06" rx="1.5"/>
									<g clip-path="url(#a)">
										<path fill="#fff" fill-rule="evenodd"
										      d="M9.955 4.153 5.25 9.445 2 6.195l1.414-1.414 1.75 1.75L8.46 2.824l1.495 1.329Z"
										      clip-rule="evenodd"/>
									</g>
									<defs>
										<clipPath id="a">
											<path fill="#fff" d="M2 2h8v8H2z"/>
										</clipPath>
									</defs>
								</svg>
								<svg class="absolute" v-else width="12" height="12" fill="none">
									<rect width="11" height="11" x=".5" y=".5" fill="#fff" stroke="#B9B9B9" rx="1.5"/>
									<path class="opacity-0 group-hover:opacity-100 transition-colors" fill="#B9B9B9" fill-rule="evenodd"
									      d="M9.955 4.153 5.25 9.445 2 6.195l1.414-1.414 1.75 1.75L8.46 2.824l1.495 1.329Z"
									      clip-rule="evenodd"/>
								</svg>
							</transition>
						</span>
						{{ value }}
					</label>
				</div>
			</template>
		</div>
	</div>
</template>

<style scoped>

.scrollbar {
	scrollbar-width: thin;
	scrollbar-color: #E1E1E1;
}

.scrollbar::-webkit-scrollbar {
	width: 6px;
}

.scrollbar::-webkit-scrollbar-track {
	background: transparent;
	border-radius: 4px;
}

.scrollbar::-webkit-scrollbar-thumb {
	background-color: #E1E1E1;
	border-radius: 14px;
	border: none;
	border-right: 4px white solid;
	background-clip: padding-box;
}
</style>
