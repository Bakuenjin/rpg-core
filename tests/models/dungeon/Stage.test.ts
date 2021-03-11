import { Attribute, ElementType, Enemy, Item, Rarity, RewardHandler, Stage } from "../../../src"

describe('Stage class', () => {

	let item1: Item
	let item2: Item
	let rewardHandler: RewardHandler
	let enemy1: Enemy
	let enemy2: Enemy
	let stage: Stage

	beforeAll(() => {
		item1 = new Item(1, 'i1', Rarity.Common)
		item2 = new Item(2, 'i2', Rarity.Epic)

		rewardHandler = new RewardHandler({
			loot: [
				{ item: item1, weight: 3 },
				{ item: item2, weight: 1 }
			],
			lootAmount: 2,
			balance: 50,
			experience: 100
		})

		enemy1 = new Enemy({
			id: 1, name: 'e1', element: ElementType.Fire, level: 10,
			attributes: new Map<Attribute, number>(),
			rewardHandler: rewardHandler
		})

		enemy2 = new Enemy({
			id: 2, name: 'e2', element: ElementType.Fire, level: 20,
			attributes: new Map<Attribute, number>(),
			rewardHandler: rewardHandler
		})

		stage = new Stage([enemy1, enemy2], rewardHandler)
	})

	it('has a list of enemies', () => {
		const enemies = stage.getEnemies()

		expect(enemies.length).toBe(2)
		expect(enemies[0]).toBe(enemy1)
		expect(enemies[1]).toBe(enemy2)
	})

	it('can return its rewards', () => {
		const reward = stage.getReward()
		const invCount = reward.inventory.asArray().reduce((p, c) => p + c.amount, 0)

		expect(invCount).toBe(2)
		expect(reward.balance).toBe(50)
		expect(reward.experience).toBe(100)
	})

})