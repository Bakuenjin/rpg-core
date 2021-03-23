import { Attribute, ElementType, Enemy, Item, Rarity, RewardHandler } from "../../../src"

describe('Enemy class', () => {

	let item1: Item
	let item2: Item
	let rewardHandler: RewardHandler
	let atkAttribute: Attribute
	let attributes: Map<Attribute, number>
	let enemy: Enemy

	beforeAll(() => {
		item1 = new Item(1, 'item1', Rarity.Common)
		item2 = new Item(2, 'item2', Rarity.Uncommon)

		const content = new Map<Item, number>()
		content.set(item1, 1)
		content.set(item2, 2)

		rewardHandler = new RewardHandler({
			loot: content,
			lootAmount: 0,
			balance: 42,
			experience: 1337
		})

		atkAttribute = new Attribute(3, 'ATK', 42, 10)
		attributes = new Map<Attribute, number>()
		attributes.set(atkAttribute, 69)

		enemy = new Enemy({
			id: 4,
			name: 'enemy1',
			element: ElementType.Fire,
			level: 15,
			rewardHandler: rewardHandler,
			attributes: attributes
		})
		
	})

	it('has public properties', () => {
		expect(enemy.id).toBe(4)
		expect(enemy.name).toBe('enemy1')
		expect(enemy.element).toBe(ElementType.Fire)
		expect(enemy.level).toBe(15)
	})

	it('can display its attributes', () => {
		const attributes = enemy.getAttributes()
		expect(attributes.get(atkAttribute)).toBe(69)
	})

	it('can generate rewards', () => {
		const reward = enemy.getReward()
		const invContent = reward.inventory.getItems()

		expect(invContent.get(item1)).toBe(1)
		expect(invContent.get(item2)).toBe(2)
		expect(reward.balance).toBe(42)
		expect(reward.experience).toBe(1337)
	})

})