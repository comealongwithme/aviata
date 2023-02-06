import { describe, expect, test, beforeAll } from 'vitest'
import { mount } from "@vue/test-utils";
import { convertSecondsToHoursMinutes } from '../src/helpers'
import { useStore } from '../src/store'
import FilterCheckboxList from '../src/components/FilterCheckboxList.vue'

test('env', () => {

	expect(typeof window).not.toBe('undefined')
})

test('basic test', () => {

	const seconds = 17100.0
	const formattedTime = convertSecondsToHoursMinutes(seconds)

	expect(formattedTime).eq('4 ч 45 м', 'Неверное время в пути')
})

test('store created', () => {

	const { store } = useStore()

	expect(store).toBeTruthy()
})

describe('ui test', () => {

	let wrapper: any
	let clear = false

	beforeAll(() => {

		const title = 'Фильтры'
		const filters = {
			straight: 'Только прямые',
			baggage: 'Только с багажом',
			refundable: 'Только возвратные'
		}

		wrapper = mount(FilterCheckboxList,{
			props:{
				title,
				clear,
				filters
			},
		});
	})

	test('title should be valid', () => {

		expect(wrapper.text()).toContain("Фильтры");
		expect(wrapper.text()).toContain("Только прямые");
	})

	test('emits', async () => {

		wrapper.vm.$emit('update:modelValue', new Set('straight'))
		await wrapper.vm.$nextTick()

		expect(wrapper.emitted()).toMatchObject({})
	})
})
