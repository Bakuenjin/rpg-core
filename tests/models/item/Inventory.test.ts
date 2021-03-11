import { Inventory, InventorySortType, Item, Rarity } from "../../../src"

describe('Inventory class', () => {

	let item1: Item
	let item2: Item
	let item3: Item
	let content: Map<Item, number>
	let filledInv: Inventory
	let emptyInv: Inventory

	beforeAll(() => {
		item1 = new Item(1, '1', Rarity.Common)
		item2 = new Item(2, '2', Rarity.Uncommon)
		item3 = new Item(3, '3', Rarity.Legendary)
		content = new Map<Item, number>()
		content.set(item1, 1)
		content.set(item2, 2)

		filledInv = new Inventory(content)
		emptyInv = new Inventory()
	})

	it('can be instanciated with content', () => {
		expect(filledInv.asArray().length).toBe(2)
	})

	it('can be instanciated without content', () => {
		expect(emptyInv.asArray().length).toBe(0)
	})

	it('can return the items as an sorted array', () => {
		const items = filledInv.asArray(InventorySortType.RarityDecrease)
		expect(items[0].item.id).toBe(2)
		expect(items[1].item.id).toBe(1)
	})

	it('can return the items as a map', () => {
		const items = filledInv.getItems()

		expect(items.get(item1)).toBe(content.get(item1))
		expect(items.get(item2)).toBe(content.get(item2))
	})

	it('can return the amount of an item in the inventory', () => {
		expect(filledInv.getItemAmount(item1)).toBe(1)
		expect(filledInv.getItemAmount(item2)).toBe(2)
	})

	it('can check if it has a specific item', () => {
		expect(filledInv.has(item1)).toBe(true)
		expect(filledInv.has(item3)).toBe(false)
	})

	it('can check if the inventory contains a specific amount of an item', () => {
		expect(filledInv.hasAmount(item1, 1)).toBe(true)
		expect(filledInv.hasAmount(item1, 2)).toBe(false)

		expect(filledInv.hasAmount(item2, 1)).toBe(true)
		expect(filledInv.hasAmount(item2, 3)).toBe(false)

		expect(filledInv.hasAmount(item3, 1)).toBe(false)
		expect(filledInv.hasAmount(item3, 0)).toBe(true)
	})

	it('can add a specific amount of an item to the inventory', () => {
		const inv = new Inventory()
		expect(inv.has(item1)).toBe(false)

		inv.add(item1, 0)
		expect(inv.has(item1)).toBe(false)

		inv.add(item1, 1)
		expect(inv.has(item1)).toBe(true)
	})

	it('can remove a specific amount of an item to the inventory', () => {
		const inv = new Inventory()
		inv.add(item1, 2)
		expect(inv.has(item1)).toBe(true)

		inv.remove(item1, 0)
		expect(inv.has(item1)).toBe(true)

		inv.remove(item1, 1)
		expect(inv.has(item1)).toBe(true)

		inv.remove(item1, 1)
		expect(inv.has(item1)).toBe(false)
	})

	it('can merge another inventory with itself', () => {
		const inv = new Inventory()
		inv.merge(filledInv)

		expect(inv.asArray().length).toBe(2)
		expect(inv.getItemAmount(item1)).toBe(1)
		expect(inv.getItemAmount(item2)).toBe(2)
	})

})