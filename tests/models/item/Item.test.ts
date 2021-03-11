import { Item, Rarity } from "../../../src"

describe('Item class', () => {

	it('has id, name and rarity properties', () => {
		const item = new Item(1, 'a', Rarity.Common)
		expect(item.id).toBe(1)
		expect(item.name).toBe('a')
		expect(item.rarity).toBe(Rarity.Common)
	})

})