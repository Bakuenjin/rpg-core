import { Item, Rarity, RewardHandler } from '../../../src'

describe('RewardHandler class', () => {

	let item1: Item
	let item2: Item
	let rh1: RewardHandler
	let rh2: RewardHandler
	let rh3: RewardHandler

	beforeAll(() => {
		item1 = new Item(1, 'i1', Rarity.Common)
		item2 = new Item(2, 'i2', Rarity.Uncommon)

		rh1 = new RewardHandler({
			loot: [ { item: item1, weight: 3 }, { item: item2, weight: 1 } ],
			lootAmount: 2,
			balance: 50,
			experience: 100
		})

		rh2 = new RewardHandler({
			loot: [ { item: item1, weight: 3 }, { item: item2, weight: 1 } ],
			lootAmount: { min: 5, max: 10 },
			balance: { min: 60, max: 80 },
			experience: { min: 30, max: 60 }
		})

		const content = new Map<Item, number>()
		content.set(item1, 1)
		content.set(item2, 2)

		rh3 = new RewardHandler({
			loot: content,
			lootAmount: 0,
			balance: 42
		})
	})

	it('can generate a fixed amount of items as a reward', () => {
		const reward = rh1.generateReward()
		const lootCount = reward.inventory.asArray().reduce((p, c) => p + c.amount, 0)

		expect(lootCount).toBe(2)
	})

	it('can generate a fixed amount of balance as a reward', () => {
		const reward1 = rh1.generateReward()
		const reward3 = rh3.generateReward()

		expect(reward1.balance).toBe(50)
		expect(reward3.balance).toBe(42)
	})

	it('can generate a fixed amount of experience', () => {
		const reward1 = rh1.generateReward()
		expect(reward1.experience).toBe(100)
	})

	it('can generate a random amount of items based on a range', () => {
		const reward = rh2.generateReward()
		const lootCount = reward.inventory.asArray().reduce((p, c) => p + c.amount, 0)

		expect(lootCount).toBeGreaterThanOrEqual(5)
		expect(lootCount).toBeLessThan(10)
	})

	it('can generate a random amount of balance based on a range', () => {
		const reward = rh2.generateReward()
		expect(reward.balance).toBeGreaterThanOrEqual(60)
		expect(reward.balance).toBeLessThan(80)
	})

	it('can generate a random amount of experience based on a range', () => {
		const reward = rh2.generateReward()
		expect(reward.experience).toBeGreaterThanOrEqual(30)
		expect(reward.experience).toBeLessThan(60)
	})

	it('allows for no experience to be generated', () => {
		const reward = rh3.generateReward()
		expect(reward.experience).toBe(0)
	})

})