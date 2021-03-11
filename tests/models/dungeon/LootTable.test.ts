import { Inventory, Item, LootTable, Rarity } from "../../../src"

describe('LootTable class', () => {

	let item1: Item
	let item2: Item
	let lootTable: LootTable
	let emptyLootTable: LootTable

	beforeAll(() => {
		item1 = new Item(1, 'i1', Rarity.Common)
		item2 = new Item(2, 'i2', Rarity.Epic)

		lootTable = new LootTable([
			{ item: item1, weight: 3 },
			{ item: item2, weight: 1 }
		])

		emptyLootTable = new LootTable([])
	})

	it('chooses random items', () => {
		const result = lootTable.choose(5)
		const resultArr = new Inventory(result).asArray()
		const count = resultArr.reduce((p, c) => p + c.amount, 0)
		
		expect(count).toBe(5)
	})

	it('defaults to 1 item', () => {
		const result = lootTable.choose()
		const resultArr = new Inventory(result).asArray()
		const count = resultArr.reduce((p, c) => p + c.amount, 0)

		expect(count).toBe(1)
	})

	it('returns an empty map when no item drop chances were defined', () => {
		const result = emptyLootTable.choose()
		expect(result.size).toBe(0)
	})

})