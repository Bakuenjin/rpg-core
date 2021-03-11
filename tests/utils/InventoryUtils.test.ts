import { InventorySortType, InventoryUtils, Item, Rarity } from "../../src"

describe('InventoryUtils class', () => {

	let itemMap: Map<Item, number>

	beforeAll(() => {
		const firstItem = new Item(1, 'a_first_item', Rarity.Common)
		const secondItem = new Item(2, 'z_second_item', Rarity.Uncommon)

		itemMap = new Map<Item, number>()
		itemMap.set(firstItem, 1)
		itemMap.set(secondItem, 2)
	})

	it('can sort a map of items and numbers alphabetical', () => {
		const itemArray = InventoryUtils.sort(itemMap, InventorySortType.Alphabetical)
		expect(itemArray[0].item.name).toBe('a_first_item')
		expect(itemArray[1].item.name).toBe('z_second_item')
	})

	it('can sort a map of items and numbers reverse alphabetical', () => {
		const itemArray = InventoryUtils.sort(itemMap, InventorySortType.ReverseAlphabetical)
		expect(itemArray[0].item.name).toBe('z_second_item')
		expect(itemArray[1].item.name).toBe('a_first_item')
	})

	it('can sort a map of items and numbers by amount increasing', () => {
		const itemArray = InventoryUtils.sort(itemMap, InventorySortType.AmountIncrease)
		expect(itemArray[0].item.name).toBe('a_first_item')
		expect(itemArray[1].item.name).toBe('z_second_item')
	})

	it('can sort a map of items and numbers by amount decreasing', () => {
		const itemArray = InventoryUtils.sort(itemMap, InventorySortType.AmountDecrease)
		expect(itemArray[0].item.name).toBe('z_second_item')
		expect(itemArray[1].item.name).toBe('a_first_item')
	})

	it('can sort a map of items and numbers by rarity increasing', () => {
		const itemArray = InventoryUtils.sort(itemMap, InventorySortType.RarityIncrease)
		expect(itemArray[0].item.name).toBe('a_first_item')
		expect(itemArray[1].item.name).toBe('z_second_item')
	})

	it('can sort a map of items and numbers by rarity decreasing', () => {
		const itemArray = InventoryUtils.sort(itemMap, InventorySortType.RarityDecrease)
		expect(itemArray[0].item.name).toBe('z_second_item')
		expect(itemArray[1].item.name).toBe('a_first_item')
	})

})